const path = require('path');

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
     resolve: {
        alias: {
           blocks: path.join(__dirname, './src/blocks'),
           components: path.join(__dirname, './src/components'),
           composables: path.join(__dirname, './src/composables'),
           dataServices: path.join(__dirname, './src/dataServices'),
           store: path.join(__dirname, './src/store')
        }
     }
  }
}
