/**
 * User: vladgoran
 * Date: 09/02/14
 * Time: 15:52
 */
define(['spaces/BaseSpace', 'spaces/GameSpace', 'spaces/MenuSpace'], function (BaseSpaceClass, GameSpaceClass, MenuSpaceClass) {
	return BaseSpaceClass.extend({

		onInit: function () {
			debugger;
			console.log('on init: main' );
			this.addSpace('menu', MenuSpaceClass);
			//this.addSpace('game', GameSpaceClass);
			console.log(this._spaces);

			//this.getSpace('game').start();
		}


	});
});