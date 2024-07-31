import Path from 'path'
import Chalk from 'chalk'
import * as Vite from 'vite'
import * as FileSystem from 'fs'
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

FileSystem.rmSync(Path.join(__dirname, '..', 'build'), {
    recursive: true,
    force: true,
})

console.log(Chalk.blueBright('Transpiling renderer & main...'))

Promise.allSettled([buildRenderer(), buildMain()]).then(() => {
    console.log(
        Chalk.greenBright(
            'Renderer & main successfully transpiled! (ready to be built with electron-builder)',
        ),
    )
})

