define(
["lodash", 'services/Tower', 'services/Game', 'services/InputMonitor', 'services/Renderer', 'managers/SceneManager', 'managers/PlayersManager',
  'managers/LevelsManager'
],

function (_, TowerClass, GameClass, InputMonitorClass, RendererClass, SceneManagerClass, PlayersManagerClass, LevelsManagerClass) {

  var Tower, Game, InputMonitor, Renderer, Scene, PlayersManager, LevelsManager;

  var run = function () {
    Tower = new TowerClass();
    Game = new GameClass(Tower);
    Renderer = new RendererClass(Tower);
    LevelsManager = new LevelsManagerClass(Tower);
    PlayersManager = new PlayersManagerClass(Tower);
    Scene = new SceneManagerClass(Tower);
    InputMonitor = new InputMonitorClass(Tower);

  };

  run();
});
