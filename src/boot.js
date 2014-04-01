define([
  'jquery',
  'sceneSetup',
  'trunkMesh'
  ], function ($, SceneSetup, TrunkMesh) {
    var container = $("#container");

    var sceneSetup = new SceneSetup(container);

    var radius = 50,
      segments = 16,
      rings = 16;

    var sphereMaterial = new THREE.MeshLambertMaterial({
      color: 0xCC0000
    });

    var sphere = new THREE.Mesh(
      new THREE.SphereGeometry(radius, segments, rings),
      sphereMaterial
    );

    sceneSetup.scene.add(sphere);

    sceneSetup.render();

});