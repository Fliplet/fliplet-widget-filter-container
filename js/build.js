Fliplet.Widget.instance({
  name: 'filter-container',
  displayName: 'Filter container',
  template: '<div data-view="content"></div>',
  render: {
    ready: async function() {
      const filterContainer = this;
      const filterContainerInstanceId = filterContainer.id;

      filterContainer.fields = _.assign(
        {
          isListOnDifferentScreen: [true],
          action: { action: 'screen' }
        },
        filterContainer.fields
      );

      const isListOnDifferentScreen = filterContainer.fields.isListOnDifferentScreen.includes(true);
      let screenAction = filterContainer.fields.action;
      let lfdPage;

      // Initialize children components when this widget is ready
      await Fliplet.Widget.initializeChildren(filterContainer.$el, filterContainer);

      if (!Fliplet.FormBuilder) {
        Fliplet.UI.Toast('Please add a form component');

        return Promise.reject('');
      } else if (!isListOnDifferentScreen) {
        Fliplet.Widget.findParents({ instanceId: filterContainerInstanceId }).then(widgets => {
          let dynamicContainer = null;

          widgets.forEach(widget => {
            if (widget.package === 'com.fliplet.dynamic-container') {
              dynamicContainer = widget;
            }
          });

          if (!dynamicContainer || !dynamicContainer.dataSourceId) {
            errorMessageStructureNotValid($(filterContainer.$el), 'Please add a Dynamic list component and a List repeater in it');

            return Promise.reject('');
          }
        });
      }

      Fliplet.Hooks.on('beforeFormSubmit', () => {
        let where = {};

        return Fliplet.FormBuilder.get().then(form => {
          form.instance.fields.forEach(field => {
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

            let query = lfdPage.query || '';

            query += `${query ? '&' : '?'}filtersApplied=true`;

            Fliplet.Navigate.screen(lfdPage.page, { query, transition: lfdPage.transition || 'fade' });
          } else {
            lfdPage = Fliplet.Env.get('pageId');
            Fliplet.App.Storage.set(lfdPage, where);
          }

          // TODO check if we are updating list repeater from here
          // because two components are on the same page in this case
          return Promise.reject('');
        });
      });

      // TODO remove when product provides solution
      function errorMessageStructureNotValid($element, message) {
        $element.addClass('component-error-before-xxx');
        Fliplet.UI.Toast(message);
      }
    }
  },
  views: [
    {
      name: 'content',
      displayName: 'Filter content',
      placeholder: '<div class="text-center">Configure filter and drag & drop form components to create filter</div>'
    }
  ]
});
