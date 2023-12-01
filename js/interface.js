// This function is used to generate the interface for the widget
Fliplet.Widget.generateInterface({
  title: 'Filter container',
  // Define the fields that will be available in the interface
  fields: [
    {
      name: 'isListOnDifferentScreen',
      type: 'checkbox',
      label: 'List is on the different screen than filter',
      options: [{ value: true, label: 'yes' }],
      default: [],
      change: function(value) {
        Fliplet.Helper.field('action')
          .toggle(!value.includes(true));
      }
    },
    {
      name: 'action',
      type: 'provider',
      label: 'Choose an action to do when the button is pressed',
      package: 'com.fliplet.link'
      // mode: 'full-screen',
      // html: '<button data-open-provider>Configure</button> You selected  files',
      // ready: function(el, value, provider) {
      //   // Link provider is rendered
      //   console.log('el', el);
      //   console.log('value', value);
      //   console.log('provider', provider);
      //   debugger;
      // },
      // onEvent: function(eventName, data) {
      //   // Listen for events fired from the provider
      //   console.log('eventName', eventName);
      //   console.log('data', data);
      //   debugger;
      // }
    }
  ]
});
