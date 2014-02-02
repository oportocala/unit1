/**
 * User: vladgoran
 * Date: 30/01/14
 * Time: 01:53
 */
define(['services/tower/Subscriber', 'models/Player'], function (TowerSubscriberClass, PlayerClass) {
	return TowerSubscriberClass.extend({
		_players: [],

		init: function (t) {
			this._super(t);
		},

		onTower: function (t) {
			this.setupPlayers(t);
			this.on('scene.ready', this.onScene, this);
		},


		setupPlayers: function (t) {
			this._players.push(new PlayerClass(t, this._players.length));
		},

		onScene: function (scene) {
			scene.add(this._players[0].getElement());
			this.dispatch('players.ready', [this._players, scene]);
		}
	});
});