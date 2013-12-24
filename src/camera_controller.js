define([
  'jquery',
  'underscore'
], function ($, _) {
  var POS_STEP = 0.1;
  var ROT_STEP = 0.1;

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
    switch(event.keyCode){
      case 65://a
        moveCamera.call(this, 'x', -POS_STEP);
        break;
      case 68://d
        moveCamera.call(this, 'x', +POS_STEP);
        break;
      case 83://s
        moveCamera.call(this, 'z', +POS_STEP);
        break;
      case 87://w
        moveCamera.call(this, 'z', -POS_STEP);
        break;
      case 37://left
        rotateCamera.call(this, 'y', +ROT_STEP);
        break;
      case 39://right
        rotateCamera.call(this, 'y', -ROT_STEP);
        break;
      case 38://up
        rotateCamera.call(this, 'x', +ROT_STEP);
        break;
      case 40://down
        rotateCamera.call(this, 'x', -ROT_STEP);
        break;

    }
  }

  function moveCamera (axis, value) {
    this.camera.position[axis] += value;
  }

  function rotateCamera (axis, value) {
    this.camera.rotation[axis] += value;
  }

  return CameraController;
});