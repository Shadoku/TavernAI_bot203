'use strict';

const TelegramBot = require('node-telegram-bot-api');
const needle = require('needle');
const path = require('path');
const config = require(path.join(process.cwd(), './config.conf'));

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
if (!TELEGRAM_TOKEN) {
    throw new Error('Missing TELEGRAM_BOT_TOKEN environment variable.');
}

const DEFAULT_USER_NAME = process.env.TELEGRAM_USER_NAME || 'You';
const DEFAULT_BOT_NAME = process.env.TAVERNAI_CHARACTER_NAME || 'AI';
const MAX_CONTEXT_LENGTH = Number(process.env.TAVERNAI_MAX_CONTEXT || 2048);
const MAX_LENGTH = Number(process.env.TAVERNAI_MAX_LENGTH || 120);
const TAVERN_BASE_URL = process.env.TAVERNAI_BASE_URL || `http://127.0.0.1:${config.port}`;
const REQUEST_TIMEOUT = Number(process.env.TAVERNAI_REQUEST_TIMEOUT || 4 * 60 * 1000);
const HISTORY_LIMIT = Math.max(Number(process.env.TELEGRAM_HISTORY_LIMIT || 20), 2);

const sessions = new Map();

function getSession(chatId) {
    if (!sessions.has(chatId)) {
        sessions.set(chatId, { history: [] });
    }
    return sessions.get(chatId);
}

function appendToHistory(session, message) {
    session.history.push(message);
    while (session.history.length > HISTORY_LIMIT) {
        session.history.shift();
    }
}

function buildPrompt(history) {
    let prompt = '';
    for (const message of history) {
        const speaker = message.role === 'user' ? DEFAULT_USER_NAME : DEFAULT_BOT_NAME;
        prompt += `${speaker}: ${message.text}\n`;
    }
    prompt += `${DEFAULT_BOT_NAME}:`;
    return prompt;
}

async function fetchCsrfToken() {
    const response = await needle('get', `${TAVERN_BASE_URL}/csrf-token`, {
        json: true,
        open_timeout: REQUEST_TIMEOUT,
    });

    if (response.statusCode !== 200 || !response.body || !response.body.token) {
        throw new Error('Failed to obtain CSRF token from TavernAI.');
    }

    const token = response.body.token;
    const cookies = response.cookies || {};

    return { token, cookies };
}

function buildCookieHeader(cookies) {
    return Object.entries(cookies)
        .map(([name, value]) => `${name}=${value}`)
        .join('; ');
}

async function generateCompletion(prompt) {
    const { token, cookies } = await fetchCsrfToken();
    const cookieHeader = buildCookieHeader(cookies);
    const payload = {
        prompt,
        gui_settings: true,
        max_context_length: MAX_CONTEXT_LENGTH,
        max_length: MAX_LENGTH,
        singleline: false,
    };

    const options = {
        json: true,
        headers: {
            'x-csrf-token': token,
            ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        },
        open_timeout: REQUEST_TIMEOUT,
    };

    const response = await needle('post', `${TAVERN_BASE_URL}/generate`, payload, options);

    if (response.statusCode !== 200) {
        throw new Error(`TavernAI responded with status ${response.statusCode}`);
    }

    const data = response.body;
    if (!data) {
        throw new Error('TavernAI returned an empty response.');
    }
    if (data.error) {
        throw new Error(data.error_message || 'TavernAI reported an error.');
    }

    const text = (data.results && data.results[0] && data.results[0].text)
        || (data.choices && data.choices[0] && (data.choices[0].text || (data.choices[0].message && data.choices[0].message.content)))
        || data.output
        || data.response
        || '';

    if (!text) {
        throw new Error('TavernAI returned an unexpected response format.');
    }

    return text.trim();
}

function resetSession(chatId) {
    sessions.set(chatId, { history: [] });
}

async function handleIncomingMessage(msg) {
    const chatId = msg.chat.id;

    if (!msg.text) {
        return;
    }

    const text = msg.text.trim();

    if (text === '/start') {
        resetSession(chatId);
        await bot.sendMessage(chatId, 'Hello! Send me a message and I will ask TavernAI to respond.');
        return;
    }

    if (text === '/reset') {
        resetSession(chatId);
        await bot.sendMessage(chatId, 'Conversation history cleared.');
        return;
    }

    const session = getSession(chatId);
    appendToHistory(session, { role: 'user', text });

    try {
        const prompt = buildPrompt(session.history);
        const reply = await generateCompletion(prompt);
        appendToHistory(session, { role: 'bot', text: reply });
        await bot.sendMessage(chatId, reply);
    } catch (error) {
        await bot.sendMessage(chatId, `Error contacting TavernAI: ${error.message}`);
    }
}

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });
bot.on('message', (msg) => {
    handleIncomingMessage(msg).catch((error) => {
        console.error('Failed to process message', error);
    });
});

console.log('Telegram bot connected. Waiting for messages...');

