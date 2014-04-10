define([
  'Three',
  'underscore'
  ], function (Three, _) {
    var ROTATION_SPEED = new Three.Vector2(90, 45);
    var MAX_Y_ANGLE = 85,
        MIN_Y_ANGLE = -85;

    var LEFT_MOVE = 'LEFT',
        FORWARD_MOVE = 'FORWARD',
        RIGHT_MOVE = 'RIGHT',
        BACKWARDS_MOVE = 'BACK',
        UP_MOVE = 'UP',
        DOWN_MOVE = 'DOWN';

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
      document.addEventListener('keydown', _.bind(onKeyDown, this), false);
      document.addEventListener('keyup', _.bind(onKeyUp, this), false);

      this.update = function (delta){
        updateCamera.call(this, delta);
      };
    };

    function onKeyDown (event) {
      var moveDirection;

      switch(event.keyCode){
        case 37:
        case 65:
          moveDirection = LEFT_MOVE;
          break;
        case 38:
        case 87:
          moveDirection = FORWARD_MOVE;
          break;
        case  39:
        case 68:
          moveDirection = RIGHT_MOVE;
          break;
        case 40:
        case 83:
          moveDirection = BACKWARDS_MOVE;
          break;
        case 90:
          moveDirection = UP_MOVE;
          break;
        case 88:
          moveDirection = DOWN_MOVE;
          break;
        default:
          return;
      }

      this.keydown = event.keyCode;
      this.moveDirection = moveDirection;
    }

    function onKeyUp (event) {
      if(event.keyCode == this.keydown){
        this.keydown = null;
      }
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

      switch(this.moveDirection){
        case LEFT_MOVE:
          change.x = sin;
          change.z = -cos;
          break;
        case FORWARD_MOVE:
          change.x = cos;
          change.z = sin;
          break;
        case RIGHT_MOVE:
          change.x = -sin;
          change.z = cos;
          break;
        case BACKWARDS_MOVE:
          change.x = -cos;
          change.z = -sin;
          break;
        case UP_MOVE:
          change.y = 1;
          break;
        case DOWN_MOVE:
          change.y = -1;
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

      this.camera.lookAt(this.target);

      this.touchDown = this.mouse.clone();
    }

    function vectorForMouseEvent (event){
      var vector = new Three.Vector2();
      vector.x = -event.clientX/window.innerWidth * 2 - 1;
      vector.y = (event.clientY/window.innerHeight * 2 - 1);

      return vector;
    }



    return CameraController;
  });