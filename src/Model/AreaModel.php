<?php


namespace WebLab\Model;


class AreaModel implements AreaModelInterface
{

    private $available = true;
    private $xarr, $y, $r;

    public function __construct($xarr = null, $y = null, $r = null)
    {
        if (!is_array($xarr)) {
            $xarr = [];

            $this->available = false;
        } else {
            $newXarr = [];

            foreach ($xarr as $x) {
                switch ($x) {
                    case -3:
                    case -2:
                    case -1:
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        array_push($newXarr, $x);
                }
            }

            $xarr = $newXarr;
            if (empty($xarr)) {
                $this->available = false;
            }
        }

        if (!is_numeric($y)) {
            $y = null;

            $this->available = false;
        } else if ($y < -5 || $y > 5) {
            $this->available = false;
        }

        if (!is_numeric($r)) {
            $r = null;

            $this->available = false;
        } else if ($r < 1 || $r > 4) {
            $this->available = false;
        }

        $this->xarr = $xarr;
        $this->y = $y;
        $this->r = $r;
    }

    public function isAvailable()
    {
        return $this->available;
    }

    public function getXArr()
    {
        return $this->xarr;
    }

    public function getY()
    {
        return $this->y;
    }

    public function getR()
    {
        return $this->r;
    }


    public function checkPoint($x, $y, $r)
    {
        $halfR = $r / 2;
        if ($x <= 0 && $y >= 0 && $x * $x + $y * $y <= $halfR * $halfR) {
            return true;
        }

        if ($x <= 0 && $y <= 0 && $y * 2 <= $x + $r) {
            return true;
        }

        if ($x >= 0 && $y >= 0 && $x <= $r && $y <= $halfR) {
            return true;
        }

        return false;
    }
}