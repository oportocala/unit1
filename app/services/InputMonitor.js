/**
 * User: vladgoran
 * Date: 30/01/14
 * Time: 01:52
 */
define(['services/tower/Subscriber'], function (TowerSubscriberClass) {
  return TowerSubscriberClass.extend({
    _keyboard: null,
    pressed: {left:0, right: 0, up: 0, down: 0},
    init: function (t) {
      this._keyboard = new THREEx.KeyboardState();
      this.pressed = {left:0, right: 0, up: 0, down: 0};
      this._super(t);

    },

    onTower: function () {

      var states = ['left', 'right', 'up', 'down'];
      this.on('tick', function () {
        var self = this;
        states.forEach(function (keyType) {
          var
            newValue = self.getKeyValue(keyType),
            oldValue = self.pressed[keyType];

          if (newValue !== oldValue) {
            self.pressed[keyType] = newValue;
            self.dispatch('key.update', [keyType, newValue]);
          }
        });
      }, this);
    },

    getKeyValue: function (id) {
      return this._keyboard.pressed(id);
    }
  });
});