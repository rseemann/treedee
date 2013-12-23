//pag 42

EarthApp = function () {
  Sim.App.call(this);
}

EarthApp.prototype = new Sim.App();

EarthApp.prototype.init = function (param) {
  Sim.App.prototype.init.call(this, param);

  var earth = new Earth();
  earth.init();
  this.addObject(earth);

  var sun = new Sun();
  sun.init();
  this.addObject(sun);
}

Sun = function () {
  Sim.Object.call(this);
}

Sun.prototype = new Sim.Object();

Sun.prototype.init = function  () {
  var light = new THREE.PointLight(0xffffff, 2, 100);
  light.position.set(-10, 0, 20);

  this.setObject3D(light);
}

Earth = function () {
  Sim.Object.call(this);
}

Earth.prototype = new Sim.Object();

Earth.prototype.init = function () {
  var earthMap = "src/img/earth_surface_2048.jpg";
  var geometry = new THREE.SphereGeometry(1, 32, 32);
  var texture = THREE.ImageUtils.loadTexture(earthMap);
  var material = new THREE.MeshPhongMaterial({map: texture});
  var mesh = new THREE.Mesh(geometry, material);

  mesh.rotation.z = Earth.TILT;

  this.setObject3D(mesh);
}

Earth.prototype.update = function  () {
  this.object3D.rotation.y += Earth.ROTATION_Y;
}

Earth.ROTATION_Y = 0.0025;
Earth.TILT = 0.41;

function start () {
  var container = document.getElementById("container");

  var earthApp = new EarthApp();
  earthApp.init({container: container});
  earthApp.run();
}