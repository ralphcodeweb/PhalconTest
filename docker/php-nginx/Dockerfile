FROM phalconphp/ubuntu-16.04:php-7.2

COPY nginx.conf /etc/nginx/

#Por la version de PHP soporta phalcon 3.4

RUN composer --version \
    && composer global require phalcon/devtools:3.4 \
    && ln -s ~/composer/vendor/phalcon/devtools/phalcon.php /usr/bin/phalcon \
    && chmod ugo+x /usr/bin/phalcon

EXPOSE 80 443