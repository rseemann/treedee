define([
  'jquery',
  'sceneSetup',
  'trunkMesh'
  ], function ($, SceneSetup, TrunkMesh) {
    var container = $("#container");

    var sceneSetup = new SceneSetup(container);
    var scene = sceneSetup.scene;

    addTrunk(scene);

    sceneSetup.render();

    function addTrunk (scene) {
      scene.add(new TrunkMesh());
      scene.add(new TrunkMesh(50, 50, -100));
      scene.add(new TrunkMesh(-100, 50, 100));
    }
});