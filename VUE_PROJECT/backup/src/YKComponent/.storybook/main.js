const path = require('path');
module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@storybook/addon-notes'
  ],
  async viteFinal(config, options) {
    // modify and return config
    const customConfig = {
        ...config,
        base: '/wap/pc-visual-component/',
        build: {
            ...config.build,
            sourcemap: false,
        },
        resolve: {
            alias: {
                ...config.resolve.alias,
                '@': path.join(__dirname, `../src`),
            }
        }
    }
    return customConfig
  },
  "framework": "@storybook/vue3",
  "core": {
    "builder": "@storybook/builder-vite"
  }
}