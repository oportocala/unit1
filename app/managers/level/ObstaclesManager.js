/**
 * User: vladgoran
 * Date: 30/01/14
 * Time: 01:53
 */
define(['services/tower/Subscriber'], function (TowerSubscriberClass) {
	return TowerSubscriberClass.extend({

		_obstacleList: null,
    _playersPositions: null,
    _players: null,

		_obsIndex:     0,

		onTower: function () {
      this._playersPositions = [];
      this._players = [];
      var self = this;
      this.on('players.ready', function (players) {
        players.forEach(function (player) {
          self._playersPositions[player._idx] = {
            x: player.position.x,
            y: player.position.y,
            z: player.position.z
          };
          self._players[player._idx] = player;
        });
      }, this);

			this.on('player.move', function (player, position) {
				this._playersPositions[player._idx] = position;
			}, this);

      this.on('obstacle.willmove', function (obstacle, position, def) {
          this._playersPositions.forEach(function (playerPosition, idx) {

            var
              defRow = position.y * -1 + (playerPosition.y - 1) + 1,
              obstacleRow = def[defRow];

            if (obstacleRow && obstacleRow[1 + playerPosition.x][1 + playerPosition.z]) {
              var player = self._players[idx];
              self.dispatch('will.collision', [obstacle, player]);
            }
          });
       }, this);

			this.on('obstacle.move', function (obstacle, position, def) {
        this._playersPositions.forEach(function (playerPosition, idx) {

          var
            defRow = position.y * -1 + (playerPosition.y - 1),
            obstacleRow = def[defRow];

          if (obstacleRow && obstacleRow[1 + playerPosition.x][1 + playerPosition.z]) {
            var player = self._players[idx];
            self.dispatch('collision', [obstacle, player]);
          }
        });
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