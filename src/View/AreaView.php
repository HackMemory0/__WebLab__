<?php


namespace WebLab\View;


use WebLab\Utils\GifCreator;
use WebLab\Utils\GifFrameExtractor;
use WebLab\View;

class AreaView implements View
{

    private $model;

    private $cacheDir;
    private $centerX = 0, $centerY = 0;
    private $zoomX = 0, $zoomY = 0;

    public function __construct($model) {
        $this->cacheDir = __ROOT__ . '/area_cache';
        $this->model = $model;
    }

    public function render()
    {
        $path = __ROOT__.'/static/images/area.gif';
        if($this->model->isAvailable()) {
            $newPath = $this->renderImage($path);
            if ($newPath !== null) {
                $path = $newPath;
            }
        }

        require __ROOT__.'/static/templates/area/img.php';
    }

    private function renderImage($areaPath) {
        if (!file_exists($this->cacheDir)) {
            if (!mkdir($this->cacheDir, 0777, true)) {
                return null;
            }
        }

        if (!is_dir($this->cacheDir)) {
            throw new \RuntimeException("Cache directory is not a directory");
        }

        $xarr = $this->model->getXArr();
        sort($xarr);

        $path = $this->cacheDir.'/'.md5(implode($xarr).$this->model->getY().$this->model->getR()).'.gif';
        if (file_exists($path)) {
            return $path;
        }

        if(GifFrameExtractor::isAnimatedGif($areaPath)) {

            $gfe = new GifFrameExtractor();
            $gfe->extract($areaPath);


            $eframes = array();
            //$image = imagecreatefromgif($areaPath);
            foreach ($gfe->getFrames() as $frame) {
                $image = $frame['image'];

                imagealphablending($image, false);

                $this->recalc(imagesx($image), imagesy($image), $this->model->getR());

                $color = imagecolorallocate($image, 255, 0, 0);

                $y = $this->translateY($this->model->getY());

                foreach ($this->model->getXArr() as $x) {
                    imagefilledellipse($image, $this->translateX($x), $y, 5, 5, $color);
                }

                imagesavealpha($image, true);
                //imagepng($image, $path);
                $eframes[] = $image;
            }

            $gc = new GifCreator();
            $gc->create($eframes, $gfe->getFrameDurations(), 0);

            file_put_contents($path, $gc->getGif());
        }

        return $path;
    }


    protected function recalc($width, $height, $r) {
        $this->centerX = round($width / 2) - 1;
        $this->centerY = round($height / 2) - 1;

        $this->zoomX = 80 * $width / 205 / $r;
        $this->zoomY = 80 * $height / 205 / $r;
    }

    protected function translateX($x) {
        return $this->centerX + $x * $this->zoomX;
    }

    protected function translateY($y) {
        return $this->centerY - $y * $this->zoomY;
    }


    public static function inlineImage($path, $mime = null, $headers = []) {
        if (!is_string($mime)) {
            $mime = mime_content_type($path);
        }

        array_unshift($headers, $mime);

        return 'data:'.implode(';', $headers).';base64,'.base64_encode(file_get_contents($path));
    }
}