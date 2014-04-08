define([
  'Three',
  'cameraController',
  'trunkMesh'
  ], function (Three, CameraController, TrunkMesh) {
    var planeSize = Three.Vector2(100, 100);

    var StageStarter = function (scene, camera) {
      var cameraController = new CameraController(camera);

      addGround(scene);
      addTrunks(scene);

      this.update = function (delta) {
        cameraController.update(delta);
      };
    };

    function addGround (scene) {
      var texture = Three.ImageUtils.loadTexture('assets/grass_difuse.jpg');
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(10,10);

      var material = new Three.MeshPhongMaterial({
        map:texture,
        normalMap: Three.ImageUtils.loadTexture('assets/grass_normal.jpg'),
        side: THREE.DoubleSide
      });

      var geometry = new Three.PlaneGeometry(1000, 1000);

      var mesh = new Three.Mesh(geometry, material);
      mesh.rotation.x = Math.PI/2;

      scene.add(mesh);
    }

    function addTrunks (scene) {
      scene.addUpdatable(new TrunkMesh());
      scene.addUpdatable(new TrunkMesh(0, 0, -20));
      scene.addUpdatable(new TrunkMesh(-20, 5, 0));
      scene.addUpdatable(new TrunkMesh(0, 10, 20));
      scene.addUpdatable(new TrunkMesh(20, 15, 0));
    }

    return StageStarter;
  });