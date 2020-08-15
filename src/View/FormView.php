<?php


namespace WebLab\View;


use WebLab\Utils\Utilites;
use WebLab\View;

class FormView implements View
{
    private $model;

    public function __construct($model)
    {
        $this->model = $model;
    }

    public function render()
    {
        if($this->model->isAvailable()){
            $startTime = microtime();

            $xArr = $this->model->getXArr();
            $y = $this->model->getY();
            $r = $this->model->getR();

            foreach ($xArr as $x){
                $res = $this->model->checkPoint($x, $y, $r);
                $calcTime = Utilites::calcDuration($startTime, microtime());

                $_SESSION['results'][] = array(
                    'x' => $x,
                    'y' => $y,
                    'r' => $r,
                    'result' => $res,
                    'calcTime' => $calcTime
                );

                require __ROOT__.'/static/templates/area/result.php';
            }

            $calcTime = Utilites::calcDuration($startTime, microtime());
            require __ROOT__.'/static/templates/area/time.php';

        }else{
            require __ROOT__.'/static/templates/area/form.php';
            require __ROOT__.'/static/templates/area/history.php';
        }
    }
}