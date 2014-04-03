define([
  'Three',
  'underscore',
  'sceneSetup',
  'Stats',
  'trunkMesh'
  ], function (Three, _, SceneSetup, Stats, TrunkMesh) {
    var clock = new Three.Clock(true);

    var Application = function ($container) {
      this.onMouseMove = _.bind(onMouseMove, this);

      var sceneSetup = new SceneSetup($container);
      var scene = sceneSetup.scene;

      var stats = addStats($container);

      var renderFunction = _.bind(sceneSetup.render, sceneSetup);
      update.call(this, _.bind(announceObjectsAndUpdate, this, renderFunction, scene, stats));
    };

    function onMouseMove (event) {
      var x = event.clientX / window.innerWidth;
      var y = event.clientY / window.innerHeight;
      console.log(x, y);
    }

    function addTrunks (scene) {
      scene.addUpdatable(new TrunkMesh());
      scene.addUpdatable(new TrunkMesh(50, 50, -100));
      scene.addUpdatable(new TrunkMesh(-100, 50, 100));
    }

    function update (updateFunction) {
      requestAnimationFrame(_.bind(update, this, updateFunction));
      updateFunction();
    }

    function announceObjectsAndUpdate (renderFunction, scene, stats) {
      stats.update();
      scene.updateAll(clock.getDelta());
      renderFunction();
    }

    function addStats ($container) {
      var stats = new Stats();

      stats.domElement.style.position = 'absolute';
      stats.domElement.style.left = '0px';
      stats.domElement.style.bottom = '0px';

      $container.append(stats.domElement);

      return stats;
    }

    return Application;
});

