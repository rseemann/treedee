define([
  'Three'
  ], function (Three) {
    var color = 0xCC0000,
      radius = 50,
      segments = 16,
      rings = 16;

    var TrunkMesh = function (x, y, z) {
      x = x || 0;
      y = y || 0;
      z = z || 0;

      var material = new Three.MeshLambertMaterial({
        color: color
      });

      var geometry = new Three.SphereGeometry(radius, segments, rings);

      var mesh = new Three.Mesh(geometry, material);
      mesh.position.x = x;
      mesh.position.y = y;
      mesh.position.z = z;
      return mesh;
    };

    return TrunkMesh;
});



    // var sphereMaterial = new THREE.MeshLambertMaterial({
      
    // });

    // var sphere = new THREE.Mesh(
    //   new THREE.SphereGeometry(radius, segments, rings),
    //   sphereMaterial
    // );

    // sceneSetup.scene.add(sphere);