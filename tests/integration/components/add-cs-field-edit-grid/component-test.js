import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('add-cs-field-edit-grid', 'Integration | Component | add cs field edit grid', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{add-cs-field-edit-grid}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#add-cs-field-edit-grid}}
      template block text
    {{/add-cs-field-edit-grid}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
