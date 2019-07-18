module.exports = ({ file, options }) => {
    return {
        parser: file.extname === '.sss' ? 'sugarss' : false,
        plugins: {
            'precss': {},
            'postcss-cssnext': {},
            'cssnano': options.mode === 'production' ? { preset: 'default' } : false
        }
    };
};
