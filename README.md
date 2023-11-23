# Garry's Mod Loading Screen

A beautiful and simple loading screen for Garry's Mod.

## Usage

Upload the content of this repository to your webserver and configure it to serve the `public/index.php` file. Generate
the autoload file with `composer dump-autoload`.

Make sure to update the configuration file at `config/config.json` accordingly. You definitely need a Steam API key. You
can request an API key at https://steamcommunity.com/dev/apikey

Now configure the `sv_loadingurl` configuration option on your Garry's Mod server to serve this Loading Screen. Make
sure to also pass the Steam ID of the connecting player. Example:

```
sv_loadingurl "https://example.com/?steamid=%s"
```

Restart your server and you're done.