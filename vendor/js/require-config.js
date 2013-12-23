require.config({
	paths : {
		'jquery': '../vendor/js/jquery',
    'underscore': '../vendor/js/underscore',
    'three': '../vendor/js/three',
    'sim': '../vendor/js/sim'
	},

	shim : {
		'underscore': {
      exports: '_'
    },
    'three': {
      exports: 'THREE'
    },
    'sim': {
      deps: ['jquery', 'three'],
      exports: 'Sim'
    }
	}
});
