require.config({
  // make components more sensible
  // expose lodash
  paths: {
    "components": "../bower_components",
    "lodash": "bower_components/lodash/dist/lodash",
    "Class": "bower_components/resig/BaseClass"
  }
});

require(['main']);