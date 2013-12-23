define([
  'jquery',
  'application'
], function ($, Application) {
  $(document).ready(function(){
    var container = document.getElementById("container");

    Application.init({ container: container });
    Application.run();
  });
});