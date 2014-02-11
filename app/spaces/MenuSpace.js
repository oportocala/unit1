/**
 * User: vladgoran
 * Date: 09/02/14
 * Time: 15:52
 */
define(['spaces/BaseSpace'], function (BaseSpaceClass) {
	return BaseSpaceClass.extend({

			onInit: function () {
				console.log('menu init');
			},

			onStart: function () {
				console.log('menu start');
			}
	});
});