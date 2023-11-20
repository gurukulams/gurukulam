/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | Please report any issues you encounter:
 |  https://github.com/shakyShane/browser-sync/issues
 |
 | For up-to-date information about the options:
 |  https://github.com/shakyShane/browser-sync/wiki/Working-with-a-Config-File
 |
 */
// eslint-disable-next-line no-undef
const { readFile } = require('fs/promises')
module.exports = {
    files: ["dist/css/*.css", "dist/js/*.js", "dist/**/*.html"],
    serveStatic: ['dist'],
    proxy: "http://localhost:8080",
    middleware: [
        {
            route: "/questions",
            handle: async function (req, res, next) {
                async function content(path) {
                    return await readFile(path, 'utf8')
                }
                const text = await content('./dist/practices/basic/index.html')
                res.write(text);
                res.end();
            }
        },
        {
            route: "/ta/questions",
            handle: async function (req, res, next) {
                async function content(path) {
                    return await readFile(path, 'utf8')
                }
                const text = await content('./dist/practices/basic/index.html')
                res.write(text);
                res.end();
            }
        },
        {
            route: "/profile",
            handle: async function (req, res, next) {
                async function content(path) {
                    return await readFile(path, 'utf8')
                }
                const text = await content('./dist/profile/index.html')
                res.write(text);
                res.end();
            }
        }
    ],
    ghostMode: false,
};