// API/src/index.ts
// KristianFJones <me@kristianjones.xyz>
import 'reflect-metadata';
import Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';
import { buildAPISchema } from './API'

const startAPI = async () => {
  const apiServer = new ApolloServer({ schema: await buildAPISchema(), introspection: true });
  const webServer = new Koa();

  webServer.listen(80);

  apiServer.applyMiddleware({ app: webServer });
  console.log('Server Started')
}

startAPI()
