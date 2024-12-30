const path = require('path');
const fs = require('fs');
const webpackNodeExternals = require('webpack-node-externals');

// Функция для чтения сервисов и их `main.ts`
const getServices = () => {
  const servicesDir = path.resolve(__dirname, 'apps');
  const services = fs.readdirSync(servicesDir)
      .filter((service) => fs.statSync(path.join(servicesDir, service)).isDirectory())
      .map((service) => {
        const entryFile = path.join(servicesDir, service, 'src', 'main.ts');
        // Проверим, существует ли файл main.ts для каждого сервиса
        if (fs.existsSync(entryFile)) {
          return {
            [service]: entryFile,
          };
        }
        return null;
      })
      .filter(Boolean);

  return Object.assign({}, ...services); // Создаем объект с ключами-сервисами и путями к `main.ts`
};

module.exports = async (options, webpack) => {
  const isProd = process.env.NODE_ENV === 'production';

  // Динамическое определение `entry` для всех сервисов
  const entry = getServices();

  return {
    ...options,
    entry, // Используем динамически созданный объект `entry`
    output: {
      path: path.resolve(__dirname, 'dist'), // Общая директория dist
      filename: '[name].js', // Имя файла для каждого сервиса
      libraryTarget: 'commonjs2', // Указываем, что это Node.js модуль
    },
    target: 'node', // Сборка для Node.js
    externals: [webpackNodeExternals()], // Исключаем `node_modules` из бандла
    mode: isProd ? 'production' : 'development', // Режим работы
    resolve: {
      extensions: ['.js', '.json', '.ts'], // Поддержка расширений файлов
      alias: {
        '@': path.resolve(__dirname), // Если у вас есть алиас на корень проекта
        '@smart-home/libs': path.resolve(__dirname, 'libs'), // Пример алиаса
      },
    },
    module: {
      rules: [
        {
          test: /\.ts$/, // Обрабатываем TypeScript файлы
          loader: 'ts-loader',
          options: {
            transpileOnly: true, // Ускоряем сборку
            configFile: path.resolve(__dirname, 'tsconfig.build.json'), // Указываем tsconfig
          },
          exclude: /node_modules/,
        },
      ],
    },
  };
};
