define([
  'underscore',
  'sim',
  'three'
], function (_, Sim, THREE) {
  var Earth = function () {
    Sim.Object.call(this);
  }

  Earth.prototype = _.extend(new Sim.Object(), {
    init: function () {
      var earthMap = "src/img/earth_surface_2048.jpg";
      var geometry = new THREE.SphereGeometry(1, 32, 32);
      var texture = THREE.ImageUtils.loadTexture(earthMap);
      var material = new THREE.MeshBasicMaterial({map: texture});
      var mesh = new THREE.Mesh(geometry, material);

      this.setObject3D(mesh);
    },
    update: function  () {
      this.object3D.rotation.y += 0.001;
    }
  });

  return Earth;
})