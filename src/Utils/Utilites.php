<?php


namespace WebLab\Utils;


class Utilites
{
    public static function url($path) {
        return str_replace(__ROOT__, '.', $path);
    }

    public static function calcDuration($start, $finish)
    {
        $startCalcTime = explode(' ', $start);
        $finishCalcTime = explode(' ', $finish);

        $calcTimeSec = $finishCalcTime[1] - $startCalcTime[1];
        $calcTimeMsec = $finishCalcTime[0] - $startCalcTime[0];

        if ($calcTimeSec === 0)
            return round($calcTimeMsec, 10);
        else
            return $calcTimeSec + $calcTimeMsec;
    }


}