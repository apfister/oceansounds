import Ember from 'ember';

export default Ember.Route.extend({

  createNew: false,

  itemsService: Ember.inject.service(),

  beforeModel() {
    const isAuth = this.get('session.isAuthenticated');
    if (!isAuth) {
      this.transitionTo('signin');
    }
  },

  afterModel() {
    const username = this.get('session.currentUser.username');
    const orgId = this.get('session.currentUser.orgId');

    const q = `type: \"Web Mapping Application\" AND accountid:${orgId} AND owner:${username} AND tags:Crowdsource`;

    const form = {
      q: q,
      f: 'json',
      num: 10000
    };

    const itemsService = this.get('itemsService');

    itemsService.search(form)
      .then( (response) => {
        console.log(response);

        let apps = [];
        response.results.forEach( (item) => {
          apps.push({ id: item.id, title: item.title, dataUrl: item.url });
        });

        this.controller.set('selectedItems', apps);

      }, (error) => {
        console.log(error);
      });
  }

});
