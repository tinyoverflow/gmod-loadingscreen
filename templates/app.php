<!DOCTYPE html>
<html lang="de-DE">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

        <title><?= $communityName ?></title>

        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=inter-tight:300,500,700" rel="stylesheet"/>

        <link rel="stylesheet" type="text/css" href="assets/css/app.css">
    </head>

    <body>
        <div class="background">
            <?php foreach ($backgroundFiles as $background): ?>
                <img src="assets/img/backgrounds/<?= $background ?>" class="background__item" />
            <?php endforeach; ?>
        </div>

        <?php if ($musicFile !== null): ?>
            <audio autoplay loop muted>
                <source src="<?= $musicFile ?>" type="audio/mpeg">
                Dein Browser unterstützt leider keine Audiowiedergabe.
            </audio>
        <?php endif ?>

        <div class="content">
            <h1 class="header">
                <?= $communityName; ?>
            </h1>

            <div class="info">
                <div class="avatar">
                    <img class="avatar__image"
                         src="<?= $playerAvatarUrl ?? 'assets/img/avatar-default.jpg' ?>"
                         alt="<?= $playerName ?>"/>
                </div>

                <div class="greeting">
                    <div class="greeting__content greeting__content--highlight">
                        Hallo <span id="playerName"><?= $playerName ?></span>!
                    </div>

                    <div class="greeting__content">
                        Du betrittst nun <span id="serverName"></span>!
                    </div>

                    <div class="greeting__content">
                        Wir spielen <span id="gameModeName"></span> auf <span id="mapName"></span>.
                    </div>
                </div>
            </div>

            <div class="group group--reverse">
                <!-- Download Progress Element -->
                <div class="progress">
                    <div class="progress__header">
                    <div class="progress__title" id="progressTitle">&nbsp;</div>
                        <div class="progress__meta" id="progressMeta">&nbsp;</div>
                    </div>

                    <div class="progress__bar">
                    <div class="progress__bar-filler" id="progressBar"></div>
                    </div>
                </div>

                <!-- Empty Console Element -->
                <div class="console" id="console"></div>
            </div>
        </div>

        <script type="module" src="assets/js/app.js"></script>
    </body>
</html>