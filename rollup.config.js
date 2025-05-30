import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import autoprefixer from 'autoprefixer';

const isProduction = process.env.NODE_ENV === 'production';

export default {
    input: 'src/components/index.js',
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs',
            exports: 'named',
            sourcemap: !isProduction
        },
        {
            file: 'dist/index.esm.js',
            format: 'esm',
            exports: 'named',
            sourcemap: !isProduction
        }
    ],
    plugins: [
        peerDepsExternal(),
        resolve({
            browser: true,
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            preferBuiltins: false
        }),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            presets: [
                ['@babel/preset-react', {
                    runtime: 'automatic'
                }]
            ],
            extensions: ['.js', '.jsx']
        }),
        commonjs({
            include: 'node_modules/**'
        }),
        postcss({
            extract: 'styles.css',
            minimize: isProduction,
            sourceMap: !isProduction,
            plugins: [
                // ✅ Eliminar Tailwind temporalmente para evitar conflictos
                // tailwindcss(),
                autoprefixer()
            ]
        }),
        isProduction && terser({
            compress: {
                drop_console: true,
                drop_debugger: true
            },
            mangle: {
                reserved: ['React', 'ReactDOM']
            }
        })
    ].filter(Boolean),
    external: [
        'react',
        'react-dom',
        'react-router-dom',
        'axios',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/free-regular-svg-icons',
        '@fortawesome/react-fontawesome'
    ]
};
