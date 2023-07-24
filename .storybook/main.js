const vue = require('@vitejs/plugin-vue');
const {
  quasar,
  transformAssetUrls
} = require('@quasar/vite-plugin');
const {
  mergeConfig
} = require('vite');
const path = require('path');
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/vue3',
  core: {
    builder: '@storybook/builder-vite'
  },
  features: {
    storyStoreV7: true
  },
  async viteFinal(config) {
    const plugins = config.plugins.filter(p => {
      return p.name !== 'vite:vue';
    }).concat([vue({
      template: {
        transformAssetUrls
      }
    }), quasar()]);
    const configReplace = {
      ...config,
      plugins
    };
    return mergeConfig(configReplace, {
      resolve: {
        alias: [{
          find: 'src',
          replacement: path.resolve(__dirname, '../src')
        }]
      }
    });
  },
  docs: {
    autodocs: true
  }
};