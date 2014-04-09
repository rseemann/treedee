define([
  'underscore',
  'Three',
  'trunkSegment'
  ], function (_, Three, TrunkSegment) {
    var TIME_TO_REPRODUCE = 1;

    var TreeGenerator = function() {
      this.timer = new Three.Clock();
      this.lastReproductionTime = 0;

      addTrunk.call(this);

      this.update = _.bind(update, this);
    };

    TreeGenerator.prototype = new Three.Object3D();

    function update (delta) {
      var secondsPassed = Math.floor(this.timer.getElapsedTime());
      if(secondsPassed > this.lastReproductionTime && (secondsPassed % TIME_TO_REPRODUCE === 0)){
        this.lastReproductionTime = secondsPassed;

        //createNewTrunk.call(this);
      }

      // createNewTrunk.call(this);
    }

    function createNewTrunk (argument) {
      var segment = _.last(this.children);
      addTrunk.call(this, segment.top());
    }

    function addTrunk (position) {
      this.addUpdatable(new TrunkSegment(position));
    }

    return TreeGenerator;
  });