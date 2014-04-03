require.config({
  paths: {
    'jquery': 'libs/jquery-2.1.0',
    'Three': 'libs/three',
    'underscore': 'libs/underscore',
    'Stats': 'libs/Stats'
  },

  shim: {
    'Three': {
      exports: 'THREE'
    },
    'underscore': {
      exports: '_'
    },
    'Stats': {
      exports: 'Stats'
    }
  }
});