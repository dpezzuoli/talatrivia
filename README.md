<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

 

## TalaTrivia
Proyecto realizado en Typescript bajo el framework [Nest](https://github.com/nestjs/nest), Postgresql y Docker.

## Descripcion del Proyecto
Talatrivia, proyecto que busca que usuarios respondan preguntas de una trivia, donde cada pregunta correctamente respondida tiene un puntaje asignado

# Características
- usuarios: Se creó un crud para crear y listar usuarios.
- preguntas: Se creó un crud para crear y listar preguntas.
- respuestas: Se creó un crud para crear y listar respuestas.
- trivias: Se creó un crud para crear y listar trivias.
- agregar usuarios a trivias: se creó endpoint para agregar usuarios a las trivias.
- agregar preguntas a trivias: se creó endpoint para agregar preguntas a las trivias.
- respuesta de trivias: se creó endpoint para las respuestas a las preguntas de una trivia del usuario.
- ranking: se creó endpoint para ver resultados de puntaje para cada usuario que respondio una determinada trivia.

## Desarrollo
El proyecto sigue la estructura por defecto dada por Nestjs Cli:

``` bash
TALATRIVIA/
├── src/
│   └── entities/
├── modules/
│   ├── entity/
│   │   ├── entity.controller.ts
│   │   ├── entity.module.ts
│   │   └── entity.service.ts
└── app.modules.ts
└── main.ts
``` 

- `entities`: Contiene el modelo de las entidades principales del negocio.
- `modules`: Contiene la logica de cada entidad del negocio.
- `entity`: Contiene la logica de la entidad.
- `app.modules`: Archivo de módulo esencialmente agrupa todos los controladores y proveedores de su aplicación.
- `main`: Archivo de entrada de la aplicación tomará su paquete de módulos y creará una instancia de la aplicación utilizando el NestFactory proporcionado por Nest. 


## Recursos
Se disponibilisa una collection "talatrivia.collection.json" para ser importado en Postman, donde se tendrán todos los endpoint generados

## Iniciar Proyecto

```bash
# levanta proyecto api y base de datos postgresql
$ docker compose up --build

# cargar data inicial(opcional)
# Run endpoint para cargar la data inicial
$ http://localhost:3000/api/seed

```

## Run Endpoints

```bash
# si no se ha ejecutado endpoint de carga inicial de la data, se podrá cargar individualmente cada entidad

# usuarios
$ [POST] http://localhost:3000/api/users

# preguntas
$ [POST] http://localhost:3000/api/questions

# respuestas
$ [POST] http://localhost:3000/api/answers

# trivias
$ [POST] http://localhost:3000/api/quizes

# trivias asignar usuarios
$ [POST] http://localhost:3000/api/quizes/:id/add-users

# trivias asignar preguntas
$ [POST] http://localhost:3000/api/quizes/:id/add-questions

# para responder las trivias run endpoint
$ [POST] http://localhost:3000/api/quizes/:id/responses

# para ver los resultados del ranking
$ [POST] http://localhost:3000/api/quizes/:id/ranking
```

