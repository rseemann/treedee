define([
  'Three',
  'underscore'
  ], function (Three, _) {
    var ROTATION_SPEED = new Three.Vector2(45, 20);
    var MAX_Y_ANGLE = 85,
        MIN_Y_ANGLE = -85;



    var CameraController = function(camera){
      this.mouse = new Three.Vector2();
      this.touchDown = new Three.Vector2();
      this.keyDown = null;
      this.camera = camera;

      this.lat = 0;
      this.lon = -90;

      this.phiAngle = function () {
        return Three.Math.degToRad(90 - this.lat);
      };

      this.thetaAngle = function () {
        return Three.Math.degToRad(this.lon);
      };

      document.addEventListener('mousemove', _.bind(onMouseMove, this), false);
      document.addEventListener('mousedown', _.bind(onMouseDown, this), false);
      document.addEventListener('mouseup', _.bind(onMouseUp, this), false);
      document.addEventListener('keydown', _.bind(onKeyDown, this), true);
      document.addEventListener('keyup', _.bind(onKeyUp, this), true);

      this.update = function (delta){
        updateCamera.call(this, delta);
      };
    };

    function onKeyDown (event) {
      this.keydown = event.keyCode;
    }

    function onKeyUp () {
      this.keydown = null;
    }

    function onMouseMove (event) {
      this.mouse = vectorForMouseEvent(event);
    }

    function onMouseDown (event) {
      this.mouseIsDown = true;
      this.touchDown = vectorForMouseEvent(event);
    }

    function onMouseUp () {
      this.mouseIsDown = false;
    }

    function updateCamera (delta){
      updateCameraPosition.call(this, delta);

      if(this.mouseIsDown){
        updateCameraRotation.call(this);
      }
    }

    function updateCameraPosition (delta) {
      if(!this.keydown){return;}

      var change = new Three.Vector3(0, 0, 0);

      var sin = Math.sin(this.thetaAngle());
      var cos = Math.cos(this.thetaAngle());

      switch(this.keydown){
        case 37:
        change.x = sin;
        change.z = -cos;
          break;
        case 38:
        change.x = cos;
        change.z = sin;
          break;
        case 39:
        change.x = -sin;
        change.z = cos;
          break;
        case 40:
        change.x = -cos;
        change.z = -sin;
          break;
        default:
          return;
      }

      this.camera.position.add(change);
    }

    function updateCameraRotation () {
      var dif = this.touchDown.sub(this.mouse);

      this.lon += dif.x * ROTATION_SPEED.x;
      this.lat += dif.y * ROTATION_SPEED.y;

      this.lat = Math.max(MIN_Y_ANGLE, Math.min(MAX_Y_ANGLE, this.lat));
      var phi = this.phiAngle();
      var theta = this.thetaAngle();

      this.target = new Three.Vector3();
      this.target.x = this.camera.position.x + Math.sin(phi) * Math.cos(theta);
      this.target.y = this.camera.position.y + Math.cos(phi);
      this.target.z = this.camera.position.z + Math.sin(phi) * Math.sin(theta);

      console.log(Math.cos(theta), Math.sin(theta));

      this.camera.lookAt(this.target);

      this.touchDown = this.mouse.clone();
    }

    function vectorForMouseEvent (event){
      var vector = new Three.Vector2();
      vector.x = event.clientX/window.innerWidth * 2 - 1;
      vector.y = -(event.clientY/window.innerHeight * 2 - 1);

      return vector;
    }



    return CameraController;
  });