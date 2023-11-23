/*CONFIG FOR TESTING THE LOADING SCREEN*/
const isDevelopmentMode = false; //Set to true if you wanna test it
/*-------------------------------------*/

class DataMapper {
    constructor(data) {
        this.data = data;
    }

    get(key) {
        return this.data[key];
    }
}

class LoadingScreen {
    constructor() {
        this.progressTitle = document.getElementById('progressTitle');
        this.progressMeta = document.getElementById('progressMeta');
        this.progressBar = document.getElementById('progressBar');

        this.serverName = document.getElementById('serverName');
        this.gameModeName = document.getElementById('gameModeName');
        this.mapName = document.getElementById('mapName');

        this.console = document.getElementById('console');

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
        this.console.appendChild(wrapperEl);
        wrapperEl.scrollIntoView();

        this.updateProgress(message, meta);
    }

    calculateProgressPercentage() {
        const percentage = 100 / this.files.total * this.files.downloaded;
        return Math.ceil(Math.min(Math.max(percentage, 0), 100));
    }

    updateProgress(title, meta) {
        this.progressTitle.innerText = title;
        this.progressMeta.innerText = meta;

        this.progressBar.style.width = this.calculateProgressPercentage() + '%';

        if (this.calculateProgressPercentage() === 100) {
            this.progressBar.classList.add('progress__bar-filler--full')
        }
    }

    /**
     * Handles a change of the game details.
     *
     * @param {String} serverName
     * @param {String} serverUrl
     * @param {String} mapName
     * @param {Number} maxPlayers
     * @param {String} steamId
     * @param {String} gameMode
     */
    handleGameDetails(serverName, serverUrl, mapName, maxPlayers, steamId, gameMode) {
        this.serverName.innerText = serverName;
        this.gameModeName.innerText = gameModeMap.get(gameMode);
        this.mapName.innerText = mapName;
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
        const type = extensionMap.get(extension);

        this.writeToConsole(fileName, type, `(${this.files.downloaded}/${this.files.total})`);
    }
}

const extensionMap = new DataMapper({
    "jpg": "image",
    "jpeg": "image",
    "png": "image",
    "bsp": "map",
    "vmt": "texture",
    "vtf": "texture",
    "vtx": "models",
    "mdl": "models",
    "phy": "models",
    "vvd": "models",
    "wav": "sounds",
    "mp3": "sounds",
    "pcf": "particles",
    "ttf": "fonts",
});

const gameModeMap = new DataMapper({
    "terrortown": "Trouble in Terrorist Town",
    "prophunt": "Prop Hunt",
    "murder": "Murder",
    "sandbox": "Sandbox",
});

const app = new LoadingScreen();

function SetFilesTotal(total) {
    app.files.total = total;
}

function SetFilesNeeded(needed) {
    app.files.needed = needed;
}

function GameDetails(servername, serverurl, mapname, maxplayers, steamid, gamemode) {
    app.handleGameDetails(servername, serverurl, mapname, maxplayers, steamid, gamemode);
}

function SetStatusChanged(status) {
    app.handleStatusChange(status);
}

function DownloadingFile(fileName) {
    app.handleFileDownload(fileName);
}

if (isDevelopmentMode) {
    SetFilesTotal(30);
    SetFilesNeeded(30);

    GameDetails("24/7 Prop Hunt [Version 2]", "asdf.com", "cs_office", 20, "asdf", "terrortown");

    const demoData = [
        () => DownloadingFile("Downloading materials/mycommunity/image.jpeg"),
        () => DownloadingFile("Downloading materials/mycommunity/second_image.jpeg"),
        () => DownloadingFile("Downloading materials/mycommunity/gm_construct.bsp"),
        () => DownloadingFile("Downloading materials/mycommunity/texture_file.vmt"),
        () => DownloadingFile("Downloading materials/mycommunity/some_texture.vmt"),
        () => DownloadingFile("Downloading materials/mycommunity/background_image.png"),
        () => DownloadingFile("Downloading materials/mycommunity/crazy_hud.png"),
        () => DownloadingFile("Downloading materials/mycommunity/hatsune_miku.mdl"),
        () => DownloadingFile("Downloading materials/mycommunity/pink_terrorist.mdl"),
        () => DownloadingFile("Downloading materials/mycommunity/mysong.mp3"),
        () => DownloadingFile("Downloading materials/mycommunity/yelling.mp3"),
        () => DownloadingFile("Downloading materials/mycommunity/my_particles.pcf"),
        () => DownloadingFile("Downloading materials/mycommunity/second_particles.pcf"),
        () => DownloadingFile("Downloading materials/mycommunity/bebasnueue.ttf"),
        () => DownloadingFile("Downloading materials/mycommunity/overusedfont.ttf"),
        () => DownloadingFile("Downloading materials/mycommunity/image.jpeg"),
        () => DownloadingFile("Downloading materials/mycommunity/second_image.jpeg"),
        () => DownloadingFile("Downloading materials/mycommunity/gm_construct.bsp"),
        () => DownloadingFile("Downloading materials/mycommunity/texture_file.vmt"),
        () => DownloadingFile("Downloading materials/mycommunity/some_texture.vmt"),
        () => DownloadingFile("Downloading materials/mycommunity/background_image.png"),
        () => DownloadingFile("Downloading materials/mycommunity/crazy_hud.png"),
        () => DownloadingFile("Downloading materials/mycommunity/hatsune_miku.mdl"),
        () => DownloadingFile("Downloading materials/mycommunity/pink_terrorist.mdl"),
        () => DownloadingFile("Downloading materials/mycommunity/mysong.mp3"),
        () => DownloadingFile("Downloading materials/mycommunity/yelling.mp3"),
        () => DownloadingFile("Downloading materials/mycommunity/my_particles.pcf"),
        () => DownloadingFile("Downloading materials/mycommunity/second_particles.pcf"),
        () => DownloadingFile("Downloading materials/mycommunity/bebasnueue.ttf"),
        () => DownloadingFile("Downloading materials/mycommunity/overusedfont.ttf"),
        () => SetStatusChanged("Sending client info.."),
        () => SetStatusChanged("Receiving client info.."),
    ];

    for (let i = 0; i < demoData.length; i++) {
        setTimeout(
            demoData[i],
            i * 300
        );
    }
}
