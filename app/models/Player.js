/**
 * User: vladgoran
 * Date: 30/01/14
 * Time: 03:18
 */
define(['./SceneElement'], function (SceneElement) {
	return SceneElement.extend({
		_idx:    null,


		_colors: [0x0ff1c4, 0x00ff00, 0x0000ff],
		_color:  null,

		_spawnAnimationTween: null,
		_hTween:  null,
		_vTween: null,

		_currentObstacle: null,

		position: {},

		init: function (t, idx) {
			this._idx = idx;
			this._color = this._colors[idx];

			this.position = {
				x: 0,
				y: 0,
				z: 0
			};

			this._super(t);
		},

		buildElement: function () {
			var
				mat = new THREE.MeshPhongMaterial({ color: this._color }),
				el = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), mat);

			this.initTweens(el);
			this.setPosition(this.position, false);
			return el;
		},

		initTweens: function (el) {
			el.scale.set(0.001, 0.001, 0.001);
			this._spawnAnimationTween = new TWEEN.Tween({s: 0.001})
				.easing(TWEEN.Easing.Elastic.InOut)
				.onUpdate(function () {
					el.scale.set(this.s, this.s, this.s);
				})
				.delay(100)
				.to({s: 1}, 900);

			this._hTween = new TWEEN.Tween({x: 0, y: 0, z: 0})
				.easing(TWEEN.Easing.Quartic.InOut)
				.onUpdate(function () {
					el.position.x = this.x + .5;
					el.position.z = this.z + .5;
				});

			this._vTween = new TWEEN.Tween({x: 0, y: 0, z: 0})
				.easing(TWEEN.Easing.Cubic.InOut)
				.onUpdate(function () {
					el.position.y = this.y + .5;
				});
		},

		onAdded: function () {
			this._spawnAnimationTween.start();
			window.PLAYER = this;
		},

		onTower: function () {


			this.on('obstacle.removed', function (obstacle) {
				if (this._currentObstacle === obstacle) {
					this._currentObstacle = null;
				}
			});

			this.on('key.update', function (keySymbol, state) {
				if (state) {
					var targetPosition = this.getPosition();
					switch (keySymbol) {
						case 'left':
							targetPosition.x -= 1;
							break;

						case 'right':
							targetPosition.x += 1;
							break;

						case 'up':
							targetPosition.z -= 1;
							break;

						case 'down':
							targetPosition.z += 1;
							break;
					}

					this.doMove(targetPosition);
				}
			}, this);

			this.on('will.collision', function (obstacle, player) {
				if (player._idx === this._idx) {
					var pos = this.getPosition();
					pos.y++;
					this._currentObstacle = obstacle;
					this.setPosition(pos, false, 300, 0);
				}
			}, this);
		},

		dispatchPositionChange: function () {
			this.dispatch('player.move', [this, this.getPosition()]);
		},

		doMove: function (position) {
			if (this.canMoveTo(position)) {
				this.setPosition(position);
				this.calcPhysics(position);
			}
		},

		calcPhysics: function (position) {
			if (position.y !== 0) {
				console.log('CALCULATING DROP');

				var
					currentY = position.y,
					targetY = 0;

				if (this._currentObstacle) {
					console.log('currentY:', currentY);
					targetY = position.y;

					do {

						var isFreeUnderneath = this._currentObstacle.isNormalizedFree(position.x, targetY - 1, position.z);
						console.log(position.x, targetY+1, position.z, 'isFree:', isFreeUnderneath, 'targetY:', targetY);

						targetY--;
						//debugger;
					} while (targetY != -1 && isFreeUnderneath);
					targetY+=1;
					console.log('foundTargetY:', targetY);

				}

				var distance = currentY - targetY;

				this.position.y = targetY;
				this._vTween.delay(100).to({ y: targetY }, distance * 50).start();

			}
		},

		canMoveTo: function (position) {
			var between = function (v, min, max) {
				return v >= min && v <= max;
			};
			var isFreeSpot = true;
			if (this._currentObstacle) {
				isFreeSpot = this._currentObstacle.isNormalizedFree(position.x, position.y-1, position.z);
			}

			return isFreeSpot && between(position.x, -1, 1) && between(position.z, -1, 1);
		},

		setPosition: function (position, withoutTween, speed, delay) {
			var speed = speed || 100, delay = delay || 0;

			if (withoutTween) {
				this._hTween.to(position, 0).start();
				this._vTween.to(position, 0).start();
			} else {
				this._hTween.delay(delay).to(position, speed).start();
				this._vTween.delay(delay).to(position, speed).start();
				this.position = position;
			}

			this.dispatchPositionChange();
		},

		getPosition: function () {
			return {
				x: this.position.x,
				y: this.position.y,
				z: this.position.z
			};
		}
	});

});