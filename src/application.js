define([
  'underscore',
  'sim',
  'main_controller',
], function (_, Sim, MainController) {
  var instance = null;

  function App () {
    Sim.App.call(this);
  }

  App.prototype = _.extend(new Sim.App(), {
    init: function (args) {
      Sim.App.prototype.init.call(this, args);
      this.mainController = new MainController(this);
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