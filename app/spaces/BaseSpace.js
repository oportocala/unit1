/**
 * User: vladgoran
 * Date: 09/02/14
 * Time: 15:52
 */
define(['services/tower/Subscriber', 'services/Tower'], function (Subscriber, TowerClass) {
	return Subscriber.extend({

		isPaused: true,
		isEnabled: true,

		_spaces: null,

		init: function (name, parent) {
			this._spaces = {};
			this._name = name;
			if (parent) {
				this.setParent(parent);
				var tower = parent.getTower();
			}

			if (!tower) {
				tower = new TowerClass();
			}

			console.log('init:', this._name);
			this.setTower(tower);
			//this._super(tower);
			//this.onInit(parent, tower);
		},

		onInit: function (parent, tower) {

		},

		start: function () {
			this.isPaused = false;
			this.onStart();
		},

		onTower: function ()  {
			console.log('tower init', this._name);
		},

		onStart: function () { console.log(this._name); },

		pause: function () {
			this.isPaused = true;
		},

		enable: function () {
			this.isEnabled = true;
		},

		disable: function () {
			this.isEnabled = false;
		},

		getTower: function () {
			return this._tower;
		},

		getParent: function () {
			return this._parent;
		},

		setParent: function (parent) {
			this._parent = parent;
		},

		addSpace: function (name, Class) {
			var instance = new Class(name, this);
			this._spaces[name] = instance;
			instance.onInit.apply(instance, [this, this.getTower()]);
		},

		getSpace: function (name) {
			if (this._spaces[name]) {
				return this._spaces[name];
			}
			return null;
		}
	});
});