const path = require('path')
const { build, analyzeMetafile } = require('esbuild')
const { htmlPlugin } = require('@craftamap/esbuild-plugin-html')
const fs = require('fs')

async function buildWebsite() {
  try {
    const mode = process.env.NODE_ENV
      ? process.env.NODE_ENV.toLowerCase()
      : 'development'

    const result = await build({
      bundle: true,
      format: 'esm',
      metafile: true,
      platform: 'browser',
      treeShaking: true,
      target: 'esnext',
      minify: mode === 'production',
      sourcemap: mode !== 'production',
      entryPoints: [path.join(__dirname, '../website', 'index.tsx')],
      outdir: path.join(__dirname, '../dist'),
      define: {
        process: JSON.stringify({
          env: {
            NODE_ENV: mode,
          },
        }),
      },
      plugins: [
        htmlPlugin({
          files: [
            {
              title: 'Yupty',
              filename: 'index.html',
              entryPoints: ['website/index.tsx'],
              scriptLoading: 'module',
              htmlTemplate: await fs.promises.readFile('website/index.html'),
            },
          ],
        }),
      ],
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

buildWebsite()
