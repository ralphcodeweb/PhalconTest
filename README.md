# PhalconTest

<img src="https://files.readme.io/5cb6609-phalcon-icon.png" width="50">
<img src="https://files.readme.io/2b2cab6-jses6.png" width="50">


### Vía Git

```
git clone https://github.com/ralphcodeweb/PhalconTest.git
```

### Dentro de la carpeta docker

```
> cp .env.example .env
> docker-compose build php-nginx
> docker-compose build mysql
```

### En docker/php-nginx/sites
```
> cp phalcon-app.example phalcon-app.conf
```
### Editar archivo host
```
127.0.0.1 phalcon-app.test
```
### Levantar el servicio
```
> docker-compose up -d php-nginx mysql
```
### Pasos antes de entrar al contenedor
```
> Crear la Base de datos
```

docker-entrypoint-initdb.d
### Dentro del contenedor
```
> docker-compose exec php-nginx bash
> cd myapp
> phalcon info
> phalcon migration run
```

###
[Readme IO](https://phalcontest.readme.io/docs/getting-started)