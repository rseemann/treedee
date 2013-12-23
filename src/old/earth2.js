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
  var earthGroup = new THREE.Object3D();
  this.setObject3D(earthGroup);

  this.createGlobe();
  this.createClouds();

  /*

  var earthMap = "src/img/earth_surface_2048.jpg";
  var geometry = new THREE.SphereGeometry(1, 32, 32);
  var texture = THREE.ImageUtils.loadTexture(earthMap);
  var material = new THREE.MeshPhongMaterial({map: texture});
  var mesh = new THREE.Mesh(geometry, material);

  mesh.rotation.z = Earth.TILT;

  this.setObject3D(mesh);
  */
}

Earth.prototype.createGlobe = function () {
  var surfaceMap = THREE.ImageUtils.loadTexture('src/img/earth_surface_2048.jpg');
  var normalMap = THREE.ImageUtils.loadTexture('src/img/earth_normal_2048.jpg');
  var specularMap = THREE.ImageUtils.loadTexture('src/img/earth_specular_2048.jpg');

  var shader = THREE.ShaderUtils.lib['normal'];
  uniforms = THREE.UniformsUtils.clone(shader.uniforms);

  uniforms['tNormal'].texture = normalMap;
  uniforms['tDiffuse'].texture = surfaceMap;
  uniforms['tSpecular'].texture = specularMap;

  uniforms['enableDiffuse'].value = true;
  uniforms['enableSpecular'].value = true;

  var shaderMaterial = new THREE.ShaderMaterial({
    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: uniforms,
    lights: true
  });

  var globeGeometry = new THREE.SphereGeometry(1, 32, 32);
  globeGeometry.computeTangents();

  var globeMesh = new THREE.Mesh(globeGeometry, shaderMaterial);

  globeMesh.rotation.z = Earth.TILT;

  this.object3D.add(globeMesh);
  this.globeMesh = globeMesh;
}

Earth.prototype.createClouds = function  () {
  var cloudsMap = THREE.ImageUtils.loadTexture('src/img/earth_clouds_1024.png');
  var cloudsMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    map: cloudsMap,
    transparent: true
  });

  var cloudsGeometry = new THREE.SphereGeometry(Earth.CLOUDS_SCALE, 32, 32);
  var cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
  cloudsMesh.rotation.z = Earth.TILT;

  this.object3D.add(cloudsMesh);
  this.cloudsMesh = cloudsMesh;
}

Earth.prototype.update = function  () {
  this.globeMesh.rotation.y += Earth.ROTATION_Y;
  this.cloudsMesh.rotation.y += Earth.CLOUDS_ROTATION_Y;

  Sim.Object.prototype.update.call(this);
}

Earth.ROTATION_Y = 0.0025;
Earth.TILT = 0.41;
Earth.CLOUDS_SCALE = 1.005;
Earth.CLOUDS_ROTATION_Y = Earth.ROTATION_Y * 0.95;

function start () {
  var container = document.getElementById("container");

  var earthApp = new EarthApp();
  earthApp.init({container: container});
  earthApp.run();
}