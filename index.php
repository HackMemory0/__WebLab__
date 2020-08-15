<?php

use WebLab\Model\AreaModel;
use WebLab\View\AreaView;
use WebLab\View\FormView;
use WebLab\View\MainView;

require_once 'autoload.php';

define('LAB1', '');
define('__ROOT__', __DIR__);

Loader::init();

session_start();
if (!isset($_SESSION['results'])) {
    $_SESSION['results'] = [];
}

$xArr = null;
$xNew = null;
if (key_exists('x', $_GET)) {
    $xNew = $_GET['x'];

    if (!is_array($xNew)) {
        $xNew = [$xNew];
    }

    if(is_array($xNew)){
        $xArr = $xNew;
    }
}


$y = null;
$newY = null;
if (key_exists('y', $_GET)) {
    $newY = floatval($_GET['y']);
}

if (is_numeric($newY)) {
    $y = $newY;
}


$r = null;
$newR = null;
if (key_exists('r', $_GET)) {
    $newR = floatval($_GET['r']);
}

if (is_numeric($newR)) {
    $r = $newR;
}


$model = new AreaModel($xArr, $y, $r);
(new MainView( new AreaView($model), new FormView($model) ))->render();