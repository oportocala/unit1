/**
 * User: vladgoran
 * Date: 30/01/14
 * Time: 01:53
 */
define(['services/tower/Subscriber'], function (TowerSubscriberClass) {
	return TowerSubscriberClass.extend({

		_obstacleList: null,
		playerPos:     null,
		_obsIndex:     0,

		onTower: function () {
			this.on('player.move', function (player, position) {
				this.playerPos = position;
			}, this);

			this.on('obstacle.move', function (obstacle, position) {

			}, this);

			this.on('obstacle.removed', function (obstacle) {
				this.removeObstacle(obstacle);
				this._obsIndex++;
				if (this._obsIndex < this._obstacleList.length) {
					this.addObstacle(this._obsIndex);
				} else {
					this.dispatch('obstacles.cleared');
				}
			}, this);
		},

		load: function (obstacleList) {
			this._obstacleList = obstacleList;
		},

		start: function (scene) {
			this._scene = scene;
			this.addObstacle(0);
		},

		addObstacle: function (idx) {
			var obstacle = this._obstacleList[idx];
			this._scene.add(obstacle.getElement());
			obstacle.onAdded(idx);
			return obstacle;
		},

		removeObstacle: function (obstacle) {
			this._scene.remove(obstacle.getElement());
		}
	});
});