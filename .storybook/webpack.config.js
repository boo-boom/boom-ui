const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = ({ config }) => {
  // 解决build时CssDependency报错
  if (config.mode === 'production') {
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].min.css',
      }),
    );
  }
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: require.resolve("babel-loader"),
        options: {
          presets: [require.resolve("babel-preset-react-app")]
        }
      }, 
      {
        loader: require.resolve("react-docgen-typescript-loader"),
        options: {
          shouldExtractLiteralValuesFromEnum: true,
          propFilter: (prop) => {
            if (prop.parent) {
              return !prop.parent.fileName.includes('node_modules')
            }
            return true            
          }
        }
      }
    ]
  });

  config.resolve.extensions.push(".ts", ".tsx");

  return config;
};
