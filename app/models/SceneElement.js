/**
 * User: vladgoran
 * Date: 30/01/14
 * Time: 03:27
 */
define(['./GameObject'], function (GameObjectClass) {
  return GameObjectClass.extend({
    onTower: function (){
      this.on('scene.ready', this.onScene, this);
    },

    onScene: function (scene) {
      scene.add(this._el);
    }

  });
});

