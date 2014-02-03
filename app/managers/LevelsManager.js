/**
 * User: vladgoran
 * Date: 01/02/14
 * Time: 16:41
 */
define(['services/tower/Subscriber', 'levels/1/Level1'], function (TowerSubscriberClass, Level1) {

  return TowerSubscriberClass.extend({

    _scene: null,
    _levels: [],
    _currentLevelIdx: 0,

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
        this._scene = scene;
        this._players = players;
        this._levels[0].start(players, scene);
      }, this);

      this.on('obstacles.cleared', function () {
        console.log('level cleared');
        this.dispatch('level.cleared', [this._levels[this._currentLevelIdx]]);
        this.loadLevel(this._currentLevelIdx + 1);
        this._currentLevelIdx ++;
      }, this);
    },

    loadLevel: function (idx) {
      var levels = this._levels;
      if (idx < levels.length) {
        levels[this._currentLevelIdx].start(this._players, this._scene);
      } else {
        console.log('GAME OVER!!!');
      }
    }
  });
});