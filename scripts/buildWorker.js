const path = require('path')
const { build, analyzeMetafile } = require('esbuild')

async function buildWorker() {
  try {
    const mode = process.env.NODE_ENV
      ? process.env.NODE_ENV.toLowerCase()
      : 'development'

    const result = await build({
      bundle: true,
      minify: mode === 'production',
      sourcemap: mode !== 'production',
      metafile: true,
      platform: 'neutral',
      treeShaking: true,
      // format: 'esm',
      target: 'esnext',
      entryPoints: [path.join(__dirname, '../worker', 'index.ts')],
      outfile: path.join(__dirname, '../dist/_worker.js'),
      define: {
        process: JSON.stringify({
          env: {
            NODE_ENV: mode,
          },
        }),
      },
    })

    if (mode === 'production') {
      const bundleSizeAnalysis = await analyzeMetafile(result.metafile, {
        color: true,
      })
      console.log(bundleSizeAnalysis)
    }
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  }
}

buildWorker()
