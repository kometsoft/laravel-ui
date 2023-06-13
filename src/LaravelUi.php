<?php

namespace Kometsoft\LaravelUi;

class LaravelUi
{
    public function generateImports($features)
    {
        $imports = '';

        if (in_array('core', $features)) {
            $imports .= '<link href="' . asset('vendor/ui/tabler/core/css/tabler.min.css') . '" rel="stylesheet">';
            $imports .= '<link href="' . asset('vendor/ui/tabler/core/css/tabler-vendors.min.css') . '" rel="stylesheet">';
            $imports .= '<link href="' . asset('vendor/ui/tabler/core/css/demo.min.css') . '" rel="stylesheet">';

            $imports .= '<script src="' . asset('vendor/ui/tabler/core/js/demo-theme.min.js') . '" defer></script>';
            $imports .= '<script src="' . asset('vendor/ui/tabler/core/js/tabler.min.js') . '" defer></script>';
            $imports .= '<script src="' . asset('vendor/ui/tabler/core/js/demo.min.js') . '" defer></script>';
        }

        if (in_array('icons-webfont', $features)) {
            $imports .= '<link href="' . asset('vendor/ui/tabler/icons-webfont/tabler-icons.min.css') . '" rel="stylesheet">';
        }

        if (in_array('apexcharts', $features)) {
            $imports .= '<script src="' . asset('vendor/ui/tabler/core/libs/apexcharts/dist/apexcharts.min.js') . '" defer></script>';
        }

        if (in_array('tom-select', $features)) {
            $imports .= '<script src="' . asset('vendor/ui/tabler/core/libs/tom-select/dist/js/tom-select.base.min.js') . '" defer></script>';
        }

        if (in_array('litepicker', $features)) {
            $imports .= '<script src="' . asset('vendor/ui/tabler/core/libs/litepicker/dist/litepicker.js') . '" defer></script>';
        }

        return $imports;
    }
}
