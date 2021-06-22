'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.config')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const spinner = ora('building for production...')
spinner.start()

new CopyWebpackPlugin([
  {
    from: path.resolve(__dirname, '../client/asset/image/favicon.ico'),
    to: path.resolve(__dirname, '../dist/static/img/favicon.ico')
  },
  // node_modules 目录
  {
    from: path.resolve(__dirname, '../node_modules/**'),
    to: path.resolve(__dirname, '../dist/')
  },
  // package.json 文件
  {
    from: path.resolve(__dirname, '../package.json'),
    to: path.resolve(__dirname, '../dist/'),
    transform (content) {
      return content.toString()
        .replace(/ *(["'])scripts\1:\s+{[^}]+},\r?\n/ig, '')
        .replace(/ *(["'])devDependencies\1:\s+{[^}]+},\r?\n/ig, '');
    }
  },
  // static 目录
  {
    from: path.resolve(__dirname, '../static/**'),
    to: path.resolve(__dirname, '../dist/')
  }

  // -------  目前 server 目录 及 app.js 文件，由命令行 babel 进行转译到目标目录 2016-11-21
])
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
