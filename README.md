# Simple Node App

A simple blog project to learn the basics of the MERN stack. This is the frontend repo. [You can find the backend repo here](https://github.com/RenanFelipeAndrade/MERN-backend)

## Requirements

To run in a docker container

- Docker
- Docker-Compose

To run outside a container

- Node - version 16
- Mongodb - version 6
- Node Package Manager (npm) - version 8

## Running with docker

Put both repos side by side in a structure similar to this:

```
directory
|
---- frontend
|
---- backend
```

Then, inside of back or frontend directory, start conteiners with:

```
docker-compose up
```

Done. Now access it via [localhost:3000](http://localhost:3000) through the browser

## Running with npm

Install the dependencies of both, front and backend, with:

```
npm install
```

### Frontend

After installing, run:

```
npm run dev
```

### Backend

After installing, run:

```
npm run start
```

And you're ready to go. Backend will be running at the port 8000. Frontend will be running at the port 3000.
