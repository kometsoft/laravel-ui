<?php

namespace Kometsoft\LaravelUi;

class LaravelUi
{
    public function generate_imports($features)
    {
        $imports = '';

        $asset_path = function ($path) {
            return asset("vendor/ui/$path");
        };

        $link = function ($path) use ($asset_path, &$imports) {
            $imports .= '<link href="' . $asset_path($path) . '" rel="stylesheet">';
        };

        $script = function ($path) use ($asset_path, &$imports) {
            $imports .= '<script src="' . $asset_path($path) . '" defer></script>';
        };

        if (in_array('tabler-core', $features)) {
            $link('tabler-core/css/tabler.min.css');
            $link('tabler-core/css/tabler-vendors.min.css');
            $script('tabler-core/js/demo-theme.min.js');
            $script('tabler-core/js/tabler.min.js');
        }

        if (in_array('tabler-icons', $features)) {
            $link('tabler-icons/tabler-icons.min.css');
        }

        if (in_array('apexcharts', $features)) {
            $script('tabler-core/libs/apexcharts/apexcharts.min.js');
        }

        if (in_array('tom-select', $features)) {
            $script('tabler-core/libs/tom-select/tom-select.base.min.js');
        }

        if (in_array('litepicker', $features)) {
            $script('tabler-core/libs/litepicker/litepicker.js');
        }

        if (in_array('jquery', $features)) {
            $script('jquery/jquery.min.js');
        }

        if (in_array('alpinejs', $features)) {
            $script('alpinejs/alpinejs.min.js');
        }

        if (in_array('tinymce', $features)) {
            $script('tinymce/tinymce.min.js');
        }

        if (in_array('datatables.net', $features)) {
            $link('datatables.net/css/datatables.min.css');
            $link('datatables.net/css/app.css');
            $script('datatables.net/js/datatables.min.js');
            $script('datatables.net/js/dataTables.buttons.js');
            $script('datatables.net/js/dataTables.renderers.js');
            $script('datatables.net/js/app.js');
        }

        return $imports;
    }
}
