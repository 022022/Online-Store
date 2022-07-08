const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './src/index'),
    mode: 'production',
    module: {
    rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, './src')],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './public'),
    },
};