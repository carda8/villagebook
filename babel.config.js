module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.jsx', '.js', '.json'],
        alias: {
          '~': './src',
        },
      },
    ],
  ],
};
