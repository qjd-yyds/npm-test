import { series, task } from "gulp";
import fs from "fs-extra";
import minimist from "minimist";


const argv = minimist(process.argv.slice(2));

function clean() {
    return fs.emptyDir("./dist");
}

async function env() {
    const npmbuffer = await fs.readFile("package.json");
    const npm = JSON.parse(npmbuffer.toString());
    const envFilePath = "./lib/env/data.js";
    await fs.writeFile(envFilePath, Object.entries({
        VERSION: (argv.bump || npm.version).replace(/^v/, "")
    }).map(([k, v]) => `export const ${ k } = ${ JSON.stringify(v) }`).join("\n"));
}

const version = series(clean, env);
export {
    clean,
    version,
    env
};
