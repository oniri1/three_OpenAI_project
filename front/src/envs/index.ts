const env: { [key: string]: string | undefined } = {
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  AIUrl: process.env.NEXT_PUBLIC_AI_URL,
};

Object.entries(env).forEach(([key, value]) => {
  if (value === undefined) {
    throw new Error(`${key} is ${value}`);
  }
});

export default env;
