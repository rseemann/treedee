define([
  'Three',
  'underscore',
  'sceneSetup',
  'Stats',
  'stageStarter',
  ], function (Three, _, SceneSetup, Stats, StageStarter) {
    var clock = new Three.Clock(true);

    var Application = function ($container) {
      var sceneSetup = new SceneSetup($container);
      var scene = sceneSetup.scene;

      var stats = addStats($container);

      var stageStarter = new StageStarter(scene, sceneSetup.camera);

      var renderFunction = _.bind(sceneSetup.render, sceneSetup);
      update.call(this, _.bind(announceObjectsAndUpdate, this, renderFunction, scene, stats, stageStarter));
    };

    function update (updateFunction) {
      requestAnimationFrame(_.bind(update, this, updateFunction));
      updateFunction();
    }

    function announceObjectsAndUpdate (renderFunction, scene, stats, stageStarter) {
      var delta = clock.getDelta();

      stats.update();
      stageStarter.update(delta);
      scene.updateAll(delta);
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

