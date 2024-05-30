let dynamicContainer = null;
let htmlToShow = '';
let dataSourceObj = null;

Fliplet.Widget.findParents({ filter: { package: 'com.fliplet.dynamic-container' } }).then(async widgets => {
  if (widgets.length === 0) {
    htmlToShow = '<p class="info-text">To change Data source go to Dynamic Container Settings on the LFD page</p>';
  } else {
    dynamicContainer = widgets[0];
    dataSourceObj = await Fliplet.DataSources.getById(dynamicContainer && dynamicContainer.dataSourceId, {
      attributes: ['name']
    }).then(dataSource => {
      return dataSource;
    });

    htmlToShow = `<p class="list-from-data-source">List from data source name ${dataSourceObj.name} (ID: <span>${dynamicContainer.dataSourceId}</span>)</p>
    <p class="info-text">To change Data source go to Dynamic Container Settings</p>`;
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
        options: [{ value: true, label: 'yes' }],
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
        package: 'com.fliplet.link'
      }
    ]
  });
});
