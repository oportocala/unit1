define(["lodash", 'services/Tower', 'services/Game', 'services/InputMonitor', 'services/Renderer', 'managers/SceneManager', 'managers/PlayersManager'],

function (_, TowerClass, GameClass, InputMonitorClass, RendererClass, SceneManagerClass, PlayersManagerClass) {

  var Tower, Game, InputMonitor, Renderer, Scene, PlayersManager;

  var run = function () {
    Tower = new TowerClass();
    Game = new GameClass(Tower);
    Renderer = new RendererClass(Tower);
    PlayersManager = new PlayersManagerClass(Tower);
    Scene = new SceneManagerClass(Tower);
    InputMonitor = new InputMonitorClass(Tower);

  };

  run();
});
