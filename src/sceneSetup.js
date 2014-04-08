define([
  'Three'
  ], function (Three) {
    var SceneSetup = function($container){
      this.scene = null;

      this.render = function () {
        this.renderer.render(this.scene, this.camera);
      };

      setup.call(this, $container);
      addLight.call(this);
    };

    function setup($container){
      var WIDTH = $container.width(),
        HEIGHT = $container.height();

      var VIEW_ANGLE = 45,
        ASPECT = WIDTH/HEIGHT,
        NEAR = 0.1,
        FAR = 10000;

      var renderer = new Three.WebGLRenderer();
      var camera = new Three.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);


      var scene = new Three.Scene();
      scene.add(camera, false);

      camera.position.y = 10;

      renderer.setSize(WIDTH, HEIGHT);

      $container.append(renderer.domElement);

      this.scene = scene;
      this.camera = camera;
      this.renderer = renderer;
    }

    function addLight() {
      var light = new THREE.PointLight(0xffffff);

      light.position.x = 0;
      light.position.y = 300;
      light.position.z = 300;

      light.rotation.x = Math.atan(light.position.y/light.position.z);

      this.scene.add(light, false);
    }

    return SceneSetup;
});