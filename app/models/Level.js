/**
 * User: vladgoran
 * Date: 01/02/14
 * Time: 16:32
 */
define(['services/tower/Subscriber', 'managers/level/ObstaclesManager'],function (SubscriberClass, ObstaclesManagerClass) {
  return SubscriberClass.extend ({

    _obstacleManager: null,
    _scene: null,

    init: function (t) {
      this._super(t);
      this._obstacleManager = new ObstaclesManagerClass(t);
      this._obstacleManager.load(this.getObstacleList());
    },

    onTower: function () {
      this.on('scene.ready', function (scene) {
        this._scene = scene;
      }, this);
    },

    start: function (players, scene) {
      this._obstacleManager.start(scene);
    },

    /**
     * Abstract
     */
    getObstacleList: function () {
      return [];
    }

  });
});