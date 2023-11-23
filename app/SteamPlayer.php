<?php

namespace App;

class SteamPlayer
{
    public function __construct(
        public readonly string $name,
        public readonly string $avatarUrl
    ) {}
}