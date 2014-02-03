/**
 * User: vladgoran
 * Date: 30/01/14
 * Time: 02:31
 */
define(['services/tower/Subscriber'], function (TowerSubscriberClass) {
	return TowerSubscriberClass.extend({

		init: function (t) {
			this._super(t);
			this.setupScene();
		},

		onTower: function () {
			this.on('tick', function () {
				if (this._camera) {
					this._camera.lookAt({x: 0, y: 0, z: 0});
					this.controls.update();
				}

			}, this);
		},


		setupScene: function () {
			var scene = this._scene = window._scene = this.getScene();
			var camera = this.getCamera();
			this._camera = camera;
			window.camera = camera;
			this.controls = new THREE.OrbitControls(camera);
			this.setupDecorations(scene);
			this.dispatch('scene.ready', [scene, camera]);
		},

		setupDecorations: function (scene) {
			var light = new THREE.DirectionalLight(0xe4e4e4);
			var light2 = new THREE.DirectionalLight(0xe4e4e4);
			light.position.z = 1;
			light.position.x = 1;
			light.position.y = 10;

			light2.position.z = 10;
			light2.position.x = 1;
			light.lookAt({x: -.5, y: -.5, z: -.5});
			scene.add(light);
			scene.add(light2);


			scene.add(this.getWrapper(10));
			scene.add(this.getGrids(10));
		},

		getScene: function () {
			var scene = new THREE.Scene();
			return scene;
		},

		getCamera: function () {
			var
        width = 20,
				height = 20;

			var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
			camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0.1, 1000);
			camera.position.z = 10;
			camera.position.x = 10;
			camera.position.y = 10;
			camera.lookAt({x: 0, y: 0, z: 0});

			return camera;
		},

		getWrapper: function (height) {
			var axes = new THREE.Object3D();
			var width = 3;
			var depth = 3;
			for(var i = 0; i < 2; i ++) {
        var h = i * height;
				axes.add(this.getLine(new THREE.Vector3( 0, h, 0 ), new THREE.Vector3( width, h, 0 )));
				axes.add(this.getLine(new THREE.Vector3( width, h, 0 ), new THREE.Vector3( width, h, depth )));
				axes.add(this.getLine(new THREE.Vector3( width, h, depth ), new THREE.Vector3( 0, h, depth )));
				axes.add(this.getLine(new THREE.Vector3( 0, h, depth ), new THREE.Vector3( 0, h, 0 )));
			}

			axes.add(this.getLine(new THREE.Vector3( width, 0, 0 ), new THREE.Vector3( width, height, 0 )));
			axes.add(this.getLine(new THREE.Vector3( width, 0, depth ), new THREE.Vector3( width, height, depth )));
			axes.add(this.getLine(new THREE.Vector3( 0, 0, depth ), new THREE.Vector3( 0, height, depth )));
			axes.add(this.getLine(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, height, 0 )));

			axes.position.y = - height / 2;
			axes.position.x = .5 - width / 2;
			axes.position.z = .5 - depth / 2;
			return axes;
		},

		getGrids: function (height) {
			var grids = new THREE.Object3D();
			var width = 3;
			var depth = 3;

			var
				bottomGrid = this.getGrid(width, depth),
				playerGrid = this.getGrid(width, depth),
				topGrid = this.getGrid(width, depth);

			bottomGrid.position.y = 0;
			topGrid.position.y = height;
			playerGrid.position.y = height/2;


			grids.add(bottomGrid);
			grids.add(topGrid);
			grids.add(playerGrid);

			grids.position.y = - height / 2;
			grids.position.x = .5 - width / 2;
			grids.position.z = .5 - depth / 2;
			return grids;
		},

		getGrid: function (width, depth, color) {
			var grid = new THREE.Object3D(), i;
      var color = color || 0xff0000;


			grid.add(this.getLine(new THREE.Vector3( 1, 0, 0 ), new THREE.Vector3( 1, 0, depth ), color));
			grid.add(this.getLine(new THREE.Vector3( 2, 0, 0 ), new THREE.Vector3( 2, 0, depth ), color));

			grid.add(this.getLine(new THREE.Vector3( 0, 0, 1 ), new THREE.Vector3( width, 0, 1 ), color));
			grid.add(this.getLine(new THREE.Vector3( 0, 0, 2 ), new THREE.Vector3( width, 0, 2 ), color));

			return grid;
		},

		getLine: function (src, dest, colorHex, dashed) {
			colorHex = colorHex || 0xFFFFFF;

			var geom = new THREE.Geometry(), mat;
			geom.vertices.push(src.clone());
			geom.vertices.push(dest.clone());

			if (dashed) {
				mat = new THREE.LineDashedMaterial({ linewidth: 1, color: colorHex, dashSize: 1, gapSize: 1 });
			} else {
				mat = new THREE.LineBasicMaterial({ linewidth: 1, color: colorHex });
			}

			geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines
			var axis = new THREE.Line(geom, mat, THREE.LinePieces);
			return axis;
		}
	});
});