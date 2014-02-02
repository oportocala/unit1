/**
 * User: vladgoran
 * Date: 01/02/14
 * Time: 16:32
 */
define(['./GameObject'], function (GameObjectClass) {
	return GameObjectClass.extend({

		_startHeightLevel: -8,
		_currentHeight:    null,
		_added:            false,
		_rows:             [],
		_def:              false,
		_tween:            false,
		_level:            false,
		_tower:            false,
		_idx:              false,
    _isCollapsing:     false,

		init: function (t, def, level) {
			this._tower = t;
			this._currentHeight = this._startHeightLevel;
			this._def = def;
			this._level = level;
			this._rows = [];

			this._el = this.buildElement(def);
      t.on('collision', function (object, player) {
        this._tween.stop();
        console.log(this._added);
        if (this._added && !this._isCollapsing) {
          this._isCollapsing = true;
          console.log(this._rows);
          this._rows.forEach(function (items, idx) {
            if (idx === 0) {
              THEONE = items[0];
            }
            items.forEach(function (el) {
              if (idx === 0) {
                //debugger;
              }
              el.tween.stop().to({s: 0.01}, 200).delay(0).start();
            });
          });
        }
      }, this);
		},


		buildElement: function (def) {
			var root = new THREE.Object3D();
			def = def.reverse();
			for (var y = 0; y < def.length; y++) {
				var xz = def[y];
				for (var x = 0; x < xz.length; x++) {
					var zM = xz[x];
					for (var z = 0; z < zM.length; z++) {
						if (zM[z]) {
							this.addCube(root, x, y, z);
						}
					}
				}
			}

			this.positionElement(root);
			this.bindAnimation(root);
			return root;
		},

		positionElement: function (el) {
			var y = this._startHeightLevel - .5;
			el.position.x = -.5;
			el.position.z = -.5;
			el.position.y = y;
		},

		bindAnimation: function (el) {
			var
				self = this,
				y = this._startHeightLevel - .5,
				speed = this._level.getSpeed();

			this._tween = new TWEEN.Tween({y: y})
				.easing(TWEEN.Easing.Linear.None)
				.to({y: '+1'}, speed)
				.onUpdate(function () {
					el.position.y = this.y;
				})
				.onComplete(function () {
					self.onMoveComplete();
				});
		},

		onMoveComplete: function () {
			var speed = this._level.getSpeed();
			this.dispatch('obstacle.move', [this, {y: this._currentHeight}, this._def]);
			if (this._added && !this._isCollapsing) {
				this._currentHeight++;
				if (this._currentHeight === this._def.length - 2) {
					this.doRemove();
				}
				this._tween.delay(speed).start();

			}
		},

		onAdded: function (idx) {
			this._added = true;
			this._idx = idx;
			this._el.idx = idx;

			var rows = this._rows;

			rows.reverse().forEach(function (items, idx) {
				items.forEach(function (el) {
					el.tween.to({s: 1, y: el.fixedY}, 200).delay(idx * 900).start();
				})
			});

			this._tween.start();
		},

		doRemove: function () {
			this._rows.forEach(function (items, idx) {
				items.forEach(function (el) {
					el.tween.to({s: 0.01, y: el.position.y + 10}, 200).delay(idx * 1000).start();
				})
			});

			setTimeout(function (self) {
				self._tween.stop();
				self._added = false;
				self.dispatch('obstacle.removed', [self, self._idx]);
			}, 6000, this);
		},

		addCube: function (target, x, y, z) {
			var geom = new THREE.CubeGeometry(1, 1, 1);
			var mat = new THREE.MeshPhongMaterial({ color: 0xffffff });
			var el = new THREE.Mesh(geom, mat);

			el.position.x = x;
			el.position.y = y - 10;
			el.position.z = z;
			el.scale.set(0.1, 0.1, 0.1);
			el.fixedY = y;

			el.tween = new TWEEN.Tween({s: 0.01, y: y - 10})
				.easing(TWEEN.Easing.Quadratic.In)
				.onUpdate(function () {

					el.scale.set(this.s, this.s, this.s);
					el.position.y = this.y;
					//console.log(target.idx);
				});


			if (!this._rows[y]) {
				this._rows[y] = [];
			}

			this._rows[y].push(el);
			target.add(el);
		}

	});
});