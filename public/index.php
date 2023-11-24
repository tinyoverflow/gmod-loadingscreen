<?php

use App\Config\JsonConfigurationLoader;
use App\File\FileCrawler;
use App\Steam;
use App\TemplateRenderer;

/*
|--------------------------------------------------------------------------
| Register The Auto Loader
|--------------------------------------------------------------------------
|
| Composer provides a convenient, automatically generated class loader for
| this application. We just need to utilize it! We'll simply require it
| into the script here, so we don't need to manually load our classes.
|
*/

require __DIR__ . '/../vendor/autoload.php';

/*
|--------------------------------------------------------------------------
| Load The Configuration
|--------------------------------------------------------------------------
|
| Some things inside this app have to be configured. Here, we're loading
| the configuration file into it's corresponding configuration object.
|
*/

$configurationLoader = new JsonConfigurationLoader(__DIR__ . '/../config/config.json');

$configuration = $configurationLoader->load();

/*
|--------------------------------------------------------------------------
| Load User Information From Steam
|--------------------------------------------------------------------------
|
| To be able to show the users name and avatar, we need to fetch these
| information from the Steam API. This is done here, if the Steam ID is
| given by the server.
|
*/

$steam = new Steam($configuration->steamApiKey);

$player = $_GET['steamid']
    ? $steam->getPlayer($_GET['steamid'])
    : null;

/*
|--------------------------------------------------------------------------
| Load Dynamic Assets
|--------------------------------------------------------------------------
|
| Some assets, such as the backgrounds and the music is dynamic. It can
| be managed by the user. Therefore, we need to crawl the directories to
| find all the files available.
|
*/

$backgroundFiles = FileCrawler::in(__DIR__ . '/assets/images/backgrounds')->inRandomOrder()->list();

$musicFile = $configuration->musicEnabled
    ? FileCrawler::in(__DIR__ . '/assets/music')->inRandomOrder()->first()
    : null;

/*
|--------------------------------------------------------------------------
| Render The Loading Screen
|--------------------------------------------------------------------------
|
| Once we have all the required data, we can finally render the loading
| screen itself. All necessary data will be passed down to the view inside
| the template folder.
|
*/

$renderer = new TemplateRenderer(__DIR__ . '/../templates');

$renderer->render('app.php', [
    'communityName' => $configuration->communityName,

    'backgroundFiles' => $backgroundFiles,
    'musicFile' => $musicFile,

    'playerName' => $player?->name,
    'playerAvatarUrl' => $player?->avatarUrl
]);