const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

var path = require("path");

module.exports = {
  outputDir : path.resolve("../backend/public"),
  devServer:{
    proxy:{
      '/api':{
        target:'http://localhost:3000/api',
        changeOrigin:true,
        pathRewrite:{
          "^api^":''
        }
      }
    }
  }
}
