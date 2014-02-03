/**
 * User: vladgoran
 * Date: 30/01/14
 * Time: 03:18
 */
define(['./SceneElement'], function (SceneElement) {
	return SceneElement.extend({

		_colors: [0x0ff1c4, 0x00ff00, 0x0000ff],
		_color:  null,
    _idx: null,

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
			var mat = new THREE.MeshPhongMaterial({ color: this._color });
			var el = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), mat);
			this._tween = new TWEEN.Tween({x:0, y:0, z:0})
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function () {
          el.position.x = this.x + .5;
          el.position.y = this.y + .5;
          el.position.z = this.z + .5;
        });


      this._spawnAnimationTween = new TWEEN.Tween({s: 0.001})
        .onUpdate(function () {
          el.scale.set(this.s, this.s, this.s);
        })
        .to({s:1}, 100);

			this.setPosition(this.position, false);
			return el;
		},

    onAdded: function () {
      this._spawnAnimationTween.start();
      window.PLAYER = this;
    },

		onTower: function () {
      this.on('will.collision', function (obstacle, player) {
          if (player._idx === this._idx) {
            //this._spawnAnimationTween.to({s:0.0001}, 100).start();
            console.log('player animation');
            var pos = this.getPosition();
            pos.y ++;
            this.setPosition(pos);
          }
      }, this);

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
		},

		dispatchPositionChange: function () {
			this.dispatch('player.move', [this, this.getPosition()]);
		},

		doMove: function (position) {
			if (this.canMoveTo(position)) {
				this.setPosition(position);
			}
		},

		canMoveTo: function (position) {
			var between = function (v, min, max) {
				return v >= min && v <= max;
			};

			return between(position.x, -1, 1)  && between(position.z, -1, 1);
		},

		setPosition: function (position, withoutTween) {
			if (withoutTween) {
				this._tween.to(position, 0).start();
			} else {
        console.log('tween to:', position);
				this._tween.to(position, 100).start();
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