<?php

namespace Kometsoft\LaravelUi;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class LaravelUiServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     */
    public function boot()
    {
        /*
         * Optional methods to load your package assets
         */
        // $this->loadTranslationsFrom(__DIR__.'/../resources/lang', 'laravel-ui');
        // $this->loadViewsFrom(__DIR__.'/../resources/views', 'laravel-ui');
        // $this->loadMigrationsFrom(__DIR__.'/../database/migrations');
        // $this->loadRoutesFrom(__DIR__.'/routes.php');

        if ($this->app->runningInConsole()) {
            // $this->publishes([
            //     __DIR__.'/../config/config.php' => config_path('laravel-ui.php'),
            // ], 'ui-config');

            // Publishing the views.
            /*$this->publishes([
                __DIR__.'/../resources/views' => resource_path('views/vendor/laravel-ui'),
            ], 'views');*/

            // Publishing assets.
            /*$this->publishes([
                __DIR__.'/../resources/assets' => public_path('vendor/laravel-ui'),
            ], 'assets');*/

            // Publishing the translation files.
            /*$this->publishes([
                __DIR__.'/../resources/lang' => resource_path('lang/vendor/laravel-ui'),
            ], 'lang');*/

            // Registering package commands.
            // $this->commands([]);

            // $this->publishes([
            //     __DIR__.'/../resources' => resource_path('vendor/ui'),
            // ], 'ui-resources');

            $this->publishes([
                __DIR__.'/../resources' => public_path('vendor/ui'),
            ], 'ui:assets');

            $this->publishes([
                __DIR__.'/../resources/tabler-core/css/tabler.min.css' => resource_path('vendor/ui/tabler-core/css/tabler.min.css'),
            ], 'ui:themes');
        }

        /*
         * Register Blade directive for module imports generation
         */
        Blade::directive('ui', function ($features) {
            return "<?php echo app('laravel-ui')->generate_imports($features); ?>";
        });
    }

    /**
     * Register the application services.
     */
    public function register()
    {
        // Automatically apply the package configuration
        $this->mergeConfigFrom(__DIR__.'/../config/config.php', 'laravel-ui');

        // Register the main class to use with the facade
        $this->app->singleton('laravel-ui', function () {
            return new LaravelUi;
        });
    }
}
