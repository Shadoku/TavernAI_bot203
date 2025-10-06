# TavernAI
### TavernAI is an atmospheric frontend for chat and storywriting, compatible with many backends!
**Screenshots:**
<br><img src="readme/1.png" height="200" />

<img src="readme/4.png" height="200" /><img src="readme/5.png" height="200" />

###### Download: <br>
* <a href="https://github.com/TavernAI/TavernAI/archive/refs/heads/main.zip" target="_parent"><img height="20" width="auto" src="https://raw.githubusercontent.com/TavernAI/TavernAI/main/public/img/five.png" alt="TavernAI"/> TavernAI</a><b> -> Requires -> </b><img height="20" width="auto" src="https://raw.githubusercontent.com/TavernAI/TavernAI/main/readme/nodelogo.png" alt="Node.js®"/><a href="https://nodejs.org/dist/v21.3.0/node-v21.3.0-x64.msi">Node.js®</a>
* <img height="20" width="auto" src="https://raw.githubusercontent.com/TavernAI/TavernAI/main/public/img/five.png" alt="TavernAI"/> [Windows .exe version](https://sourceforge.net/projects/tavernaimain/files/TavernAI.rar/download)<br>
###### Run online: 
* [TavernAI on Google Colab](https://colab.research.google.com/github/vrihatgan/TavernAI/blob/main/colab/colab.ipynb) <br><a href="https://colab.research.google.com/github/vrihatgan/TavernAI/blob/main/colab/colab.ipynb" target="_parent"><img height="42" width="auto" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a><br>The option for phones or tablets.<br>
###### Links:
* [TavernAI on Boosty](https://boosty.to/tavernai) - Support the project!
* [TavernAI Discord](https://discord.gg/zmK2gmr45t) - Meet the community!

## Features
* Character creation
* Online character database
* Group chat with multiple characters at the same time
* Story mode
* World info
* Message swiping
* Configurable generation settings
* Configurable interface themes, including one that resembles CharacterAI
* Configurable backgrounds, including beautiful defaults to select from
* Edit, delete, and move any message
* GPT and Claude picture recognition

## How to install
1. Download and install: [Node.js](https://nodejs.org/en/download/current) Please tick the box in the installer for "Additional Build-Tools" and answer Yes to All when the tools install script asks. <br>For [Win7x64SP1](https://nodejs.org/dist/v20.2.0/node-v20.2.0-x64.msi), [Wndows 10+](https://nodejs.org/dist/v21.3.0/node-v21.3.0-x64.msi), [MacOS](https://nodejs.org/dist/v21.3.0/node-v21.3.0.pkg), as well as [Linux(Source)](https://nodejs.org/dist/v21.3.0/node-v21.3.0.tar.gz) and [Debian/Ubuntu(Binaries)](https://nodejs.org/dist/v21.3.0/node-v21.3.0-linux-x64.tar.xz) 
2. Download [TavernAI](https://github.com/TavernAI/TavernAI/archive/refs/heads/main.zip)

Then:
- **On Windows:** Start TavernAI by running `Start.bat`
- **On Linux:** Start TavernAI by running `start-linux.sh`
- **On other OSes:**  Run `npm install` to install dependencies, then run `node server.js` to start the server

For detailed instructions on how to setup TavernAI with KoboldAI or NovelAI:
- [KoboldAI](https://github.com/TavernAI/TavernAI/wiki/How-to-install)
- [NovelAI](https://github.com/TavernAI/TavernAI/wiki/How-to-install-Novel)

## Supported Backends
* Kobold series ([KoboldAI](https://github.com/KoboldAI/KoboldAI-Client), [KoboldCpp](https://github.com/LostRuins/koboldcpp), and [Horde](https://horde.koboldai.net/))
* [Oobabooga's Text Generation Web UI](https://github.com/oobabooga/text-generation-webui)
* OpenAI (including ChatGPT, GPT-4, and reverse proxies)
* [NovelAI](https://novelai.net/)
* [Claude](https://claude.ai/)
* [Ollama](https://ollama.com/)

## Tips
Use this button to edit the message:

<img src="readme/3.png" width="600"/>

If the message is not finished, you can simply send the request again, or say "continue", depending on the model. It should understand that you want to continue the message.

<img src="readme/2.png" width="600"/>

<img src="readme/6.png" width="600"/>

## Telegram bot wrapper
TavernAI now ships with an optional Telegram wrapper that allows you to chat with your characters directly from Telegram.

1. Install the dependencies with `npm install` (if you have not already done so).
2. Set the following environment variables (you can either export them in your shell or define them in a `.telegram.env` file located next to `telegramBot.js`):
    * `TELEGRAM_BOT_TOKEN` – required. The token for the bot you created with [@BotFather](https://t.me/BotFather).
    * `TAVERNAI_BASE_URL` – optional. Overrides the TavernAI server URL if it is not running on `http://127.0.0.1:<port from config.conf>`.
    * `TAVERNAI_MAX_CONTEXT`, `TAVERNAI_MAX_LENGTH`, `TAVERNAI_REQUEST_TIMEOUT` – optional overrides for generation parameters.
    * `TELEGRAM_HISTORY_LIMIT` – optional. Controls how many recent turns are kept when building prompts (default: 20 messages).
    * `TELEGRAM_USER_NAME` and `TAVERNAI_CHARACTER_NAME` – optional labels used when the wrapper builds prompts for TavernAI.
    * `TELEGRAM_ENV_FILE` – optional. Set this to the path of a different env file if you do not want to use `.telegram.env`.

   The env file uses `KEY=VALUE` pairs (for example: `TELEGRAM_BOT_TOKEN=123456789:ABCDEF`). Lines starting with `#` are treated as comments.
3. Start TavernAI as usual (`node server.js`).
4. In a separate terminal run `node telegramBot.js` to start the Telegram bot.

Commands supported by the bot:

* `/start` – greets the user and resets the conversation state.
* `/reset` – clears the stored conversation history for the current chat.

## Additional materials
* [paniphons's guide to text generation](https://github.com/TavernAI/TavernAI/blob/main/faq.md)
## Contact
#### Humi (the original developer):
* Discord: Humi#5044
<br><br><br>
