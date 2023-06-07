# praktikum-2

Repository for the Second Praktikum for FERI, containing the Shopping list application

# Repo structure

This mono-repo contains all needed services for running the application and its depending services locally.
Among the main SpringBoot **backend** service located in _app/backend_, the _app/_ folder additionally contains the *
*Angular web interface** (_app/web-app_),
as well as **OpenAi** service needed for the application to process data.

## Prerequisites:

Before running the application(s), make sure you have installed and set up JDK v.17 (any publisher will do),
as well as either **npm** or **yarn** package managers for initializing the OpenAi service and Angular web interface,
as well as the Android application.

The IDE choice is left up to the user.

Optionally, for running the application and its services in a container, make sure you have Docker installed.

## Configuration files

Every service comes with its own configuration file. Here are the templates listed that you need to get yourself started:

### Backend
### `backend/src/main/resources/application.properties`
````
spring.data.mongodb.authentication-database=AUTH_DB
spring.data.mongodb.username=USER_NAME
spring.data.mongodb.password=USER_PASSWORD
spring.data.mongodb.database=DATABASE
spring.data.mongodb.port=MONGO_PORT
spring.data.mongodb.host=MONGO_HOST
spring.data.mongodb.auto-index-creation=true
jwt.secret=YOUR_SECRET
expiration=TOKEN_EXPIRATION_MS
refresh.token.expiration=REFRESH_TOKEN_EXPIRATION_MS
app.jwttoken.message=SECRET_MESSAGE
spring.mail.host=MAIL_SERVER_HOST
spring.mail.port=MAIL_SERVER_PORT
spring.mail.username=MAIL_ADDRESS
spring.mail.password=MAIL_PASSWORD
spring.mail.properties.mail.smtp.auth=IS_SMTP_AUTH
spring.mail.properties.mail.smtp.starttls.enable=IS_STARTTLS_ENABLED
openai-url=OPENAI_SERVICE_URL
spring.servlet.multipart.max-file-size=MAX_UPLOAD_SIZE
spring.servlet.multipart.max-request-size=MAX_REQUEST_SIZE
server.cors=ANGULAR_URL
````
### OpenAI service
### `app/services/openai-service/.env`
````
OPENAI_API_KEY=OPENAI_KEY
DB_HOST=MONGO_HOST
DB_PORT=MONGO_PORT
DB_NAME=MONGO_OPENAI_DB_NAME
DB_USERNAME=MONGO_NAME
DB_PASSWORD=MONGO_PASSWORD
````

### Angular
### `app/web-app/environment.ts`
````
export const environment = {
   apiBaseUrl: BACKEND_URL,
};
````

### Android
### `android/environment.ts`
```
interface IEnvironment {
  BACKEND_URL: string;
  OPENAI_URL: string;
}

export const IP_ADD = LOCAL_NETWORK_IP_ADD;
export const _Environments: {[key: string]: IEnvironment} = {
  development: {
    BACKEND_URL: `${IP_ADD}:BACKEND_PORT/api`,
    OPENAI_URL: `${IP_ADD}:BACKEND_PORT/api/uploads`,
  },
  staging: {
    BACKEND_URL: `${IP_ADD}:BACKEND_PORT/api`,
    OPENAI_URL: `${IP_ADD}:BACKEND_PORT/api/uploads`,
  },
  production: {
    BACKEND_URL: `${IP_ADD}:BACKEND_PORT/api`,
    OPENAI_URL: `${IP_ADD}:BACKEND_PORT/api/uploads`,
  },
};

export function getEnvironment(): IEnvironment {
  // @ts-ignore
  const env: string = process.env.NODE_ENV;
  // Insert logic here to get the current platform (e.g. staging, production, etc)
  // ...now return the correct environment
  if (Object.keys(_Environments).includes(env)) {
    return _Environments[env];
  } else {
    console.error(
      `[FATAL]: Environment ${env} not in supported list of environments`,
    );
    return _Environments.development;
  }
}

export const Environment: IEnvironment = getEnvironment();
```


## Getting started (Docker)

Follow the steps below to setup project up and running:

1. Clone this repository to your local machine using git clone
2. Navigate to your project directory
3. Run docker compose up --build inside the app directory

## Getting started (Manual installation)

As mentioned before, the application consists of several moving parts, which can be launched separately for testing in
modification.
Before getting started, do keep in mind that some services **have** to be run so the others can function properly.
(Backend depends on OpenAI, Android and Web depend on Backend)

All the following steps assume that you have successfully cloned the git repository as if you were to run the
application via Docker.

### Android

1. After opening the root folder, run `cd android && npx react-native start`.
2. If you don't have React Native installed, install it by confirming the pop-up prompt.
3. After starting up Metro, press `a` on the keyboard, to run React Native on Android.
   If you want to run the application via emulators, open up Android Studio and start up the emulator of your choice.
4. After some build time, the application will get installed on your device, and you can use the application freely.

### Web
1. Navigate to `app/web-app` folder from the root directory of the project
2. After navigating there, in your terminal window type `npm install && npm run start`
3. The Angular application should start

### OpenAI service
1. Navigate to `app/services/openai-service` folder from the root directory of the project
2. After navigating there, in your terminal window type `npm install && npm run start`
3. The Nest.js application should start

### Backend

1. Via the IDE of your choice (we recommend IntelliJ), open and navigate to the `app/backend` folder.
2. After opening the folder, configure your run configuration as if you would any other SpringBoot application.
3. Press run to start the app in your IDE.

# Service expansion
The app is open to be used by anyone, however they please. 

The given services (OpenAI mainly) are interchangeable, as long as the data is properly formatted and parsed.