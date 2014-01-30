define(['Class'], function (C) {
  return Class.extend({
    init: function (_tower) {
      this.setTower(_tower);
    },

    setTower: function (_tower) {
      this._tower = _tower;
      this.onTower(_tower);
    },

    /**
     * ABSTRACT
     */
    onTower: function (t) {},

    on: function (event, callback, scope) {
      if (this._tower) {
        return this._tower.on(event, callback, scope);
      }
      return null;
    },

    dispatch: function (event, arguments) {
      if (this._tower) {
        return this._tower.dispatch(event, arguments);
      }
      return null;
    }
  });
});