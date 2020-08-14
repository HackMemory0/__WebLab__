<?php


namespace WebLab\View;


use WebLab\View;

class MainView implements View
{

    private $areaView;
    private $formView;

    public function __construct(AreaView $areaView, FormView $formView){
        $this->areaView = $areaView;
        $this->formView = $formView;
    }

    public function render()
    {
        require __ROOT__.'/static/templates/main.php';
    }
}