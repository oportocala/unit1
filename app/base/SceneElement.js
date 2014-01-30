/**
 * User: vladgoran
 * Date: 30/01/14
 * Time: 03:27
 */
define(['services/tower/Subscriber'], function (TowerSubscriberClass) {
  return TowerSubscriberClass.extend({
    _el: null,

    init: function (t) {
      this._super(t);
      this._el = this.buildElement();
    },

    /**
     * ABSTRACT
     */
    buildElement: function () {},

    onTower: function (){
      this.on('scene.ready', this.onScene, this);
    },

    onScene: function (scene) {
      scene.add(this._el);
    },

    getSceneElement: function () {
      return this._el;
    }
  });
});

