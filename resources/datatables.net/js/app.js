$.extend(true, DataTable.defaults, {
  dom: `<"card-body border-bottom py-3"
    <"row d-flex align-items-center"
      <"col-sm-12 col-md-5 text-muted"B>
      <"col-sm-12 col-md-7 mt-2 mt-md-0 text-muted"f>
    >
  >
  <"table-responsive"tr>
  <"card-footer"
    <"row d-flex align-items-center"
      <"col-sm-12 col-lg-4 text-muted"i>
      <"col-sm-12 col-lg-4 text-muted mt-3 mt-lg-0 d-flex justify-content-center"l>
      <"col-sm-12 col-lg-4 mt-2 mt-lg-0"p>
    >
  >`,
  autoWidth: false,
  pagingType: 'full_numbers',
  pageLength: 10,
  language: {
    paginate: {
      first: '<i class="ti ti-chevrons-left"></i>',
      previous: '<i class="ti ti-chevron-left"></i>',
      next: '<i class="ti ti-chevron-right"></i>',
      last: '<i class="ti ti-chevrons-right"></i>',
    },
  },
})

$.extend(true, DataTable.Buttons.defaults, {
  dom: {
    buttonLiner: {
      tag: '',
    },
  },
})

$.extend(DataTable.ext.classes, {
  sTable: 'dataTable table card-table table-vcenter text-nowrap',
})

$.fn.dataTable.Buttons.defaults.dom.button.className = 'btn btn-primary btn-sm px-2'
