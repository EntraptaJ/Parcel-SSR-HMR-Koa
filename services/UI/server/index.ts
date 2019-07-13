import Koa from 'koa';
import Router from 'koa-router';
import serve from 'koa-static';
import uiServer from './uiServer'

const port = 81;


const startServer = async () => {
  const server = new Koa();
  const router = new Router();

  const publicDir = 'dist/public'
  router.get('*', serve(publicDir));

  router.get('*', uiServer);


  server.use(router.routes()).use(router.allowedMethods());

  server.listen(port, () => console.log(`Server listening on port ${port}`));
};


startServer();

