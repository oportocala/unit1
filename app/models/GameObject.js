define(['services/tower/Subscriber'], function (TowerSubscriberClass) {
  return TowerSubscriberClass.extend({
    _el: null,

    init: function (t) {
      this._super(t);
      this._el = this.buildElement();
    },
    onTower: function () {

      this.on('obstacles.cleared', function () {
        console.log('level cleared');

      }, this);
    },
    /**
     * ABSTRACT
     */
    buildElement: function () {},

    getElement: function () {
      return this._el;
    }
  });
});
