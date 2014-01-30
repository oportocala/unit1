/**
 * User: vladgoran
 * Date: 30/01/14
 * Time: 01:40
 */
define(function () {


  return function () {
    var subscribers = {};
    return {
      init: function () {
        if (!Array.prototype.forEach) {
          //noinspection JSHint
          console.warn('Browser does not support for each');
          // TODO: include forEach shim
        }
      },

      on: function (eventName, callback, scope) {
        if (!subscribers[eventName]) {
          subscribers[eventName] = [];
        }
        subscribers[eventName].push({callback: callback, scope: scope});
        return subscribers[eventName].length;
      },

      off: function (eventName, id) {
        subscribers[eventName][id] = null;
      },

      dispatch: function (eventName, args) {
        if (subscribers[eventName]) {
          subscribers[eventName].forEach(function (item) {
            item.callback.apply(item.scope, args || []);
          });
        }
      }
    }; // end return
  }; // end function
});