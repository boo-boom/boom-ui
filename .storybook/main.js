module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/preset-create-react-app', '@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [['react-app', { flow: false, typescript: true }]],
          },
        },
        // 无效...
        // {
        //   loader: require.resolve('react-docgen-typescript-loader'),
        //   options: {
        //     // type类型的属性自动展开
        //     shouldExtractLiteralValuesFromEnum: true,
        //     // 过滤掉不需要爬取的属性的来源
        //     propFilter: (prop) => {
        //       if (prop.parent) {
        //         return !prop.parent.fileName.includes('node_modules')
        //       }
        //       return true
        //     },
        //   },
        // },
      ],
    })
    config.resolve.extensions.push('.ts', '.tsx')
    return config
  },
}