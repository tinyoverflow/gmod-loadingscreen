<?php

namespace App\Config;

interface ConfigurationLoader
{
    public function load(): Configuration;
}