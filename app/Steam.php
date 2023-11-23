<?php

namespace App;

class Steam
{
    public function __construct(
        private readonly string $apiKey
    ) {}

    public function getPlayer(string $steamId): SteamPlayer {
        $url = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key={$this->apiKey}&steamids={$steamId}";

        $response = file_get_contents($url);
        $data = json_decode($response, true);

        return new SteamPlayer(
            $data['response']['players'][0]['personaname'],
            $data['response']['players'][0]['avatarmedium']
        );
    }
}