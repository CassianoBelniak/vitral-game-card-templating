import Path from 'path'
import Chalk from 'chalk'
import * as Vite from 'vite'
import * as FileSystem from 'fs'
import iconGen from 'icon-gen'
import { compileTs } from './private/tsc.js'

const __dirname = import.meta.dirname

function buildRenderer() {
    return Vite.build({
        configFile: Path.join(__dirname, '..', 'vite.config.js'),
        base: './',
        mode: 'production',
    })
}

function buildMain() {
    const mainPath = Path.join(__dirname, '..', 'src', 'main')
    return compileTs(mainPath)
}

async function generateIcons() {
    if (process.platform === 'linux') {
        FileSystem.mkdirSync('./build/icons')
        await iconGen('./misc/icon.svg', './build/icons', {
            favicon: {
                name: 'favicon-',
                sizes: [256],
            },
        })
    } else {
        await iconGen('./misc/icon.svg', './build', {
            ico: {
                name: 'icon',
                sizes: [16, 24, 32, 48, 64, 128, 256],
            },
        })
    }
}

FileSystem.rmSync(Path.join(__dirname, '..', 'build'), {
    recursive: true,
    force: true,
})

console.log(Chalk.blueBright('Buiding files...'))

async function build() {
    await Promise.allSettled([buildRenderer(), buildMain()])
    await generateIcons()
    console.log(Chalk.greenBright('Files generated! Generating project with electron builder...'))
}

build()
