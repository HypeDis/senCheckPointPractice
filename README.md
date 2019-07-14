## React Boiler Two

This was originally built in class as part of a demo. It has been polished since. It isn't really anything special. We were attempting to avoid writing a webpack config, and keeping the babel very minimal. So this boiler has even less fancy JS available then the previous one.

### Folder Structure

Client and Server are separated into directories. Things tend to be well organized. Redux could be better organized but it feels premature at this point.

### .env

As we head closer to deploying these apps to the real internet, we need to hide some information that is private to us. We can do this by injecting data in the environment. When we deploy to certain environments, it will be able to inject it on its own. Sometimes we need to inject it manually. Either way, in development on our own machines we should get used to this. So here the expectation is that we will write a .env file that specifies these pieces of data.

`.env` in the root directory of your project:
```dotenv
DO_SEED=true
FORCE_DB_REFRESH=true
PORT=3000
DB_NAME=boiler
```

These things should be set accordingly. Obviously, "boiler" is not a good name for a DB. Set it to an appropriate name and then create that DB on your local machine.

### Usage

- `start:client`: Start client in watch mode for development.

- `start:server`: Start server with nodemon in watch mode.

- `dev`: Start both client and server being watched in development.

- `start`: **PRODUCTION COMMAND - builds the client for production, and starts a normal node server to run it. Not hot. Not for local development.**


