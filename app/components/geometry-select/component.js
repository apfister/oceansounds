import Ember from 'ember';

export default Ember.Component.extend({

  didInsertElement() {
    var me = this;
    this.$('.geomType > a').click( function () {

      me.$('.geomType > a').each( function (index, item) {
        me.$(item).removeClass('active');
      });

      me.$(this).addClass('active');
    });
  }
});
