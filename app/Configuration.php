<?php

namespace App;

class Configuration
{
    public function __construct(
        public readonly string $steamApiKey,
        public readonly string $musicEnabled,
        public readonly string $communityName,
    ) {}
}