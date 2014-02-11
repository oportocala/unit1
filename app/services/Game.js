/**
 * User: vladgoran
 * Date: 30/01/14
 * Time: 01:43
 */
define(['services/tower/Subscriber'], function (TowerSubscriberClass) {
  return TowerSubscriberClass.extend({
    init: function (_tower) {
      this._super(_tower);
    },

    onTower: function () {
      this.on('tick', this.onTick, this);
      this.on('scene.ready', this.onScene, this);
    },

    tick: 0,
    onTick: function () {
      //console.log('game tick:' + this.tick++);
      //this.dispatch('');

    },

    onScene: function () {
      this.setupRenderLoop();
    },

    setupRenderLoop: function () {
      var self = this;
      //var world = new
	    var world   = new OIMO.World();
      var renderLoop = function () {
	      world.step();
	      //TWEEN.update();
        self.dispatch('tick');
        requestAnimationFrame(renderLoop);
      };
      renderLoop();
    }
  });
});