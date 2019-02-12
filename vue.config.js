module.exports = {
    devServer: {
        overlay: {
            warnings: true,
            errors: true
        },
        port: 9000
    },
    configureWebpack: {
        plugins: [
            //new ForkTsCheckerWebpackPlugin()
        ]
    },
    chainWebpack: (config) => {
        // config.module.rule('vue').use('vue-loader').loader('vue-loader').tap((options) => {
        //     if (!options.hasOwnProperty('loaders')) {
        //         options.loaders = {};
        //     }
        //     options.loaders.ts = 'ts-loader!tslint-loader';
        //     return options;
        // });
        // config.module.rule('ts').use('ts-loader').loader('ts-loader').tap((options) => {
        //     options.appendTsSuffixTo = [/\.ts\.vue$/];
        //     options.transpileOnly = true;
        //     return options;
        // });
        const oneOfsMap = config.module.rule('scss').oneOfs.store
        oneOfsMap.forEach(item => {
        item
            .use('sass-resources-loader')
            .loader('sass-resources-loader')
            .options({
                resources: [
                    '@/scss/_variables.scss',
                    // './node_modules/@fortawesome/fontawesome-free/scss/solid.scss',
                    './node_modules/bootstrap/scss/_functions.scss',
                    './node_modules/bootstrap/scss/_variables.scss',
                    './node_modules/bootstrap/scss/_mixins.scss'
            ]})
            .end()
        })
        // config.optimization.splitChunks({
        //     cacheGroups: {
        //         vendorStyles: {
        //             name: 'vendor',
        //             test(module) {
        //             return (
        //                 /node_modules/.test(module.context) &&
        //                 !/\.css$/.test(module.request)
        //             );
        //             },
        //             chunks: 'all',
        //             enforce: true
        //         }
        //     }
        // });
    }
}