import Ember from 'ember';
import ENV from 'oceansounds/config/environment';

export default Ember.Component.extend({

  hostedService: Ember.inject.service(),

  showCreateSuccess: true,

  actions: {
    addField: function () {
      const grid = window.editableGrid;
      const rows = editableGrid.getRowCount();
      let index;
      if (rows === 0) {
        index = 1;
      } else {
        index = rows + 1;
      }
      const newRow = {
        name: `my_field${index}`,
        alias: `My Field${index}`,
        type: 'esriFieldTypeString'
      };

      grid.insertAfter(index, index, newRow);
    },

    publish: function () {
      Ember.$('#btnPublish').addClass('disabled');
      Ember.$('#successMessage').html('Publishing ...');

      const grid = window.editableGrid;
      const rowCount = grid.getRowCount();
      let fields=[], row;
      for (let i=0; i < rowCount;i++) {
        row = grid.getRowValues(i);
        fields.push({
          name: row.name,
          alias: row.alias,
          type: row.type
        });
      }

      // console.log('fields', fields);

      const serviceName = Ember.$('#txtName').val();

      let params = {
        name: serviceName
      };

      const userName = this.get('session.currentUser.username');
      const token = this.get('session.token');

      const portalOpts = {
        token: token
      };

      const hostedService = this.get('hostedService');

      let folderId = Ember.$('#selFolders').val();

      if (folderId === 'root') {
        folderId = null;
      }

      const me = this;
      hostedService.create( params, userName, folderId, portalOpts)
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

          hostedService.addToDefinition( fsUrl, definition, layerId, portalOpts )
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

    var metadata = [];
		metadata.push({ name: "name", label: "Name", datatype: "string", editable: true});
		metadata.push({ name: "alias", label:"Alias", datatype: "string", editable: true});
		metadata.push({ name: "type", label: "Type", datatype: "string", editable: true,
      values: {
        esriFieldTypeString: 'String',
        esriFieldTypeInteger: 'Integer',
        esriFieldTypeDouble: 'Double'
      }
    });
    metadata.push({ name: "action", label: "Delete Field", datatype: "html", editable: false});

		var data = [];
    data.push({
      id: 1,
      values: {
        name: 'my_field',
        alias: 'My Field',
        type: 'esriFieldTypeString'
      }
    });

		const editableGrid = new EditableGrid("DemoGridJsData", { enableSort: false});
		editableGrid.load({"metadata": metadata, "data": data});

    // const me = this;
    editableGrid.setCellRenderer('action', new CellRenderer({
      render: function(cell, value) {
        var rowId = editableGrid.getRowId(cell.rowIndex);

  		  cell.innerHTML = "<a onclick=\"editableGrid.remove("+ cell.rowIndex + ");\" style=\"cursor:pointer\">" +
        "<span class='glyphicon glyphicon-trash'></span></a>";
      }
    }));

		editableGrid.renderGrid('gridHolder', 'table');

    window.editableGrid = editableGrid;
  }
});
