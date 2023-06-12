<!-- # Tabler CSS

Premium and Open Source dashboard template with responsive and high quality UI.

## Version

`1.0.0-beta19`

## Dependencies

- bootstrap `5.3.0-alpha1`

## Installation

You can install the package via npm:

```bash
npm i @tabler/core@1.0.0-beta19 \
@tabler/icons-webfont \
bootstrap@5.3.0-alpha1

npm run build
```

## Usage

### Vite

1. Update the input value in `vite.config.js` file.

```js
export default defineConfig({
  plugins: [
    laravel({
      input: [
        'resources/vendor/ui/tabler/css/app.css',
        'resources/vendor/ui/tabler/js/app.js'
        ...
      ],
      ...
```

### Laravel Blade

1. In your blade files, update your `@vite` blade directive array.

```php
@vite([
    'resources/vendor/ui/tabler/css/app.css',
    'resources/vendor/ui/tabler/js/app.js',
    ...
])
```

2. Recompile your assets

```bash
npm run build
``` -->
