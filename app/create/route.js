import Ember from 'ember';

export default Ember.Route.extend({

  foldersService: Ember.inject.service(),
  hostedService: Ember.inject.service(),

  beforeModel() {
    const isAuth = this.get('session.isAuthenticated');
    if (!isAuth) {
      this.transitionTo('signin');
    }
  },

  afterModel() {
    const foldersService = this.get('foldersService');
    const userName = this.get('session.currentUser.username');
    const token = this.get('session.token');

    foldersService.getUserFolders(userName, {token:token})
      .then((response) => {
        Ember.$('#selFolders').append(`<option value="root">${userName} (root)</option>`);
        response.forEach( (folder) => {
          Ember.$('#selFolders').append(`<option value="${folder.id}">${folder.title}</option>`);
        });
      });
  },

  actions: {
    // nameBlur(value) {
    //   const orgId = this.get('session.portal.id');
    //
    //   const hostedService = this.get('hostedService');
    //   hostedService.serviceExists(value, orgId)
    //     .then( (response) => {
    //       if (response && response.available !== undefined) {
    //         this.controller.set('serviceNameAvailable', response.available);
    //       }
    //     }, (error) => {
    //       console.log('error checking if service name already exists', error);
    //     });
    // }
  }
});
