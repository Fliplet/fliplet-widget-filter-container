// Register this widget instance
Fliplet.Widget.instance({
  name: 'filter-container',
  displayName: 'Filter container',
  template: '<div data-view="content"></div>',
  render: {
    ready: function() {
      let filterContainer = this;

      filterContainer.fields = _.assign(
        {
          isListOnDifferentScreen: [true],
          action: { action: 'screen' }
        },
        filterContainer.fields
      );

      let $filterContainer = $(filterContainer);
      let isListOnDifferentScreen = filterContainer.fields.isListOnDifferentScreen.includes(true);
      let screenAction = filterContainer.fields.action;
      let lfdPage;

      // Initialize children components when this widget is ready
      Fliplet.Widget.initializeChildren(filterContainer.$el, filterContainer);

      if (!Fliplet.FormBuilder) {
        Fliplet.UI.Toast('Please add a form component');

        return Promise.reject('');
      }

      if (!isListOnDifferentScreen) {
        if (!Fliplet.DynamicContainer) {
          Fliplet.UI.Toast('Please add a Dynamic list component and List repeater inside it');

          return Promise.reject('');
        }

        Fliplet.DynamicContainer.get().then(container => {
          container.connection().then(connection => {
            // data source id from Data Container
            $filterContainer.find('.data-source-id').html(connection.id);
          });
        });

        $filterContainer.find('.list-from-data-source').show();
        $filterContainer.find('.info-text').html('To change Data source go to Data Container Settings');
      } else {
        $filterContainer.find('.list-from-data-source').hide();
        $filterContainer.find('.info-text').html('To change Data source go to Data Container Settings on the LFD page');
        // or
        // $filterContainer.find('.data-source-id').html('TODO check how to read DS from different page');
      }

      Fliplet.Hooks.on('beforeFormSubmit', function() {
        var where = {};

        return Fliplet.FormBuilder.get().then(function(form) {
          form.instance.fields.forEach(function(field) {
            if (!field.value) return;

            switch (field._type) {
              case 'flInput':
              case 'flEmail':
              case 'flTextarea':
              case 'flTelephone':
              case 'flNumber':
              case 'flDate':
              case 'flTime':
                where[field.name] = field.value;
                break;
              case 'flCheckbox':
              case 'flRadio':
              case 'flSelect':
              case 'flTypeahead':
                where[field.name] = { $in: field.value };
                break;
              case 'flDateRange':
              case 'flTimeRange':
                if (field.value.start && field.value.end) {
                  where[field.name] = { $and: [{ $gte: field.value.start }, { $lte: field.value.end }] };
                }

                break;
              default:
                return;
            }
          });

          if (isListOnDifferentScreen) {
            lfdPage = screenAction;
            Fliplet.App.Storage.set(lfdPage.page, where);
          } else {
            lfdPage = Fliplet.Env.get('pageId');
            Fliplet.App.Storage.set(lfdPage, where);
          }


          if (isListOnDifferentScreen) {
            Fliplet.Navigate.screen(lfdPage.page, { query: lfdPage.query || '', transition: lfdPage.transition || 'fade' });
          }

          // TODO check if we are updating list repeater from here
          // because two components are on the same page in this case
          return Promise.reject('');
        });
      });
    }
  },
  views: [
    {
      name: 'content',
      displayName: 'Filter content',
      placeholder: '<div class="well text-center">Add form component to build your filters</div>'
    }
  ]
});
