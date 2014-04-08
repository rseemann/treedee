define([
  'Three',
  'cameraController',
  'treeGenerator'
  ], function (Three, CameraController, TreeGenerator) {
    var planeSize = Three.Vector2(100, 100);

    var StageStarter = function (scene, camera) {
      var cameraController = new CameraController(camera);

      addGround(scene);
      addTree(scene, Three.Vector3());

      this.update = function (delta) {
        cameraController.update(delta);
      };
    };

    function addGround (scene) {
      var texture = Three.ImageUtils.loadTexture('assets/grass_difuse_512.jpg');
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(100,100);

      var normalTexture = Three.ImageUtils.loadTexture('assets/grass_normal_512.jpg');
      normalTexture.wrapS = normalTexture.wrapT = THREE.RepeatWrapping;
      normalTexture.repeat.set(100,100);

      var material = new Three.MeshPhongMaterial({
        map:texture,
        normalMap: normalTexture,
        side: THREE.DoubleSide
      });

      var geometry = new Three.PlaneGeometry(500, 500);

      var mesh = new Three.Mesh(geometry, material);
      mesh.rotation.x = Math.PI/2;

      scene.add(mesh);
    }

    function addTree (scene, position) {
      var tree = new TreeGenerator();
      scene.addUpdatable(tree.tree);
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