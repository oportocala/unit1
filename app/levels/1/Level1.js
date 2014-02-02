/**
 * User: vladgoran
 * Date: 01/02/14
 * Time: 16:27
 */
define(['models/Level', 'models/Obstacle', 'levels/1/obstacles/1', 'levels/1/obstacles/2'],
function (LevelClass, ObstacleClass, Obstacle1Def, Obstacle2Def) {
  return LevelClass.extend({


    getObstacleList: function () {
      return [
        new ObstacleClass(this._tower, Obstacle1Def, this),
        new ObstacleClass(this._tower, Obstacle2Def, this)
      ];
    },

    getSpeed: function () {
      return 500;
    }

  });
});