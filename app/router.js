import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('signin');
  this.route('home');
  this.route('create', {path: '/'}, function () {});
  this.route('create-feature-service');
  this.route('create-annual-report');
  this.route('add-cs-field');
});

export default Router;
