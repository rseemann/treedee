define([
  'Three'
  ], function (Three) {
    var radius = 2,
      initialHeight = 2,
      radiusSegments = 32,
      heightSegments = 1;

    var TrunkSegment = function (parent, animatable) {
      Three.Object3D.call(this);

      this.position = parent ? parent.germinationPoint() : new Three.Vector3();
      this.trunkParent = parent;
      setHeight.call(this, initialHeight);
      initialize.call(this, parent, animatable);

      this.germinationPoint = function () {
        var up = this.localToWorld(this.up.clone().setLength(getHeight.call(this)));
        var top = this.position.clone();
        top.add(up);

        return up;
      };

      this.update = function (delta) {
        if(!animatable){
          return;
        }

        this.applyMatrix(new Three.Matrix4().makeRotationFromEuler(new Three.Euler(randomAngle(), randomAngle(), randomAngle())));

        if(this.trunkParent){
          this.position = this.trunkParent.germinationPoint();
        }
      };
    };

    TrunkSegment.prototype = new Three.Object3D();
    TrunkSegment.prototype.constructor = TrunkSegment;

    function initialize (animatable) {
      this.animatable = animatable;

      var material = new Three.MeshPhongMaterial({
        map: Three.ImageUtils.loadTexture('assets/Bark_0007_diffuse_512.jpg'),
        normalMap: Three.ImageUtils.loadTexture('assets/Bark_0007_normal_512.jpg'),
        normalScale: new Three.Vector2(0.2, 0.2),
        shininess: 50
      });

      var geometry = new Three.CylinderGeometry(radius, radius, initialHeight, radiusSegments, heightSegments);
      var mesh = new Three.Mesh(geometry, material);
      mesh.position.y = getHeight.call(this)/2;

      this.mesh = mesh;
      this.addUpdatable(mesh);

    }

    function randomAngle () {
      var MAX_ANGLE = Math.PI/400;
      //return MAX_ANGLE;
      return Math.random() * MAX_ANGLE * 2 - MAX_ANGLE;
    }

    function getHeight () {
      return this.height;
    }

    function setHeight (height) {
      this.height = height;
    }

    return TrunkSegment;
});
