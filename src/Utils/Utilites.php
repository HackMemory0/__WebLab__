<?php


namespace WebLab\Utils;


class Utilites
{
    public static function url($path) {
        return str_replace(__ROOT__, '.', $path);
    }

    public static function toFloat($value) {
        $float = (float)$value;

        if ((string)$float != $value) {
            throw new \InvalidArgumentException('$value is not a numeric!');
        }

        return $float;
    }
}