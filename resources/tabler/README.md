# Tabler CSS

Premium and Open Source dashboard template with responsive and high quality UI.

## Version

`1.0.0-beta17`

## Dependencies

- bootstrap `5.3.0-alpha1`
- autosize `6.0.1`
- imask `6.6.0-alpha.0`
- litepicker `2.0.12`
- tom-select `2.2.2`

## Installation

You can install the package via npm:

```bash
npm install

npm i @tabler/core@1.0.0-beta17 \
bootstrap@5.3.0-alpha1 \
@tabler/icons-webfont \
autosize \
imask \
litepicker \
tom-select

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
        ...
        'resources/vendor/ui/tabler/sass/app.scss',
        'resources/vendor/ui/tabler/js/app.js'
      ],
      ...
```

2. Add this to your `vite.config.js` file.

> Alias resolution by removing the "~" prefix, simplifying module imports.

```js
export default defineConfig({
  ...
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, '')
        },
      },
    ],
  },
},
```

### Laravel Blade

1. In your blade files, update your `@vite` blade directive array.

```php
@vite([
    ...
    'resources/vendor/ui/tabler/sass/app.scss',
    'resources/vendor/ui/tabler/js/app.js'
])
```

2. Recompile your assets

```bash
npm run build
```
