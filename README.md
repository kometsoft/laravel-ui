# Laravel UI

<!-- [![Latest Version on Packagist](https://img.shields.io/packagist/v/kometsoft/laravel-ui.svg?style=flat-square)](https://packagist.org/packages/kometsoft/laravel-ui)
[![Total Downloads](https://img.shields.io/packagist/dt/kometsoft/laravel-ui.svg?style=flat-square)](https://packagist.org/packages/kometsoft/laravel-ui)
![GitHub Actions](https://github.com/kometsoft/laravel-ui/actions/workflows/main.yml/badge.svg) -->

A package for integration of Tabler UI kits, with ready-to-use components and customization options.

## Installation

Install `laravel/ui` package:

```bash
composer require laravel/ui
```

Once the `laravel/ui` package has been installed, you may install the frontend scaffolding using the ui Artisan command:

```
php artisan ui bootstrap --auth
```

You can install the package via composer:

```bash
composer require kometsoft/laravel-ui
```

## Usage

1. Publish assets

```bash
php artisan vendor:publish --tag=ui-assets
```

2. Add the `@ui` Blade directive to your main layout

> Consider removing your existing Bootstrap imports

```
@ui(['tabler-core', 'tabler-icons', 'apexcharts', 'tom-select', 'litepicker', 'chart.js', 'datatable.net'])
```

## Credits

- [aerrata](https://github.com/kometsoft)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
