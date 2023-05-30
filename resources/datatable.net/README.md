# Datatable.net

DataTables is a plug-in for the jQuery Javascript library. It is a highly flexible tool, built upon the foundations of progressive enhancement, that adds all of these advanced features to any HTML table.

## Installation

You can install the package via npm:

```bash
npm i laravel-vite-datatable

npm run build
```

## Usage


1. Update the input value in `vite.config.js` file.

```js
export default defineConfig({
  plugins: [
    laravel({
      input: [
        ...
        'resources/vendor/ui/datatable.net/js/app.js'
      ],
      ...
```

2. Install Yajra's Datatables package

```bash
composer require yajra/laravel-datatables

npm i laravel-datatables-vite

npm run build
```

3. In Laravel Blade, modify the following

```php
@section('content')
    <div class="container">
        <div class="card">
            <div class="card-header">Users</div>
            {{ $dataTable->table() }}
        </div>
    </div>
@endsection

@vite(['resources/vendor/ui/datatable.net/js/app.js'])
@push('scripts')
    {{ $dataTable->scripts(attributes: ['type' => 'module']) }}
@endpush
```
