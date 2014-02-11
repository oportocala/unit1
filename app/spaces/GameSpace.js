/**
 * User: vladgoran
 * Date: 09/02/14
 * Time: 15:52
 */
define(['spaces/BaseSpace'], function (BaseSpaceClass) {
	return BaseSpaceClass.extend({

			onInit: function () {
				console.log('game init:', arguments);
			},

			onStart: function () {
				console.log('game start');
			}
	});
});