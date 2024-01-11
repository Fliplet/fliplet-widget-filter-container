Fliplet.Widget.generateInterface({
  title: 'Filter container',
  fields: [
    {
      type: 'html',
      html: `<p class="list-from-data-source">List from data source name (ID: <span class="data-source-id"></span>)</p>
            <p class="info-text">To change Data source go to Data Container Settings</p>`
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
