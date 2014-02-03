/**
 * User: vladgoran
 * Date: 30/01/14
 * Time: 01:58
 */
define(['services/tower/Subscriber'], function (TowerSubscriberClass) {
  return TowerSubscriberClass.extend({

    _renderer: null,
    _scene: null,
    _camera: null,

    init: function (t) {
      this._super(t);
      this.setupCanvas();
    },

    setupCanvas: function() {
      var renderer = new THREE.WebGLRenderer( { antialias: true, precision: 'highp' } );
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild( renderer.domElement );
      this._renderer = renderer;
      this.dispatch('canvas.ready', [this]);
    },

    onTower: function (Tower) {
      this.on('tick', function () {
        if (this.isReady()) {
          this._renderer.render(this._scene, this._camera);
        }
      }, this);

      this.on('scene.ready', function (_s, _c) {
        this.setScene(_s);
        this.setCamera(_c);
      }, this);
    },

    isReady: function () {
      return this._renderer && this._scene && this._camera;
    },

    setScene: function (_s) {
      this._scene = _s;
    },

    setCamera: function (_c) {
      this._camera = _c;
    }
  });
});