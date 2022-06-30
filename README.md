# Next.js Tekium Shop App

Para correr el proyecto, es necesarion crear la Base de Datos en una imagen de Docker-MongoDB.

```
docker-compose up -d
```

* El -d, significa que se ejecutara en segundo plano __detached__.

---

* MongoDB URL Local:
```
mongodb://localhost:27017/tekiumshopdb
```


## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__

Completar las variables de entorno en el archivo __.env__

## Llenar la Base de Datos con información de pruebas

```
http://localhost:3000/api/seed
```