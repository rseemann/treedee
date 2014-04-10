define([
  'underscore',
  'Three',
  'trunkSegment'
  ], function (_, Three, TrunkSegment) {
    var TIME_TO_REPRODUCE = 1;

    var TreeGenerator = function() {
      this.timer = new Three.Clock();
      this.lastReproductionTime = 0;

      addTrunk.call(this, new Three.Vector3(0, 0, 0));
      createNewTrunk.call(this);
      // createNewTrunk.call(this);
      // createNewTrunk.call(this);
      // createNewTrunk.call(this);
      // createNewTrunk.call(this);
      // createNewTrunk.call(this);
      // createNewTrunk.call(this);
      // createNewTrunk.call(this);


      this.update = _.bind(update, this);
    };

    TreeGenerator.prototype = new Three.Object3D();

    function update (delta) {
      var secondsPassed = Math.floor(this.timer.getElapsedTime());
      if(secondsPassed > this.lastReproductionTime && (secondsPassed % TIME_TO_REPRODUCE === 0)){
        this.lastReproductionTime = secondsPassed;
      }
    }

    function createNewTrunk () {
      var segment = _.last(this.children);
      addTrunk.call(this, segment.germinationPoint(), true);
    }

    function addTrunk (position, animatable) {
      var newTrunk = new TrunkSegment(position, animatable);

      this.addUpdatable(newTrunk);
    }

    return TreeGenerator;
  });