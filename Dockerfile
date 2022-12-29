FROM nginx:1.15

RUN sed -i '/index.html index.htm;/a try_files $uri $uri/index.html /index.html;' /etc/nginx/conf.d/default.conf
RUN rm -f /usr/share/nginx/html/*
COPY ./src  /usr/share/nginx/html/


EXPOSE 80
