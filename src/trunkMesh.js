define([
  'Three'
  ], function (Three) {
    var radius = 2,
      height = 10,
      radiusSegments = 32,
      heightSegments = 1;

    var velocity = 2*Math.PI/(24);

    var TrunkMesh = function (x, y, z) {
      x = x || 0;
      y = y || 0;
      z = z || 0;

      var material = new Three.MeshPhongMaterial({
        map: Three.ImageUtils.loadTexture('assets/Bark_0007_diffuse.jpg'),
        normalMap: Three.ImageUtils.loadTexture('assets/Bark_0007_normal.jpg'),
        normalScale: new Three.Vector2(0.2, 0.2),
        shininess: 50
      });

      var geometry = new Three.CylinderGeometry(radius, radius, height, radiusSegments, heightSegments);

      var mesh = new Three.Mesh(geometry, material);
      mesh.position.x = x;
      mesh.position.y = y;
      mesh.position.z = z;

      mesh.update = function (delta) {
        //this.rotation.y += velocity * delta;
      };



      return mesh;
    };

    return TrunkMesh;
});
