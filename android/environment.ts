interface IEnvironment {
  BACKEND_URL: string;
}

export const _Environments: {[key: string]: IEnvironment} = {
  development: {
    BACKEND_URL: '',
  },
  staging: {
    BACKEND_URL: '',
  },
  production: {
    BACKEND_URL: '',
  },
};
export function getEnvironment(): IEnvironment {
  // @ts-ignore
  const env: string = process.env.NODE_ENV;
  // Insert logic here to get the current platform (e.g. staging, production, etc)
  console.log('Active env:', env);
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
