/**
 * User: vladgoran
 * Date: 01/02/14
 * Time: 16:41
 */
define(['services/tower/Subscriber', 'levels/1/Level1'], function (TowerSubscriberClass, Level1) {

  return TowerSubscriberClass.extend({

    _scene: null,
    _levels: [],

    init: function (t) {

      this.initLevels(t);
      this._super(t);
    },

    initLevels: function (t) {
      this._levels = [
        new Level1(t)
      ];
    },

    onTower: function () {
      this.on('players.ready', function (players, scene) {
        this._levels[0].start(players, scene);
      }, this);
    }
  });
});