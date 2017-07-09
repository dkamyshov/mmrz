const fs = require('fs-extended');

const fileList = [
    {from: './src/index.html', to: './dist/index.html'}
];

fileList.map(_ => {
    fs.copyFileSync(_.from, _.to);
});