const path = require('path');
const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  '@features': path.resolve(__dirname, 'src/features'),
  '@assets': path.resolve(__dirname,'assets')
};


config.transformer.babelTransformerPath = require.resolve(
  'react-native-svg-transformer'
);

config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== 'svg'
);
config.resolver.sourceExts.push('svg');


module.exports = config;
