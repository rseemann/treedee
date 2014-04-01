require.config({
  paths: {
    'jquery': 'libs/jquery-2.1.0',
    'Three': 'libs/three'
  },

  shim: {
    'Three': {
      exports: 'THREE'
    }
  }
});