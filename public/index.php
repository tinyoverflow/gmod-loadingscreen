<?php

use App\ConfigurationLoader;
use App\Steam;

require __DIR__ . '/../vendor/autoload.php';

$configuration = (new ConfigurationLoader(__DIR__ . '/../config/config.json'))->load();
$steam = new Steam($configuration->steamApiKey);

$player = $steam->getPlayer($_GET['steamid']);

$renderer = new \App\TemplateRenderer(__DIR__ . '/../templates');
$renderer->render('app.php', [
    'communityName' => $configuration->communityName,
    'musicFile' => 'assets/music/1.mp3',
    'playerName' => $player->name,
    'playerAvatarUrl' => $player->avatarUrl
]);