<?php

namespace App;

class ConfigurationLoader
{
    public function __construct(
        private readonly string $path
    ) {}

    public function load(): Configuration
    {
        $json = file_get_contents($this->path);
        $data = json_decode($json, true);

        return new Configuration(
            steamApiKey: $data['steam_api_key'],
            musicEnabled: $data['music_enabled'],
            communityName: $data['community_name'],
        );
    }
}