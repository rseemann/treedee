define([
  'jquery',
  'underscore'
], function ($, _) {
  var STEP = 0.1;

  var CameraController = function (options) {
    this.camera = options.camera;
    this.minHeight = options.minHeight;

    this.init();
  }

  CameraController.prototype = {
    init : function () {
      bindKeys.call(this);
    }
  }

  function bindKeys () {
    $(document).keydown(_.bind(onKeydown, this));
  }

  function onKeydown (event) {
    console.log(event.keyCode);

    switch(event.keyCode){
      case 65://a
        moveCamera.call(this, 'x', -STEP);
        break;
      case 68://d
        moveCamera.call(this, 'x', +STEP);
        break;
      case 83://s
        moveCamera.call(this, 'z', +STEP);
        break;
      case 87://w
        moveCamera.call(this, 'z', -STEP);
        break;
    }
  }

  function moveCamera (axis, value) {
    this.camera.position[axis] += value;
  }

  return CameraController;
});