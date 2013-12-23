define([
  'underscore',
  'three',
  'sim'
], function (_, THREE, Sim) {
  Sun = function  () {
    Sim.Object.call(this);
  }

  Sun.prototype = _.extend(new Sim.Object(), {
    init : function  () {
      var sunGroup = new THREE.Object3D();

      var uniforms = {
        time: {
          type: 'f',
          value: 1.0
        },
        texture1: {
          type: 't',
          value: 0,
          texture: THREE.ImageUtils.loadTexture('src/img/cloud.png')
        },
        texture2: {
          type: 't',
          value: 1,
          texture: THREE.ImageUtils.loadTexture('src/img/lavatile.jpg')
        }
      };

      uniforms.texture1.texture.wrapS = uniforms.texture1.texture.wrapT = THREE.Repeat;
      uniforms.texture2.texture.wrapS = uniforms.texture2.texture.wrapT = THREE.Repeat;

      var vertex = document.getElementById('vertexShader').textContent;
      var fragment = document.getElementById('fragmentShader').textContent;

      var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertex,
        fragmentShader: fragment
      });

      var geometry = new THREE.SphereGeometry(1, 64, 64);
      var sunMesh = new THREE.Mesh(geometry, material);

      this.uniforms = uniforms;

      this.clock = new THREE.Clock();

      var light = new THREE.PointLight(0xffffff, 1.2, 100000);

      sunGroup.add(sunMesh);
      sunGroup.add(light);

      this.setObject3D(sunGroup);
    },

    update: function () {
      var delta = this.clock.getDelta();

      this.uniforms.time.value += delta;

      Sim.Object.prototype.update.call(this);
      this.object3D.rotation.y -= 0.001;
    }
  });

  return Sun;
})