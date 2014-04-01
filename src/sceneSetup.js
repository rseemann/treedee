define([
  'Three'
  ], function (Three) {
    var SceneSetup = function($container){
      this.scene = null;

      this.render = function () {
        this.renderer.render(this.scene, this.camera);
      };

      setup.call(this, $container);
    };

    function setup($container){
      var WIDTH = 400,
        HEIGHT = 300;
      
      var VIEW_ANGLE = 45,
        ASPECT = WIDTH/HEIGHT,
        NEAR = 0.1,
        FAR = 10000;

      var renderer = new Three.WebGLRenderer();
      var camera = new Three.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

      var scene = new Three.Scene();
      scene.add(camera);
      
      camera.position.y = 1;
      camera.position.z = 20;

      renderer.setSize(WIDTH, HEIGHT);

      $container.append(renderer.domElement);

      this.scene = scene;
      this.camera = camera;
      this.renderer = renderer;
    }

    return SceneSetup;
});