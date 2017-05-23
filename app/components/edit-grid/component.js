import Ember from 'ember';
import EditGrid from 'npm:editable-grid';

export default Ember.Component.extend({

  hostedService: Ember.inject.service(),

  fieldTypes: {
    string: 'esriFieldTypeString',
    integer: 'esriFieldTypeInteger',
    double: 'esriFieldTypeDouble',
    date: 'esriFieldTypeDate'
  },

  fieldLengthDefaults: {
    string: 255,
    integer: 'esriFieldTypeInteger',
    double: 'esriFieldTypeDouble',
    date: 'esriFieldTypeDate'
  },

  actions: {
    publish: function () {
      Ember.$('#btnPublish').addClass('disabled');
      Ember.$('#successMessage').html('Publishing ...');

      const data = this.get('config.data');

      const fieldTypes = this.get('fieldTypes');

      let fields = [], field;
      data.forEach( (row) => {
        field = {
          name: row.name,
          alias: row.alias,
          type: fieldTypes[row.type.toLowerCase()]
        };

        if (row.type.toLowerCase() === 'string') {
          field.length = 255;
        }

        fields.push( field );
      });

      const serviceName = Ember.$('#txtName').val();

      let params = {
        name: serviceName
      };

      const userName = this.get('session.currentUser.username');

      const hostedService = this.get('hostedService');

      let folderId = Ember.$('#selFolders').val();

      if (folderId === 'root') {
        folderId = null;
      }

      hostedService.create( params, userName, folderId)
        .then( (response) => {

          const itemId = response.itemId;
          const portalKey = this.get('session.portal.urlKey');

          const itemUrl = `http://${portalKey}.maps.arcgis.com/home/item.html?id=${itemId}`;

          let fsUrl = response.serviceurl;

          const geometryType = Ember.$('.geomType > a.active').data().geomtype;

          const layerId = 0;

          let definition = {
            layers: [
              {
                id: layerId,
                name: serviceName,
                "displayField" : "",
                "description" : "",
                "copyrightText" : "",
                "defaultVisibility" : true,
                "isDataVersioned" : false,
                "supportsCalculate" : true,
                 "supportsAttachmentsByUploadId" : true,
                 "supportsRollbackOnFailureParameter" : true,
                 "supportsStatistics" : true,
                 "supportsAdvancedQueries" : true,
                 "supportsValidateSql" : true,
                 "supportsCoordinatesQuantization" : true,
                 "supportsApplyEditsWithGlobalIds" : true,
                 "advancedQueryCapabilities" : {
                   "supportsPagination" : true,
                   "supportsQueryWithDistance" : true,
                   "supportsReturningQueryExtent" : true,
                   "supportsStatistics" : true,
                   "supportsOrderBy" : true,
                   "supportsDistinct" : true,
                   "supportsQueryWithResultType" : true,
                   "supportsSqlExpression" : true,
                   "supportsReturningGeometryCentroid" : true
                 },
                 "useStandardizedQueries" : false,
                "geometryType" : geometryType,
                "extent" : {
                  "xmin" : -13090714.767112788,
                  "ymin" : 3841739.0914657288,
                  "xmax" : -12922032.654624918,
                  "ymax" : 3962581.2727843975,
                  "spatialReference" : {
                    "wkid" : 102100,
                    "latestWkid" : 3857
                  }
                },
                type: 'Feature Layer',
                "allowGeometryUpdates" : true,
                "hasAttachments" : false,
                "htmlPopupType" : "esriServerHTMLPopupTypeNone",
                "hasM" : false,
                "hasZ" : false,
                globalIdField : "GlobalID",
                objectIdField: "FID",
                fields: [
                  { name: 'FID', alias: 'FID', type: 'esriFieldTypeInteger', nullable: false, editable: false, defaultValue: null, length: 4},
                  { name: 'GlobalID', alias: 'GlobalID', type: 'esriFieldTypeGlobalID', "defaultValue" : "NEWID() WITH VALUES"}
                ],
                "supportedQueryFormats" : "JSON",
                "hasStaticData" : false,
                "maxRecordCount" : 1000,
                "standardMaxRecordCount" : 4000,
                "tileMaxRecordCount" : 4000,
                "maxRecordCountFactor" : 1,
                "capabilities" : "Create,Delete,Query,Update,Editing,Extract,Sync",
                "exceedsLimitFactor" : 1
              }
            ]
          };

          definition.layers[0].fields = definition.layers[0].fields.concat(fields);

          hostedService.addToDefinition( fsUrl, definition, layerId )
            .then( (response) => {

              if (response.success) {
                Ember.$('#successMessage').html(`Success! <a href="${itemUrl}" target="_blank">View Item Page</a>`);
              } else {
                Ember.$('#successMessage').html(`error creating service :: JSON.stringify(${response})`);
              }

              Ember.$('#btnPublish').removeClass('disabled');
            });

        }, (error) => {
          Ember.$('#successMessage').html(`error creating service :: ${error}`);
          Ember.$('#btnPublish').removeClass('disabled');
        });
    }
  },

  didInsertElement() {

    const config = {
      el: Ember.$('#edit-grid'),
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
        },
        {
          id: 'type',
          title: 'Type',
          type: 'select',
          list: ['String', 'Integer', 'Double', 'Date'],
          width: '80%',
          preCreateCallback: function () {
            return 'String';
          }
        }
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
