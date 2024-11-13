import path from "path";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import aliasPlugin from "@rollup/plugin-alias";
import { terser } from "rollup-plugin-terser";
import bundleSize from "rollup-plugin-bundle-size";
import { babel } from "@rollup/plugin-babel";
import fs from "fs-extra";

const lib = fs.readJsonSync("./package.json");
const outputFileName = 'autoPlayer';
const name = "autoPlayer";
const namedInput = './index.js';
const defaultInput = './lib/axios.js';
const buildConfig = ({ es5, browser = true, minifiedVersion = true, alias, ...config }) => {
    const { file } = config.output;
    const ext = path.extname(file);
    const basename = path.basename(file, ext);
    const extArr = ext.split('.');
    extArr.shift();
    const build = ({ minified }) => {
        return {
            input: namedInput,
            ...config,
            output: {
                ...config.output,
                file: `${ path.dirname(file) }/${ basename }.${ (minified ? ['min', ...extArr] : extArr).join('.') }`
            },
            plugins: [
                aliasPlugin({
                    entries: alias || []
                }),
                json(),
                resolve(),
                commonjs(),
                minified && terser(),
                minified && bundleSize(),
                ...(es5 ? babel({ babelHelpers: "bundled" }) : []),
                ...(config.plugins || [])
            ]
        };
    };

    const configs = [
        build({ minified: false })
    ];
    if (minifiedVersion) {
        configs.push(build({ minified: true }));
    }
    return configs;
};
export default async () => {
    const year = new Date().getFullYear();
    const banner = `// ${ name } v${ lib.version } Copyright (c) ${ year } ${ lib.author } and contributors`;
    return [
        ...buildConfig({
            input: namedInput,
            output: {
                file: `dist/${ outputFileName }.js`,
                name,
                format: "umd",
                banner
            }
        }),
        ...buildConfig({
            input: namedInput,
            output: {
                file: `dist/esm/${ outputFileName }.js`,
                name,
                format: "esm",
                banner
            }
        }),
        ...buildConfig({
            input: namedInput,
            minifiedVersion: false,
            es5: false,
            output: {
                file: `dist/node/${ outputFileName }.cjs`,
                name,
                format: "cjs",
                banner
            }
        })
    ];
}
