define([
  'cameraController',
  'trunkMesh'
  ], function (CameraController, TrunkMesh) {
    var StageStarter = function (scene, camera) {
      var cameraController = new CameraController(camera);

      addTrunks(scene);
      //addGround(scene);

      this.update = function (delta) {
        cameraController.update(delta);
      };
    };

    function addTrunks (scene) {
      scene.addUpdatable(new TrunkMesh());
      scene.addUpdatable(new TrunkMesh(50, 50, -100));
      scene.addUpdatable(new TrunkMesh(-100, 50, 100));
    }

    return StageStarter;
  });