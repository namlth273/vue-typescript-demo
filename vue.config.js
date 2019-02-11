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
            //new MyAwesomeWebpackPlugin()
        ]
    },
    chainWebpack: (config) => {
        config.module.rule('vue').use('vue-loader').loader('vue-loader').tap((options) => {
            if (!options.hasOwnProperty('loaders')) {
                options.loaders = {};
            }
            options.loaders.ts = 'ts-loader!tslint-loader';
            return options;
        });
        config.module.rule('ts').use('ts-loader').loader('ts-loader').tap((options) => {
            options.appendTsSuffixTo = [/\.ts\.vue$/];
            options.transpileOnly = true;
            return options;
        });
    }
}