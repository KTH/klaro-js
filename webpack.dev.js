const webpack = require('webpack');
const path = require('path');
const SRC_DIR = path.resolve(__dirname, 'src');


new webpack.DefinePlugin({
    __REACT_DEVTOOLS_GLOBAL_HOOK__: '({ isDisabled: true })',
});

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    optimization: {
        minimize: false,
    },
    plugins: [
        new webpack.DefinePlugin({
            VERSION: JSON.stringify('development'),
        })
    ],
    devServer: {
        hot: true,
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        historyApiFallback: true,
        client: {
            overlay: true,
        },
        proxy: [
            {
                context: ['/api'],
                target: 'http://localhost:5000',
                secure: false,
            },
        ],
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
            'Content-Security-Policy': " style-src 'self'",
        },
        allowedHosts: 'all',
    }
};
