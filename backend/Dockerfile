# Используем образ линукс Alpine с версией Node.js 14
FROM node:19.5.0-alpine

# Указываем рабочую дерикторию
WORKDIR /app

# Копируем package.json и package-lock.json внутрь контейнера
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем оставшееся приложение в контейнер
COPY . .

# Устанавливаем Prisma
RUN npm install -g prisma

# Генерируем Prisma client
RUN prisma generate

# Копируем Prisma schema
COPY prisma/schema.prisma ./prisma/

# Открываем порт 3000 в контейнере
EXPOSE 3000

# Запускаем сервер
CMD [ "npm", "start" ]
