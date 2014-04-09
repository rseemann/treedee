define([
  'Three'
  ], function (Three) {
    var radius = 2,
      height = 10,
      radiusSegments = 32,
      heightSegments = 1;

    var TrunkSegment = function (position) {
      initialize.call(this, position);

      this.top = function () {
        var top = this.position.clone();
        top.y += height/2;

        return top;
      };
    };

    TrunkSegment.prototype = new Three.Mesh();
    TrunkSegment.prototype.constructor = TrunkSegment;

    function initialize (position) {
      position = position || new Three.Vector3();

      var material = new Three.MeshPhongMaterial({
        map: Three.ImageUtils.loadTexture('assets/Bark_0007_diffuse_512.jpg'),
        normalMap: Three.ImageUtils.loadTexture('assets/Bark_0007_normal_512.jpg'),
        normalScale: new Three.Vector2(0.2, 0.2),
        shininess: 50
      });

      var geometry = new Three.CylinderGeometry(radius, radius, height, radiusSegments, heightSegments);

      Three.Mesh.call(this, geometry, material);

      position.y += height/2;
      this.position = position;

      this.geometry = geometry;
    }

    return TrunkSegment;
});
