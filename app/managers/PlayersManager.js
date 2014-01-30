/**
 * User: vladgoran
 * Date: 30/01/14
 * Time: 01:53
 */
define(['services/tower/Subscriber', './player/Player'], function (TowerSubscriberClass, PlayerClass) {
  return TowerSubscriberClass.extend({
    _player: null,
    init: function (t) {
      this._super(t);
    },

    onTower: function (t) {
      this.setupPlayers(t);
      this.on('scene.ready', this.onScene, this);
    },


    setupPlayers: function (t) {

      this._player = new PlayerClass(t);
    },

    onScene: function (scene) {
      scene.add(this._player.getSceneElement());
    }
  });
});