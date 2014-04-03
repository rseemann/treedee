define([
  'jquery',
  'underscore',
  'Three',
  'application'
  ], function ($, _, Three, Application) {
    var container = $("#container");

    modifyThree();

    var application = new Application(container);

    function modifyThree () {
      Three.Object3D.prototype.addUpdatable = function (child) {
        if(!this.animatableChildren){
          this.animatableChildren = [];
        }

        this.animatableChildren.push(child);
        this.add(child);
      };

      Three.Object3D.prototype.updateAll = function (delta) {
        _.each(this.animatableChildren, function (child) {
          child.updateAll(delta);
        });

        this.update(delta);
      };

      Three.Object3D.prototype.update = function (delta) {
      };
    }

    function addAnimatableChild (child) {
    }
});