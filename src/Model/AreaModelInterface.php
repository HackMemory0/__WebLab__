<?php


namespace WebLab\Model;


interface AreaModelInterface
{
    public function isAvailable();

    public function getXArr();
    public function getY();
    public function getR();

    public function checkPoint($x, $y, $r);
}