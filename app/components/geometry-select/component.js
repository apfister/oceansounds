import Ember from 'ember';

export default Ember.Component.extend({

  didInsertElement() {
    var me = this;
    this.$('.geomType > a').click( function (evt) {

      me.$('.geomType > a').each( function (index, item) {
        me.$(item).removeClass('active');
      });

      me.$(this).addClass('active');
    });
  }
});
