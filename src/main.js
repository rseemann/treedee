


var WIDTH = 400,
  HEIGHT = 300;

var VIEW_ANGLE = 45,
  ASPECT = WIDTH / HEIGHT,
  NEAR = 0.1,
  FAR = 10000;

var $container = $('#container');

var renderer = new THREE.WebGLRenderer();
var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

var scene = new THREE.Scene();

scene.add(camera);
camera.position.y = 1;
camera.position.z = 300;
renderer.setSize(WIDTH, HEIGHT);

$container.append(renderer.domElement);

var radius = 50,
  segments = 16,
  rings = 16;

var sphereMaterial = new THREE.MeshLambertMaterial({
  color: 0xCC0000
});

var sphere = new THREE.Mesh(
  new THREE.SphereGeometry(radius, segments, rings),
  sphereMaterial
);

scene.add(sphere);

var pointLight = new THREE.PointLight(0xFFFFFF);

pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

scene.add(pointLight);

var grassTex = THREE.ImageUtils.loadTexture('../assets/grass.png');
grassTex.wrapS = THREE.RepeatWrapping;
grassTex.wrapT = THREE.RepeatWrapping;
grassTex.repeat.x = 256;
grassTex.repeat.y = 256;
var groundMat = new THREE.MeshBasicMaterial({map:grassTex});

var groundGeo = new THREE.PlaneGeometry(400, 400);

var ground = new THREE.Mesh(groundGeo, groundMat);
ground.position.y = -2;
ground.rotation.x = - Math.PI/2;
ground.doubleSided = true;

scene.add(ground);

renderer.render(scene, camera);