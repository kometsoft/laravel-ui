window._buildUrl = function (dt, action) {
  let url = dt.ajax.url() || ''
  let params = dt.ajax.params()
  params.action = action

  return url + '?' + $.param(params)
}

document.addEventListener('DOMContentLoaded', function () {
  let oTable = $('table')
  oTable.on('select.dt', function (e, dt, type, indexes) {
    dt.rows({ selected: true }).every(function (rowIdx, tableLoop, rowLoop) {
      var data = this.data()
      if (data.deleted_at == null) {
        dt.button('restore:name').disable()
        dt.button('forceDelete:name').disable()
        dt.button('forceDeleteSingle:name').disable()
      }
    })
  })

  oTable.on('deselect.dt', function (e, dt, type, indexes) {
    dt.rows({ selected: true }).every(function (rowIdx, tableLoop, rowLoop) {
      var data = this.data()
      if (data.deleted_at == null) {
        dt.button('restore:name').disable()
        dt.button('forceDelete:name').disable()
        dt.button('forceDeleteSingle:name').disable()
      }
    })
  })

  // Buttons
  /**
   * DataTables add button.
   *
   * -- Laravel Integration --
   *
   * Button::make('add')->text('<i class="bi bi-plus"></i> Add')
   *
   */
  $.fn.dataTable.ext.buttons.add = {
    name: 'add',
    className: 'buttons-add btn-success',
    text: '<i class="bi bi-plus"></i> New',
    action: function (e, dt, button, config) {
      let uri = window.location.toString()
      if (uri.indexOf('?') > 0) {
        uri = uri.substring(0, uri.indexOf('?'))
      }
      window.location = uri + '/create'
    },
  }

  /**
   * DataTables export button.
   *
   * -- Laravel Integration --
   *
   * Button::make('export')
   *
   */
  $.fn.dataTable.ext.buttons.export = {
    name: 'export',
    extend: 'collection',
    className: 'btn-primary',
    text: 'Export&nbsp;<span class="caret"/>',
    buttons: [
      { extend: 'csv', text: 'CSV' },
      { extend: 'excel', text: 'Excel' },
      { extend: 'pdf', text: 'PDF' },
    ],
  }

  /**
   * DataTables csv button.
   *
   * -- Laravel Integration --
   *
   * Button::make('csv')->text('<i class="bi bi-file-csv"></i> Export to CSV')
   *
   */
  $.fn.dataTable.ext.buttons.csv = {
    name: 'csv',
    className: 'buttons-csv btn-primary',
    titleAttr: 'Export as CSV',
    text: '<small><b>CSV</b></small>',
    action: function (e, dt, button, config) {
      window.location = _buildUrl(dt, 'csv')
    },
  }

  /**
   * DataTables excel button.
   *
   * -- Laravel Integration --
   *
   * Button::make('excel')
   *
   */
  $.fn.dataTable.ext.buttons.excel = {
    name: 'excel',
    className: 'buttons-excel btn-primary',
    titleAttr: 'Export as Excel',
    text: '<small><b>EXCEL</b></small>',
    action: function (e, dt, button, config) {
      window.location = _buildUrl(dt, 'excel')
    },
  }

  /**
   * DataTables pdf button.
   *
   * -- Laravel Integration --
   *
   * Button::make('pdf')->text('Export to PDF')
   *
   */
  $.fn.dataTable.ext.buttons.pdf = {
    name: 'pdf',
    className: 'buttons-pdf btn-primary',
    titleAttr: 'Export as PDF',
    text: '<small><b>PDF</b></small>',
    action: function (e, dt, button, config) {
      window.location = _buildUrl(dt, 'pdf')
    },
  }

  /**
   * DataTables print button.
   *
   * -- Laravel Integration --
   *
   * Button::make('print')
   *
   */
  $.fn.dataTable.ext.buttons.print = {
    name: 'print',
    className: 'buttons-print btn-primary',
    titleAttr: 'Print',
    text: '<small><b>PRINT</b></small>',
    action: function (e, dt, button, config) {
      window.location = _buildUrl(dt, 'print')
    },
  }

  /**
   * DataTables reset button.
   *
   * -- Laravel Integration --
   *
   * Button::make('reset')
   *
   */
  $.fn.dataTable.ext.buttons.reset = {
    name: 'reset',
    className: 'btn-primary',
    titleAttr: 'Reset',
    text: '<small><b>RESET</b></small>',
    action: function (e, dt, button, config) {
      $('.dataTable')
        .find(':input')
        .each(function () {
          $(this).val('')
        })
        .each(function (e) {
          let val = $.fn.dataTable.util.escapeRegex($(this).val())
          dt.table()
            .column($(this).closest('th').index())
            .search(val ? val : '', false, true)
        })
      dt.search('').draw()
    },
  }

  /**
   * DataTables reload button.
   *
   * -- Laravel Integration --
   *
   * Button::make('reload')
   *
   */
  $.fn.dataTable.ext.buttons.reload = {
    name: 'reload',
    className: 'btn-primary',
    titleAttr: 'Reload',
    text: '<small><b>RELOAD</b></small>',
    action: function (e, dt, button, config) {
      dt.draw(false)
    },
    init: function (dt, node, config) {
      let instance = this
      dt.on('processing.dt', (e, settings, processing) => {
        let button = $(node)

        if (processing) {
          button.html('<i class="spinner-border spinner-border-sm" role="status">\n' + '  <span class="visually-hidden">Loading...</span>\n' + '</i>')
        } else {
          button.html('<small><b>RELOAD</b></small>')
        }

        button.attr('disabled', processing)
      })
    },
  }

  /**
   * DataTables restore button.
   *
   * -- Laravel Integration --
   *
   * Button::make('restore')->text('Restore Selected Records')
   *
   */
  $.fn.dataTable.ext.buttons.restore = {
    name: 'restore',
    extend: 'selected',
    className: 'buttons-restore btn-success',
    text: '<i class="bi bi-undo"></i> Restore',
    action: function (e, dt, node, config) {
      let editor = config.editor || dt.editor()
      editor.remove(dt.rows({ selected: true }).indexes(), {
        title: config.formTitle || 'Restore Record',
        message: function (e, dt) {
          let row = dt.row({ selected: true }).data()
          let msg = row.DTE_Restore || 'Are you sure you want to restore record # ' + row.DT_RowId + '?'
          return msg
        },
        buttons: [
          {
            text: '<i class="bi bi-undo"></i> Restore',
            className: 'btn btn-success btn-editor-restore',
            action: function () {
              this.submit(null, null, function (data) {
                data.action = 'restore'
              })
            },
          },
          {
            text: 'Cancel',
            className: 'btn ml-2',
            action: function () {
              this.close()
            },
          },
        ],
      })
    },
  }

  /**
   * DataTables duplicate button.
   *
   * -- Laravel Integration --
   *
   * Button::make('duplicate')
   *
   */
  $.fn.dataTable.ext.buttons.duplicate = {
    name: 'duplicate',
    extend: 'selected',
    className: 'buttons-duplicate btn-success',
    text: '<i class="bi bi-copy"></i> Duplicate',
    action: function (e, dt, node, config) {
      // Start in edit mode, and then change to create
      let editor = config.editor || dt.editor()
      editor
        .edit(dt.rows({ selected: true }).indexes(), {
          title: config.formTitle || 'Duplicate Record',
          buttons: config.formButtons || [
            {
              text: '<i class="bi bi-copy"></i> Duplicate',
              className: 'btn btn-success btn-editor-duplicate',
              action: function () {
                this.submit()
              },
            },
            {
              text: 'Cancel',
              className: 'btn ml-2',
              action: function () {
                this.close()
              },
            },
          ],
        })
        .mode('create')
    },
  }

  /**
   * DataTables duplicateSingle button.
   *
   * -- Laravel Integration --
   *
   * Button::make('duplicateSingle')
   *
   */
  $.fn.dataTable.ext.buttons.duplicateSingle = {
    name: 'duplicateSingle',
    extend: 'selectedSingle',
    className: 'buttons-duplicate btn-success',
    text: '<i class="bi bi-copy"></i> Duplicate',
    action: function (e, dt, node, config) {
      // Start in edit mode, and then change to create
      let editor = config.editor || dt.editor()
      editor
        .edit(dt.rows({ selected: true }).indexes(), {
          title: config.formTitle || 'Duplicate Record',
          buttons: config.formButtons || [
            {
              text: '<i class="bi bi-copy"></i> Duplicate',
              className: 'btn btn-success btn-editor-duplicate',
              action: function () {
                this.submit()
              },
            },
            {
              text: 'Cancel',
              className: 'btn ml-2',
              action: function () {
                this.close()
              },
            },
          ],
        })
        .mode('create')
    },
  }

  /**
   * DataTables forceDelete button.
   *
   * -- Laravel Integration --
   *
   * Button::make('forceDelete')->text('Permanently Delete Selected Records')
   *
   */
  $.fn.dataTable.ext.buttons.forceDelete = {
    name: 'forceDelete',
    extend: 'selected',
    className: 'buttons-force-delete btn-danger',
    text: '<i class="bi bi-trash"></i> Force Delete',
    action: function (e, dt, node, config) {
      let editor = config.editor || dt.editor()
      editor.remove(dt.rows({ selected: true }).indexes(), {
        title: config.formTitle || 'Force Delete Record(/s)',
        message: function (e, dt) {
          let data = dt.rows(e.modifier()).data()
          let rows = data[0].hasOwnProperty('DTE_Remove') ? data.pluck('DTE_Remove') : data.pluck('DT_RowId')
          return 'Are you sure you want to force delete the ' + 'following record(s)? <ul><li>' + rows.join('</li><li>') + '</li></ul>'
        },
        buttons: [
          {
            text: '<i class="bi bi-trash"></i> Delete',
            className: 'btn btn-danger btn-editor-remove',
            action: function () {
              this.submit(null, null, function (data) {
                data.action = 'forceDelete'
              })
            },
          },
          {
            text: 'Cancel',
            className: 'btn ml-2',
            action: function () {
              this.close()
            },
          },
        ],
      })
    },
  }

  /**
   * DataTables forceDeleteSingle button.
   *
   * -- Laravel Integration --
   *
   * Button::make('forceDeleteSingle')->text('Permanently Delete Selected Record')
   *
   */
  $.fn.dataTable.ext.buttons.forceDeleteSingle = {
    name: 'forceDeleteSingle',
    extend: 'selectedSingle',
    className: 'buttons-force-delete btn-danger',
    text: '<i class="bi bi-trash"></i> Force Delete',
    action: function (e, dt, node, config) {
      let editor = config.editor || dt.editor()
      editor.remove(dt.rows({ selected: true }).indexes(), {
        title: config.formTitle || 'Force Delete Record',
        message: function (e, dt) {
          let row = dt.row({ selected: true }).data()
          let msg = row.DTE_Remove || 'Are you sure you want to force delete record # ' + row.DT_RowId + '?'
          return msg
        },
        buttons: [
          {
            text: '<i class="bi bi-trash"></i> Delete',
            className: 'btn btn-danger btn-editor-remove',
            action: function () {
              this.submit(null, null, function (data) {
                data.action = 'forceDelete'
              })
            },
          },
          {
            text: 'Cancel',
            className: 'btn ml-2',
            action: function () {
              this.close()
            },
          },
        ],
      })
    },
  }

  /**
   * DataTables URL button.
   *
   * -- Laravel Integration --
   *
   * // Add DTE_URL column to response.
   * datatables($query)
   *     ->addColumn('DTE_URL', '{{ $url }}')
   *     ->addColumn('edit_url', '{{ $url }}')
   *     ...
   *
   * // Add URL button to open the row link.
   * Button::make('url')->text('Edit'),
   * Button::make('url')->data('edit_url')->text('Edit')
   *
   */
  $.fn.dataTable.ext.buttons.url = {
    name: 'url',
    extend: 'selectedSingle',
    className: 'buttons-url',
    text: 'URL Action (change me)',
    action: function (e, dt, node, config) {
      let data = dt.row({ selected: true }).data()
      let key = config.data || 'DTE_URL'
      let url = data[key] || '#'

      if (config.target == '_blank') {
        window.open(url, '_blank')
      } else {
        window.location = url
      }
    },
  }

  /**
   * DataTables Ajax button.
   *
   * -- Laravel Integration --
   *
   * // Add DTE_AJAX column to response.
   * datatables($query)
   *     ->addColumn('DTE_AJAX', '{{ $url }}')
   *     ->addColumn('restore_url', '{{ $url }}')
   *     ...
   *
   * Button::make('ajax')
   *     ->text('Restore')
   *     ->confirmation('Generic confirmation message.') // Optional if you want confirmation before proceeding.
   *     ->onCancel('function(response) { alert('confirmation cancelled') }')
   *     ->onSuccess('function(response) { alert('success') }')
   *     ->onError('function(err) { alert('error') }')
   *     ->method('POST') // default ajax method is POST.
   *
   * Button::make('ajax')
   *     ->text('Restore')
   *     ->data('restore_url')
   *     ->onSuccess('function(response) { alert('success') }')
   *     ->onError('function(err) { alert('error') }')
   *
   */
  $.fn.dataTable.ext.buttons.ajax = {
    name: 'ajax',
    extend: 'selectedSingle',
    className: 'buttons-ajax',
    text: 'Ajax Action (Change Me)',
    action: function (e, dt, node, config) {
      let data = dt.row({ selected: true }).data()
      let url = data[config.data || 'DTE_AJAX'] || ''
      let method = config.method || 'POST'

      if (config.hasOwnProperty('confirmation')) {
        if (!confirm(config.confirmation)) {
          if (config.hasOwnProperty('onCancel')) config.onCancel()

          return false
        }
      }

      $.ajax({
        url: url,
        method: method,
        data: data,
      })
        .done((response) => {
          if (config.hasOwnProperty('onSuccess')) config.onSuccess(response)

          dt.draw()
        })
        .fail((err) => {
          if (config.hasOwnProperty('onError')) config.onError(err)
        })
    },
  }

  /**
   * DataTables Batch Ajax action button.
   *
   * -- Laravel Integration --
   *
   * Button::make('ajaxBatch')
   *     ->text('Restore')
   *     ->url(route('batch-restore-action-url'))
   *     ->confirmation('Generic confirmation message.') // Optional if you want confirmation before proceeding.
   *     ->onCancel('function(response) { alert('confirmation cancelled') }')
   *     ->onSuccess('function(response) { alert('success') }')
   *     ->onError('function(err) { alert('error') }')
   *
   */
  $.fn.dataTable.ext.buttons.ajaxBatch = {
    name: 'ajaxBatch',
    extend: 'selected',
    className: 'buttons-ajax',
    text: 'Ajax Batch Action (Change Me)',
    action: function (e, dt, node, config) {
      let selected = dt.rows({ selected: true }).data()
      let formData = { data: [] }
      for (i = 0; i < selected.count(); i++) {
        formData.data.push(selected[i])
      }

      if (config.hasOwnProperty('confirmation')) {
        if (!confirm(config.confirmation)) {
          if (config.hasOwnProperty('onCancel')) config.onCancel()

          return false
        }
      }

      let url = config.url || ''
      let method = config.method || 'POST'

      $.ajax({
        url: url,
        method: method,
        data: formData,
      })
        .done((response) => {
          if (config.hasOwnProperty('onSuccess')) config.onSuccess(response)

          dt.draw()
        })
        .fail((err) => {
          if (config.hasOwnProperty('onError')) config.onError(err)
        })
    },
  }

  /**
   * DataTables Toggle Scope button.
   *
   * -- Laravel Integration --
   *
   * Note: toggle function currently depends on 'bi-square'. Be sure to include it when overriding the text.
   *
   * Button::make('toggleScope')
   *     ->text('<i class="bi bi-square"></i> Only Deleted')
   *     ->scope('onlyDeleted')
   *
   * This will append the following data on ajax requests:
   *     draw: 1,
   *     ...
   *     scopes[onlyDeleted] = 0 / 1
   */
  $.fn.dataTable.ext.buttons.toggleScope = {
    name: 'toggleScope',
    className: 'buttons-toggle',
    text: '<i class="bi bi-square"></i> Toggle',
    action: function (e, dt, node, config) {
      node.find('i').toggleClass('bi-check-square').toggleClass('bi-square')

      let scope = config.scope
      let key = config.key || 'scopes'
      dt.on('preXhr.' + scope, (e, conf, data) => {
        data[key] = data[key] || {}
        data[key][scope] = node.find('i.bi-check-square').length
      })

      dt.draw()
    },
  }

  /**
   * DataTables withTrashed button.
   *
   * -- Laravel Integration --
   *
   * Note: toggle function currently depends on 'fa-square'. Be sure to include it when overriding the text.
   *
   * Button::make('withTrashed')->text('<i class="bi bi-square"></i> Show Deleted')
   *
   * This will append the following data on ajax requests:
   *     draw: 1,
   *     ...
   *     scopes[withTrashed] = 0 / 1
   *
   * -- Using custom data key --
   * Button::make('withTrashed')->text('<i class="bi bi-square"></i> Show Deleted')->key('filters')
   *
   * This will append the following data on ajax requests:
   *     draw: 1,
   *     ...
   *     filters[withTrashed] = 0 / 1
   *
   */
  $.fn.dataTable.ext.buttons.withTrashed = {
    name: 'withTrashed',
    className: 'buttons-toggle',
    text: '<i class="bi bi-square"></i> Show Deleted',
    action: function (e, dt, node, config) {
      node.find('i').toggleClass('fa-check-square').toggleClass('fa-square')

      let key = config.key || 'scopes'
      dt.on('preXhr.withTrashed', (e, conf, data) => {
        data[key] = data[key] || {}
        data[key].withTrashed = node.find('i.fa-check-square').length
      })

      dt.draw()
    },
  }

  /**
   * DataTables onlyTrashed button.
   *
   * -- Laravel Integration --
   *
   * Note: toggle function currently depends on 'fa-square'. Be sure to include it when overriding the text.
   *
   * Button::make('onlyTrashed')->text('<i class="bi bi-square"></i> Only Deleted')
   *
   * This will append the following data on ajax requests:
   *     draw: 1,
   *     ...
   *     scopes[onlyTrashed] = 0 / 1
   *
   * -- Using custom data key --
   * Button::make('onlyTrashed')->text('<i class="bi bi-square"></i> Only Deleted')->key('filters')
   *
   * This will append the following data on ajax requests:
   *     draw: 1,
   *     ...
   *     filters[onlyTrashed] = 0 / 1
   *
   */
  $.fn.dataTable.ext.buttons.onlyTrashed = {
    name: 'onlyTrashed',
    className: 'buttons-toggle',
    text: '<i class="bi bi-square"></i> Only Deleted',
    action: function (e, dt, node, config) {
      node.find('i').toggleClass('fa-check-square').toggleClass('fa-square')

      let key = config.key || 'scopes'
      dt.on('preXhr.onlyTrashed', (e, conf, data) => {
        data[key] = data[key] || {}
        data[key].onlyTrashed = node.find('i.fa-check-square').length
      })

      dt.draw()
    },
  }
})
