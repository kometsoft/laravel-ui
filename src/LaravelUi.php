<?php

namespace Kometsoft\LaravelUi;

class LaravelUi
{
    public function generateTablerScripts($expression)
    {
        $scripts = '';

        if (in_array('demo-theme', $expression)) {
            $scripts .= '<script src="{{ asset("vendor/ui/tabler/core/dist/js/demo-theme.min.js") }}"></script>';
        }

        if (in_array('tabler', $expression)) {
            $scripts .= '<script src="{{ asset("vendor/ui/tabler/core/dist/js/tabler.min.js") }}" defer></script>';
        }

        if (in_array('demo', $expression)) {
            $scripts .= '<script src="{{ asset("vendor/ui/tabler/core/dist/js/demo.min.js") }}" defer></script>';
        }

        return $scripts;
    }
}
