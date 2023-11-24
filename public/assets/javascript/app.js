import Background from "./Background.js";
import DataMapper from "./DataMapper.js";
import LoadingScreen from "./LoadingScreen.js";
import mappings from "./mappings.js";

/**
 * Initialize the application with the required mappings.
 *
 * @type {LoadingScreen}
 */
const app = new LoadingScreen(
    new DataMapper(mappings.mediaTypes),
    new DataMapper(mappings.gameModes)
);

/**
 * Initialize the Background class to start animating the background.
 */
new Background();


//#region Garry's Mod Hooks
function SetFilesTotal(total) {
    return app.files.total = total;
}

function SetFilesNeeded(needed) {
    return app.files.needed = needed;
}

function SetStatusChanged(status) {
    return app.handleStatusChange(status);
}

function DownloadingFile(fileName) {
    return app.handleFileDownload(fileName);
}

function GameDetails(servername, serverurl, mapname, maxplayers, steamid, gamemode, volume, language) {
    app.handleGameDetails(servername, serverurl, mapname, maxplayers, steamid, gamemode, volume, language);
}
//#endregion

//#region Development Mode
const enableDevelopmentMode = true;
if (enableDevelopmentMode) {
    SetFilesTotal(30);
    SetFilesNeeded(30);

    GameDetails("[DE] tinyoverflow | Trouble in Terrorist Town", "tinyoverflow.me", "ttt_minecraft_b5", 20, "", "terrortown");

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
//#endregion
