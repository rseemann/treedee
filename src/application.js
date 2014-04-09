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

      this.gameIsPaused = false;
      document.addEventListener('keydown', _.bind(onKeyDown, this), false);
    };

    function update (updateFunction) {
      requestAnimationFrame(_.bind(update, this, updateFunction));

      if(!this.gameIsPaused){
        updateFunction();
      }
    }

    function announceObjectsAndUpdate (renderFunction, scene, stats, stageStarter) {
      var delta = clock.getDelta();

      stats.update();
      stageStarter.update(delta);
      scene.updateAll(delta);
      renderFunction();
    }

    function onKeyDown (event) {
      if(event.keyCode == 80){
        toggleGameIsPaused.call(this);
      }
    }

    function addStats ($container) {
      var stats = new Stats();

      stats.domElement.style.position = 'absolute';
      stats.domElement.style.left = '0px';
      stats.domElement.style.bottom = '0px';

      $container.append(stats.domElement);

      return stats;
    }

    function toggleGameIsPaused () {
      var hiddenClass = 'hidden';

      if(!this.pauseNotification){
        this.pauseNotification = document.getElementById('pause-notification');
      }

      this.gameIsPaused = !this.gameIsPaused;

      this.pauseNotification.className = this.gameIsPaused ? null : hiddenClass;
    }

    return Application;
});

