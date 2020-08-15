<?php if (!defined('LAB1')) die();

use WebLab\Utils\Utilites;

?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <link rel="icon" type="image/gif" href="<?= Utilites::url(__DIR__.'/../images/ico.gif'); ?> "/>
    <link rel="stylesheet" type="text/css" href="<?= Utilites::url(__DIR__.'/../css/style.css'); ?>">
    <title>LabWork1</title>
</head>

<body style="background-color: #000000"></body>
<body>
<div id="body">
    <header id="header">
        <div class="row flex-nowrap justify-content-between align-items-center">
            <div class="col-4">
                <a target="_blank" href="https://se.ifmo.ru">
                    <img draggable="false" src="<?= Utilites::url(__DIR__.'/../images/logo.gif'); ?>" height="100" width="80" alt="">
                </a>
            </div>

            <div class="col-4 pt-1 text-right">
                <a target="_blank" href="https://github.com/HackMemory0">GitHub/HackMemory0</a>
            </div>
        </div>
    </header>

    <table id="main">
        <tr>
            <td>
                <img draggable="false" src="<?= Utilites::url(__DIR__.'/../images/gl2.png'); ?>" height="100" width="875" alt="">

                <h1>LabWork#1</h1>
                <h2>Web-Programming  #2601</h2>
            </td>
        </tr>

        <tr><td>
        <?php $this->areaView->render(); ?>
        </td></tr>

        <tr class="form-error-container">
            <td id="form-error-container" colspan="2"><h1></h1></td>
        </tr>

        <tr><td>
        <?php $this->formView->render(); ?>
        </td></tr>


        <tr><td>
        <img draggable="false" src="<?= Utilites::url(__DIR__.'/../images/itmo_logo.gif'); ?>" height="200" width="875" alt="">
        </td></tr>
    </table>
</div>

<script src="<?= Utilites::url(__DIR__.'/../js/script.js'); ?>"></script>
</body>

</html>
