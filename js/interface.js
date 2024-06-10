// let dynamicContainer = null;
// let htmlToShow = '';
// let dataSourceObj = null;

// Fliplet.Widget.findParents({ filter: { package: 'com.fliplet.dynamic-container' } }).then(async widgets => {
//   if (widgets.length === 0) {
//     htmlToShow = '<p style="font-size: 10px; font-weight: 400; color: #E7961E;">To change Data source go to Dynamic Container Settings on the LFD page</p>';
//   } else {
//     dynamicContainer = widgets[0];
//     dataSourceObj = await Fliplet.DataSources.getById(dynamicContainer && dynamicContainer.dataSourceId, {
//       attributes: ['name']
//     }).then(dataSource => {
//       return dataSource;
//     });

//     htmlToShow = `<p style="color: #A5A5A5; font-size: 12px; font-weight: 400;">List from ${dataSourceObj.name}(ID: <span class="data-source-id">${dynamicContainer.dataSourceId}</span>)</p>
//     <p style="font-size: 10px; font-weight: 400; color: #E7961E;">To change Data source go to Data Container Settings</p>
//     <hr/>`;
//   }

//   return
Fliplet.Widget.generateInterface({
  title: 'Filter container',
  fields: [
    // {
    //   type: 'html',
    //   html: htmlToShow
    // },
    // {
    //   name: 'isListOnDifferentScreen',
    //   type: 'checkbox',
    //   label: 'List is on the different screen than filter',
    //   options: [{ value: true, label: 'yes' }],
    //   default: [],
    //   change: function(value) {
    //     // Fliplet.Helper.field('action').toggle(value.includes(true));
    //   },
    //   ready: function() {
    //     // Fliplet.Helper.field('action').toggle(
    //     //   Fliplet.Helper.field('isListOnDifferentScreen').get().includes(true)
    //     // );
    //   }
    // },
    {
      name: 'action',
      type: 'provider',
      label: 'Choose an action to do when the button is pressed',
      package: 'com.fliplet.link',
      data: {},
      onEvent: function(event, payload) {
        debugger;
      },
      ready: function(x, y) {
        debugger;
        // setTimeout(() => {
        //   Fliplet.Helper.field('action').set(y);
        // }, 2000);
      }
    }
  ]
});
// });
