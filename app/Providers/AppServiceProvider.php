<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Inertia\ResponseFactory;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Inertia::share([
            // ...
            'locale' => function () {
                return app()->getLocale();
            },
            'language' => function () {
                return translations_lang(
                    app_path('../lang/'. app()->getLocale() .'.json')
                );
            },
        ]);
        ResponseFactory::macro('modal', function ($modal) {
            inertia()->share(['modal' => $modal]);
        });
    }
}
