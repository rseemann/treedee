define([
  'Three',
  'underscore'
  ], function (Three, _) {
    var speed = new Three.Vector2(45, 20);

    var CameraController = function(camera){
      this.mouse = new Three.Vector2();
      this.touchDown = new Three.Vector2();
      this.camera = camera;

      this.lat = 0;
      this.lon = -90;

      document.addEventListener('mousemove', _.bind(onMouseMove, this), false);
      document.addEventListener('mousedown', _.bind(onMouseDown, this), false);
      document.addEventListener('mouseup', _.bind(onMouseUp, this), false);

      this.update = function (delta){
        if(this.mouseIsDown){
          updateCamera.call(this, delta);
        }
      };
    };

    function onMouseMove (event) {
      this.mouse.x = event.clientX/window.innerWidth * 2 - 1;
      this.mouse.y = -(event.clientY/window.innerHeight * 2 - 1);
    }

    function onMouseDown (event) {
      this.mouseIsDown = true;
      this.touchDown = new Three.Vector2(event.clientX/window.innerWidth * 2 - 1, -(event.clientY/window.innerHeight * 2 - 1));
    }

    function onMouseUp () {
      this.mouseIsDown = false;
    }

    function updateCamera (delta){
      var dif = this.touchDown.clone().sub(this.mouse);

      this.lon += dif.x * speed.x;
      this.lat += dif.y * speed.y;

      this.lat = Math.max(-85, Math.min(85, this.lat));
      var phi = Three.Math.degToRad(90 - this.lat);
      var theta = Three.Math.degToRad(this.lon);

      this.target = new Three.Vector3();
      this.target.x = this.camera.position.x + Math.sin(phi) * Math.cos(theta);
      this.target.y = this.camera.position.y + Math.cos(phi);
      this.target.z = this.camera.position.z + Math.sin(phi) * Math.sin(theta);

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