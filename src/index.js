const fs = require('fs');
const path = require('path');
const mustache = require('mustache');

const indexTemplate = fs.readFileSync(path.join(__dirname, 'index.mustache'), 'utf8');

const generateIndex = (basePath) => {
    const files = fs.readdirSync(basePath, { withFileTypes: true });

    const index = {
        title: path.resolve('/', basePath),
        files: [],
    };

    for (const file of files) {
        const isDir = file.isDirectory();

        if (isDir) {
            generateIndex(path.join(basePath, file.name));
        }

        index.files.push({ name: file.name + (isDir ? '/' : ''),
            stats: fs.statSync(path.join(basePath, file.name)) });
    }

    index.files.sort((a, b) => a.stats.mode - b.stats.mode);

    fs.writeFileSync(path.join(basePath, 'index.html'), mustache.render(
        indexTemplate, index));
};

generateIndex('./');
