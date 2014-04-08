define([
  'underscore',
  'Three',
  'trunkMesh'
  ], function (_, Three, TrunkMesh) {
    var TreeGenerator = function () {
      this.tree = generateTree.call(this);
    };

    function generateTree () {
      var tree = new Three.Object3D();

      tree.addUpdatable(new TrunkMesh());

      return tree;
    }

    return TreeGenerator;
  });