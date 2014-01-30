/**
 * User: vladgoran
 * Date: 30/01/14
 * Time: 03:18
 */
define(['base/SceneElement'], function (SceneElement) {
  return SceneElement.extend({

   buildElement: function () {
    var el  = new THREE.Mesh( new THREE.CubeGeometry(1,1,1), new THREE.MeshNormalMaterial( { shading: THREE.SmoothShading } ) );
     el.position.x = .5;
     el.position.z = .5;
     el.position.y = .5;
    return el;
   },

   onTower: function () {

    this.on('key.update.left', function (state) {
      if (state) {
        if (this._el.position.x > 0) {
          this._el.position.x -= 1;
        }
      }
    }, this);

     this.on('key.update.right', function (state) {
        if(state) {
          if (this._el.position.x < 1) {
            this._el.position.x += 1;
          }
        }
     }, this);


     this.on('key.update.down', function (state) {
       if (state) {
         if (this._el.position.z < 1) {
          this._el.position.z += 1;
         }
       }
     }, this);

     this.on('key.update.up', function (state) {
        if(state) {
          if (this._el.position.z > 0) {
            this._el.position.z -= 1;
          }
        }
     }, this)
   },

   onKeyOn: function (left, right, up, down) {
    if (left) {
      this._el.position.x += 10;
    }
   }

  });

});