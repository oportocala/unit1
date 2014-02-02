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

    getElement: function () {
      return this._el;
    }
  });
});
