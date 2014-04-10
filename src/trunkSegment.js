define([
  'Three'
  ], function (Three) {
    var radius = 0.1,
      height = 10,
      radiusSegments = 32,
      heightSegments = 1;

    var TrunkSegment = function (position, animatable) {
      Three.Object3D.call(this);
      initialize.call(this, position, animatable);

      this.germinationPoint = function () {
        var dist = height;
        var top = this.position.clone();
        top.y += dist;
        return top;
      };

      this.update = function (delta) {

      };
    };

    TrunkSegment.prototype = new Three.Object3D();
    TrunkSegment.prototype.constructor = TrunkSegment;

    function initialize (position, animatable) {
      position = position || new Three.Vector3();

      this.animatable = animatable;

      var material = new Three.MeshPhongMaterial({
        map: Three.ImageUtils.loadTexture('assets/Bark_0007_diffuse_512.jpg'),
        normalMap: Three.ImageUtils.loadTexture('assets/Bark_0007_normal_512.jpg'),
        normalScale: new Three.Vector2(0.2, 0.2),
        shininess: 50
      });

      var geometry = new Three.CylinderGeometry(radius, radius, height, radiusSegments, heightSegments);
      var mesh = new Three.Mesh(geometry, material);
      mesh.position.y = +height/2;
      // mesh.position = position.clone().negate();

      this.addUpdatable(mesh);

      if(animatable){
        this.rotateX(Math.PI/3);
      }

      this.position = position;
      this.mesh = mesh;
    }

    return TrunkSegment;
});
