import Ember from 'ember';

export default Ember.Component.extend({

  didInsertElement() {
    var me = this;
    this.$('.firstOption > a').click( function () {

      me.$('.firstOption > a').each( function (index, item) {
        me.$(item).removeClass('active');
      });

      me.$(this).addClass('active');
    });
  }
});
