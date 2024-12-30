# Используем официальный Node.js образ
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и yarn.lock в контейнер
COPY package.json yarn.lock ./

# Устанавливаем зависимости
RUN yarn install --frozen-lockfile

# Копируем все остальные файлы приложения
COPY . .

# Собираем проект
RUN yarn build

# Переменная окружения для продакшн-режима
ENV NODE_ENV=production

# Открываем порт для приложения
EXPOSE 3000

# Запускаем приложение
CMD ["yarn", "start:prod"]
