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

      this.counter = 0;
      this.update = _.bind(update, this);
    };

    TreeGenerator.prototype = new Three.Object3D();

    function update (delta) {
      this.counter += 1;

      var secondsPassed = Math.floor(this.timer.getElapsedTime());
      if(secondsPassed > this.lastReproductionTime && (secondsPassed % TIME_TO_REPRODUCE === 0)){
        this.lastReproductionTime = secondsPassed;
      }

      if(this.counter < 100){
        createNewTrunk.call(this);
        console.log(this.counter);
      }
    }

    function createNewTrunk () {
      var segment = _.last(this.children);
      return addTrunk.call(this, segment, true);
    }

    function addTrunk (parent, animatable) {
      var newTrunk = new TrunkSegment(parent, animatable);

      this.addUpdatable(newTrunk);
      return newTrunk;
    }

    return TreeGenerator;
  });