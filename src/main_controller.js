define([
  'three',
  'camera_controller',
  'earth'
], function (Three, CameraController, Earth) {
  var MainController = function (app) {
    this.app = app;
    this.init();
  }

  MainController.prototype = {
    init: function () {
      var earth = new Earth();
      earth.init();
      this.app.addObject(earth);

      addGround.call(this);
      setupCamera.call(this);
    }
  }

  function addGround () {
    var ground = new Sim.Object();

    var geo = new Three.PlaneGeometry(100, 100, 100, 100);
    var mat = new Three.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true
    });

    var mesh = new Three.Mesh(geo, mat);
    ground.setObject3D(mesh);
    ground.object3D.rotation.x = Math.PI/2;

    this.app.addObject(ground);
  }

  function setupCamera () {
    this.app.camera.position.y = 1;
    this.cameraController = new CameraController({
      camera: this.app.camera,
      minHeight: 1
    });

  }

  return MainController;
})