define([
  'jquery',
  'sceneSetup',
  'trunkMesh'
  ], function ($, SceneSetup, TrunkMesh) {
    var container = $("#container");

    var sceneSetup = new SceneSetup(container);
    sceneSetup.render();
});