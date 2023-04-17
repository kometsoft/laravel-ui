# Tabler

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
npm i @tabler/core@1.0.0-beta17 bootstrap@5.3.0-alpha1 @tabler/icons-webfont autosize imask litepicker tom-select

npm run build
```

## Usage

1. The related path are as follows:

```js
[
    'resources/vendor/ui/tabler/sass/app.scss',
    'resources/vendor/ui/tabler/js/app.js'
    ...
]
```

2. In your blade files, update your `@vite` blade directive array value with the specified paths

3. In `vite.config.js` file, update your `plugins.laravel.input` array value with the specified paths

4. Add this to `vite.config.js` file

```js
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
```
