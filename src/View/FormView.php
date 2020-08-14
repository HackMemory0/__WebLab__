<?php


namespace WebLab\View;


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
            $xArr = $this->model->getXArr();
            $y = $this->model->getY();
            $r = $this->model->getR();

            foreach ($xArr as $x){
                $res = $this->model->checkPoint($x, $y, $r);

                require __ROOT__.'/static/templates/area/result.php';
            }


        }else{
            require __ROOT__.'/static/templates/area/form.php';
        }
    }
}