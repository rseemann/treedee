require.config({
  paths: {
    'jquery': 'libs/jquery-2.1.0',
    'Three': 'libs/three',
    'underscore': 'libs/underscore'
  },

  shim: {
    'Three': {
      exports: 'THREE'
    },
    'underscore': {
      exports: '_'
    }
  }
});