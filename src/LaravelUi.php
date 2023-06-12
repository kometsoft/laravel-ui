<?php

namespace Kometsoft\LaravelUi;

class LaravelUi
{
    public function assets(array $features)
    {
        $scripts = [];

        if (in_array('demo-theme', $features)) {
            $scripts[] = '<script src="{{ asset("vendor/ui/tabler/core/dist/js/demo-theme.min.js") }}"></script>';
        }

        if (in_array('tabler', $features)) {
            $scripts[] = '<script src="{{ asset("vendor/ui/tabler/core/dist/js/tabler.min.js") }}" defer></script>';
        }

        if (in_array('demo', $features)) {
            $scripts[] = '<script src="{{ asset("vendor/ui/tabler/core/dist/js/demo.min.js") }}" defer></script>';
        }

        return implode("\n", $scripts);
    }
}
