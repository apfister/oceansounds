import Ember from 'ember';
import ENV from 'oceansounds/config/environment';

export default Ember.Route.extend({

  itemsService: Ember.inject.service(),

  mapJournalTemplate: Ember.inject.service(),

  actions: {
    createStoryMap: function () {
      this.controller.set('loading', true);
      this.controller.set('showMessage', false);

      const itemsService = this.get('itemsService');

      const mapJournalTemplate = this.get('mapJournalTemplate');

      let data = mapJournalTemplate.get('template');

      const username = this.get('session.currentUser.username');

      let item = {};
      item.owner = username;
      item.type = 'Web Mapping Application';
      item.typeKeywords = ['JavaScript,Map,Mapping Site,Online Map,Ready To Use,selfConfigured,Web Map,Story Map,Story Maps,MapJournal,layout-side'];
      item.tags = ['Story Map,Map Journal'];
      item.overwrite = true;
      item.commentsEnabled = true;
      item.title = 'Annual Report';
      item.text = JSON.stringify(data);

      itemsService.create(item)
        .then( (response) => {
          console.log('success', response);

          if (response.success) {
            const itemId = response.id;

            const portalKey = this.get('session.portal.urlKey');

            const itemUrl = `http://${portalKey}.maps.arcgis.com/apps/MapJournal/index.html?appid=${itemId}`;

            item.url = itemUrl;
            item.id = itemId;

            // update call
            itemsService.update(item)
              .then( (response) => {
                this.controller.set('loading', false);
                this.controller.set('itemUrl', itemUrl);
                this.controller.set('showMessage', true);
              }, (error) => {
                this.controller.set('loading', false);
                console.log('error updating', error);
              });
          }

        }, (error) => {
          console.log('error');
          this.controller.set('loading', false);
        });
    }
  },

  beforeModel() {
    const session = this.get('session');
    if (!session.get('isAuthenticated')){
      this.transitionTo('signin');
    }
  }
});
