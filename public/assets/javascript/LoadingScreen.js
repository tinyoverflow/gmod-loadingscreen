/**
 * The LoadingScreen class is the core of the application.
 *
 * It handles all incoming events and is responsible for displaying and
 * updating all incoming information in realtime.
 */
export default class LoadingScreen {

    /**
     * Initializes the application by storing required data and retrieving
     * all used elements from the DOM.
     *
     * @param {DataMapper} extensionMap
     * @param {DataMapper} gameModeMap
     */
    constructor(extensionMap, gameModeMap) {
        this.extensionMap = extensionMap;
        this.gameModeMap = gameModeMap;

        this.progressTitle = document.getElementById('progressTitle');
        this.progressMeta = document.getElementById('progressMeta');
        this.progressBar = document.getElementById('progressBar');

        this.serverName = document.getElementById('serverName');
        this.gameModeName = document.getElementById('gameModeName');
        this.mapName = document.getElementById('mapName');

        this.console = document.getElementById('console');

        /** @type HTMLAudioElement */
        this.musicPlayer = document.getElementById('musicPlayer');

        this.files = {
            total: 0,
            needed: 0,
            downloaded: 0
        }
    }

    /**
     * Writes a single line with some information and optional color coding to the console.
     *
     * @param {String} message - The message to display.
     * @param {String} meta - Additional meta information displayed on the right.
     * @param {String} type - The type to associate with this line for color coding.
     */
    writeToConsole(message, type = null, meta = null) {
        const wrapperEl = document.createElement('div');
        wrapperEl.classList.add('console-line');

        // Compose Content Element, which houses the Timestamp and Message Elements
        const contentEl = document.createElement('div');
        contentEl.classList.add('console-line__content');

        // Compose Timestamp Element
        const timeEl = document.createElement('div');
        timeEl.classList.add('console-line__timestamp');
        timeEl.innerText = new Date().toLocaleTimeString();
        contentEl.appendChild(timeEl);

        // Compose Message Element
        const messageEl = document.createElement('div');
        messageEl.classList.add('console-line__message');

        if (type !== null) {
            messageEl.classList.add('console-line__message--' + type);
        }

        messageEl.innerText = message;
        contentEl.appendChild(messageEl);

        // Add the Content Element to the Wrapper Element
        wrapperEl.appendChild(contentEl);

        // Compose and add the Meta Element, if applicable.
        if (meta !== null) {
            const metaEl = document.createElement('div');
            metaEl.classList.add('console-line__meta');
            metaEl.innerText = meta;
            wrapperEl.appendChild(metaEl);
        }

        // Append the Wrapper Element to the Output Console
        this.console.prepend(wrapperEl);
        wrapperEl.scrollIntoView();

        this.updateProgress(message, meta);
        this.cleanUpConsole();
    }

    /**
     * Updates the display for the current loading status
     *
     * @param {String} title
     * @param {String} meta
     */
    updateProgress(title, meta) {
        this.progressTitle.innerText = title;
        this.progressMeta.innerText = meta;

        this.progressBar.style.width = this.calculateProgressPercentage() + '%';

        // Recolour the progress bar to indicate the completion of the downloads.
        if (this.calculateProgressPercentage() === 100) {
            this.progressBar.classList.add('progress__bar-filler--full')
        }
    }

    /**
     * Removes Offscreen Items From the Console
     *
     * As the console adapts to the viewport, it can happen that an
     * entry is cut off horizontally. This looks unattractive, which
     * is why all entries outside the viewport are removed.
     */
    cleanUpConsole() {
        while (this.console.scrollHeight > this.console.clientHeight) {
            this.console.removeChild(this.console.lastChild);
        }
    }

    /**
     * Calculates the download progress as a percentage
     * @return {number}
     */
    calculateProgressPercentage() {
        const percentage = 100 / this.files.total * this.files.downloaded;
        return Math.ceil(Math.min(Math.max(percentage, 0), 100));
    }

    /**
     * Handles a change of the game details.
     *
     * @param {String} serverName Server's name.
     * @param {String} serverUrl URL for the loading screen.
     * @param {String} mapName The name of the map the server is playing.
     * @param {Number} maxPlayers Maximum number of players for the server.
     * @param {String} steamId 64-bit, numeric Steam community ID of the client joining.
     * @param {String} gameMode The gamemode the server is currently playing.
     * @param {Number} volume The value of the player's in-game 'snd_musicvolume' console variable (Music Volume), from 0 to 1
     * @param {String} language The value of the player's in-game 'gmod_language' console variable, a two letter representation of the player's main menu language.
     */
    handleGameDetails(serverName, serverUrl, mapName, maxPlayers, steamId, gameMode, volume, language) {
        this.serverName.innerText = serverName;
        this.gameModeName.innerText = this.gameModeMap.get(gameMode);
        this.mapName.innerText = mapName;

        this.musicPlayer.volume = volume;
    }

    /**
     * Handles a change of the loading status.
     *
     * @param {String} status
     */
    handleStatusChange(status) {
        this.writeToConsole(status, 'status');
    }

    /**
     * Handles the download event of a file.
     *
     * @param {String} fileName
     */
    handleFileDownload(fileName) {
        this.files.downloaded++;

        const extension = fileName.split('.').pop();
        const type = this.extensionMap.get(extension);

        this.writeToConsole(fileName, type, `(${this.files.downloaded}/${this.files.total})`);
    }
}
