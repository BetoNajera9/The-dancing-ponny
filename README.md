# The dancing ponny

## 🎯 Objective

Your assignment is to implement a restaurant **REST API** using TypeScript, Node and no framework.

## 📝 Brief

Frogo Baggins, a hobbit from the Shire, has a great idea. He wants to build a restaurant that serves traditional dishes from the world of Middle Earth. The restaurant will be called "The Dancing Pony" and will have a cozy atmosphere.

Frogo has hired you to build the website for his restaurant. As payment, he has offered you either a chest of gold or a ring. Choose wisely.

## 🚀 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### 📋 Prerequisites

#### .env file

It is necessary to mention that the service needs [environment](.env.template) variables which are very necessary for the operation of the service.

#### Database

For the database, we chose to use a local database by means of [docker compose](docker-compose.yml)

To up the containers simply use the following command in the api folder

```shell
cd api
docker compose up -d
```

### Installation 🔧

To install the dependencies of the service simply use the following command

```shell
npm install
```

### ⚙️ Running the tests

To perform the tests we use the jest and supertes library.

To run the tests, the following command must be executed

```shell
npm run test
```

### Running 🆙

Depending on the environment, it is recommended to initialize the project.

- Dev
  ```shell
  npm run dev
  ```
- Prod
  ```shell
  npm run build
  npm run start
  ```

## Documentation 📄

Postman [documentation](https://www.postman.com/betonajera9/workspace/the-dancing-ponny/collection/19529496-337f737d-6a4a-43e0-afa4-31fe8dd81976?action=share&creator=19529496) was created in order to test the API.

## 📦 Deployment

The API is currently hosted at [the-dancing-ponny-production.up.railway.app](https://the-dancing-ponny-production.up.railway.app/), where it's serving requests around the clock. As the sole architect and developer, I've ensured that the deployment process is streamlined and the service is robust and user-friendly.

### Deployment Features:

- **Always On**: The service is up and running 24/7, ready to serve your requests at any time.
- **Ease of Use**: Designed with simplicity in mind, making it straightforward to integrate with your applications.
- **Reliability**: Consistent and dependable performance, providing a seamless experience for all users.
- **Solo Craftsmanship**: Every line of code has been written with care and a deep understanding of the needs it serves.

To start using the API, simply direct your HTTP requests to the provided endpoints and you're good to go. It's my commitment to provide a service that not only meets but exceeds your expectations.



## Built with 🛠️

- [NodeJS](https://nodejs.org/en) - The JavaScript runtime used in api service
- [Npm](https://www.npmjs.com/) - Dependency handler
- [MongoDB](https://www.mongodb.com/) - Database
- [Typescript](https://www.typescriptlang.org/) - Language

## Author ✒️

- **Roberto Miron Najera** - _Initial Work_ - [betonajera9](https://github.com/villanuevand)

## License 📄

This project is under the (MIT) License - see the [LICENSE](LICENSE) file for details.

---

⌨️ with ❤️ by [betonajera](https://github.com/BetoNajera9) 😊
