<?php

class Loader {

    public static function init() {
        spl_autoload_register( [new self, 'autoload'] );
    }

    public function autoload($class)
    {
        $prefix = 'WebLab\\';

        $base_dir = __DIR__ . '/src/';

        $len = strlen($prefix);
        if (strncmp($prefix, $class, $len) !== 0) {
            return;
        }

        $relative_class = substr($class, $len);
        $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

        if (file_exists($file)) {
            require_once $file;
        }
    }
}