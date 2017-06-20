import Ember from 'ember';
// import layout from './template';

/**
 * loading-indicator component
 *
 * Default Usage
 * {{loading-indicator}} - will pull in a default translated message
 *
 * Passing a custom message
 * {{loading-indicator message=(t 'some.translation.key')}}
 *
 * No Message - no message is shown
 * {{loading-indicator noMessage=true}}
 */
export default Ember.Component.extend({
  tagName: 'div',

  classNames: [ 'loader' ],

  isActive: true,

  classNameBindings: [ 'isActive' ],

  // default message
  message: '',

  msg: Ember.computed('message', function () {
    let message = this.get('message') || '';
    if (!message && !this.get('noMessage')) {
      // message = this.get('intl').findTranslationByKey('items.components.loadingIndicator.defaultMessage');
      message = 'Loading ...';
    }
    return message;
  })
});
