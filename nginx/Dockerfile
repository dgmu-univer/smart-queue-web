FROM nginx:alpine

# Удаляем стандартный конфиг nginx
RUN rm -f /etc/nginx/conf.d/default.conf

# Копируем основной конфиг nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Копируем конфиги виртуальных хостов
COPY conf.d/ /etc/nginx/conf.d/

# Создаём директорию для SSL-сертификатов
RUN mkdir -p /etc/nginx/ssl

EXPOSE 80 443

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
