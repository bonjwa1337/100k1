# используем официальный образ Node.js, версия 14
FROM node:22

# указываем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json в рабочую директорию
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install --verbose

# Копируем все остальные файлы проекта в рабочую директорию
COPY . ./

# Команда для запуска приложения
CMD ["npm", "start"]