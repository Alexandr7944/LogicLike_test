# Stage 1 - Build
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем файлы зависимостей
COPY . .

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY public ./public
COPY src ./src

# Собираем приложение
RUN npm run build

# Stage 2 - Production
FROM nginx:alpine

# Копируем конфиг nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранные файлы из стадии builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Устанавливаем права и запускаем nginx
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
