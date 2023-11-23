<?php

namespace App\File;

class FileCrawler
{
    private bool $shuffle = false;

    public function __construct(
        private readonly string $path
    ) {}

    public static function in(string $path): self
    {
        return new self($path);
    }

    public function inRandomOrder(bool $shuffle = true): self
    {
        $this->shuffle = $shuffle;

        return $this;
    }

    public function first(string $pattern = '*.*'): ?string
    {
        $fileNames = $this->list($pattern);

        return $fileNames[0] ?? null;
    }

    public function list(string $pattern = '*.*'): array
    {
        $fileNames = array_map(
            fn(string $file) => basename($file),
            glob($this->path . DIRECTORY_SEPARATOR . $pattern, GLOB_BRACE)
        );

        if ($this->shuffle) {
            shuffle($fileNames);
        }

        return $fileNames;
    }
}