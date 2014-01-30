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
        //this.camera.lookAt({x:0, y:0, z:0});


        this.on('tick', function () {
           if (this._camera) {
             this._camera.lookAt({x:0, y:0, z:0});
             this.controls.update();
           }

        }, this);
      },


      setupScene: function () {
        var scene = this._scene = window._scene = this.getScene();
        var camera = this.getCamera();
        this._camera = camera;
        window.camera = camera;
        this.controls = new THREE.OrbitControls( camera );
        this.setupDecorations(scene);
        this.dispatch('scene.ready', [scene, camera]);
      },

      setupDecorations: function (scene) {
       /* var light = new THREE.DirectionalLight(0xe4e4e4);
        var light2 = new THREE.DirectionalLight(0xe4e4e4);
        light.position.z = 10;
        light2.position.z = 20;
        light2.position.x = 10;
//scene.add(light);
        scene.add(light2);*/

        var wrapper = new THREE.Mesh( new THREE.CubeGeometry(3,10,3), new THREE.MeshBasicMaterial( {wireframe: true, transparent: true} ) );
        wrapper.position.x = .5;
        wrapper.position.z = .5;
        scene.add(wrapper);

        var plane = new THREE.Mesh( new THREE.PlaneGeometry( 3, 3, 3, 3), new   THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } ) );
        plane.rotation.x = Math.PI/2;
        plane.position.x = .5;
        plane.position.z = .5;
        scene.add( plane );

      },

      getScene: function () {
        var scene = new THREE.Scene();
        return scene;
      },

      getCamera: function () {
        var width = 20,
            height= 20;

        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        //camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 0.1, 1000 );
        camera.position.z = 10;
        camera.position.x = 10;
        camera.position.y = 10;
        camera.lookAt({x:0, y:0, z:0});

        return camera;
      }
  });
});