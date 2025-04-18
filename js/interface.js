let dynamicContainer = null;
let htmlToShow = '';
let dataSourceObj = null;

Fliplet.Widget.findParents({ filter: { package: 'com.fliplet.dynamic-container' } }).then(async widgets => {
  if (widgets.length === 0) {
    htmlToShow = '<p style="font-size: 10px; font-weight: 400; color: #E7961E;">To change Data source go to Data Container Settings on the LFD page</p>';
  } else {
    dynamicContainer = widgets[0];

    if (dynamicContainer) {
      if (dynamicContainer.dataSourceId) {
        dataSourceObj = await Fliplet.DataSources.getById(dynamicContainer.dataSourceId, {
          attributes: ['name']
        }).then(dataSource => {
          return dataSource;
        });

        htmlToShow = `<p style="color: #A5A5A5; font-size: 12px; font-weight: 400;">List from ${dataSourceObj.name}(ID: <span class="data-source-id">${dynamicContainer.dataSourceId}</span>)</p>
        <p style="font-size: 10px; font-weight: 400; color: #E7961E;">To change Data source go to Data Container Settings</p>
        <hr/>`;
      } else {
        htmlToShow = '<p style="font-size: 10px; font-weight: 400; color: #E7961E;">Please select Data source from Data Container Settings</p>';
      }
    } else {
      htmlToShow = '<p style="font-size: 10px; font-weight: 400; color: #E7961E;">Data Container component is required</p>';
    }
  }

  return Fliplet.Widget.generateInterface({
    title: 'Filter container',
    fields: [
      {
        type: 'html',
        html: htmlToShow
      },
      {
        name: 'isListOnDifferentScreen',
        type: 'checkbox',
        label: 'List is on the different screen than filter',
        options: [{ value: true, label: 'Yes' }],
        default: [],
        change: function(value) {
          Fliplet.Helper.field('action').toggle(value.includes(true));
        },
        ready: function() {
          Fliplet.Helper.field('action').toggle(
            Fliplet.Helper.field('isListOnDifferentScreen').get().includes(true)
          );
        }
      },
      {
        name: 'action',
        type: 'provider',
        label: 'Choose an action to do when the button is pressed',
        description: 'Note, to apply your list filters you need to keep “Submit” form button.',
        package: 'com.fliplet.link',
        data: function(value) {
          return _.assign({}, value, {
            options: {
              actionLabel: 'Click action'
            }
          });
        }
      }
    ]
  });
});
