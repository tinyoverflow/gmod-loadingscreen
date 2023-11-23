<?php

namespace App;

class TemplateRenderer
{
    public function __construct(
        private readonly string $templateDirectory
    ) {}

    public function render(string $name, array $data = []): void
    {
        // Extract data from array and make it available as variables in the local scope.
        extract($data);

        // Start output buffering to capture the generated HTML.
        ob_start();

        // Include the template file. All variables from extract will be available. This
        // will render the template content to the output buffer.
        include $this->templateDirectory . DIRECTORY_SEPARATOR . $name;

        // Get and print the content from the output buffer.
        echo ob_get_clean();
    }
}