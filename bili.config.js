module.exports = {
  output: {
    fileName: 'jalaliday.[format][min].js',
    moduleName: 'jalaliday',
    format: [
      'cjs-min',
      'es',
      'umd-min'
    ],
    sourceMap: false
  },
  externals: ['dayjs']
}
