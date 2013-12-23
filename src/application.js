define([
  'underscore',
  'three',
  'sim',
  'sun'
], function (_, Three, Sim, Sun) {
  var instance = null;

  function App () {
    Sim.App.call(this);
  }

  App.prototype = _.extend(new Sim.App(), {
    init: function (args) {
      Sim.App.prototype.init.call(this, args);

      var sun = new Sun();
      sun.init();
      this.addObject(sun);
    }
  });

  App.getInstance = function () {
    if(instance === null){
      instance = new App();
    }

    return instance;
  }

  return App.getInstance();
})