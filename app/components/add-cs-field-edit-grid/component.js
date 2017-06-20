import Ember from 'ember';
import EditGrid from 'npm:editable-grid';

export default Ember.Component.extend({

  itemsService: Ember.inject.service(),
  hostedService: Ember.inject.service(),

  actions: {
    addFields: function () {
      Ember.$('#btnAddFields').addClass('disabled');
      Ember.$('#successMessage').html('Adding Fields to Feature Service ...');

      const data = this.get('config.data');

      // const fieldTypes = this.get('fieldTypes');

      let esriFields = [], csFields = {}, field;

      data.forEach( (row) => {

        field = {
          name: row.name,
          alias: row.alias,
          type: 'esriFieldTypeString',
          length: 255
        };

        esriFields.push( field );

        csFields[row.name] = {
          required: true,
          type: 'textarea',
          fieldID: row.name,
          label: row.alias,
          attributeName: row.name.toLowerCase(),
          validations: [ 'arcgisSupportedHtml']
        };
      });

      const defintionToAdd = {
        fields: esriFields
      };

      const appId = Ember.$('#selItems').find(':selected').attr('id');
      const appUrl = Ember.$('#selItems').find(':selected').data('url');

      const itemsService = this.get('itemsService');

      itemsService.getDataById(appId)
        .then( (response) => {
          let appDataResponse = response;

          const webmapId = response.values.settings.components.map.webmap;

          itemsService.getDataById(webmapId)
            .then( (response) => {
              const featureServiceUrl = response.operationalLayers[0].url;
              // const featureServiceItemId = response.operationalLayers[0].itemId;

              const hostedService = this.get('hostedService');

              hostedService.addToDefinition(featureServiceUrl, defintionToAdd, 0)
                .then( (response) => {
                  Ember.$('#successMessage').html('Adding Fields to Story Map Template ...');

                  let appFields = appDataResponse.values.settings.components.map.crowdsourceLayer.fields;
                  Object.keys(csFields).forEach( (key) => {
                    appFields[key] = csFields[key];
                  });

                  let updateItem = {
                    id: appId,
                    owner: this.get('session.currentUser.username'),
                    text: JSON.stringify(appDataResponse)
                  };

                  itemsService.update(updateItem)
                    .then( (response) => {
                      Ember.$('#successMessage').html(`Successfully added field(s) to Story Map! <br> <a href="${appUrl}" target="_blank">View Application</a>`);
                      Ember.$('#btnAddFields').removeClass('disabled');
                    }, (error) => {
                      console.log('error updating story map template', error);
                      Ember.$('#btnAddFields').removeClass('disabled');
                    });

                }, (error) => {
                  console.log('error adding to FS definition', error);
                  Ember.$('#btnAddFields').removeClass('disabled');
                });

            }, (error) => {
              console.log('error getting data for webmapId', error);
              Ember.$('#btnAddFields').removeClass('disabled');
            });

        }, (error) => {
          console.log('error getting data for appId', error);
          Ember.$('#btnAddFields').removeClass('disabled');
        });
    }
  },

  didInsertElement() {

    const config = {
      el: Ember.$('#edit-grid-cs'),
      borders: true,
      stateManager: {
        isEditable: function () {
          return true;
        }
      },
      rows: {
        newRow: true
      },
      columns: [
        {
          id: 'name',
          title: 'Name',
          width: '80%'
        },
        {
          id: 'alias',
          title: 'Alias',
          width: '80%'
        }
        // ,{
        //   id: 'type',
        //   title: 'Type',
        //   type: 'select',
        //   list: ['String', 'Integer', 'Double', 'Date'],
        //   width: '80%',
        //   preCreateCallback: function () {
        //     return 'String';
        //   }
        // }
      ],
      data: [
        {
          id: 'id-1',
          name: 'my_field',
          alias: 'My Field',
          type: 'String'
        }
      ]
    };

    this.set('config', config);

    const g = new EditGrid(config);

    g._createDeleteRows = function () {
      var finds = this.options.el.find('td[data-col-id="' + this.options.columns[0].id + '"]');
      var tds = finds.filter(function (index) {
          return index < finds.length-1;
        });

      tds.addClass('delete-column');
      tds.prepend(
              '<div class="row-delete">' +
              '<button type="button" class="close" aria-hidden="true">&times;</button>' +
              '</div>');
    };

    g.render();

    this.updateAddFieldButton();

    g.on('editable-can-delete', function (/*rowId*/) {
      // could add a confirm message box here
      return Ember.$.Deferred().resolve();
      // return true;
    });
    g.on('editable-new-row', function(newObj) {
      console.log(newObj);
    });

    var me = this;
    g.on('editable-post-render', function () {
      // console.log('post-render');
      g.trigger('editable-delete-mode', true);

      me.updateAddFieldButton();
      me.updateRemoveFieldButton();
    });

    g.trigger('editable-delete-mode', true);

    this.updateRemoveFieldButton();

    this.set('grid', g);
  },

  updateRemoveFieldButton() {
    Ember.$('.row-delete button').html('<span class="glyphicon glyphicon-trash text-danger"></span>');
  },

  updateAddFieldButton() {
    Ember.$('.editable-footer-table button')
      .removeClass('btn-link')
      .addClass('btn-default btn-lg')
      .text('Add Field');
  }

});
