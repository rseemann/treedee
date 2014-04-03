define([
  'Three',
  'underscore'
  ], function (Three, _) {
    var speed = Math.PI/5;

    var CameraController = function(camera){
      this.mouse = new Three.Vector3(0,0,0);
      this.camera = camera;

      document.addEventListener('mousemove', _.bind(onMouseMove, this), false);

      this.update = function (delta){
        updateCamera.call(this, delta);
      };
    };

    function onMouseMove (event) {
      this.mouse.x = event.clientX/window.innerWidth * 2 - 1;
      this.mouse.y = -(event.clientY/window.innerHeight * 2 - 1);
    }

    function updateCamera (delta){
      //this.mouse.x += this.mouseMovement.x * speed;
      //this.mouse.y += this.mouseMovement.y * speed;

      this.camera.rotation.x += this.mouse.y * speed * delta;
      this.camera.rotation.y += -this.mouse.x * speed * delta;

      //this.camera.lookAt(this.mouse.clone());
    }

    return CameraController;
  });