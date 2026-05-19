import { renderToString } from "react-dom/server";
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from "react-router-dom";
import { appRoutes } from "./routes";
import { siteConfig } from "./seo/site";

export const renderRoute = async (path) => {
  const handler = createStaticHandler(appRoutes);
  const request = new Request(`${siteConfig.siteUrl}${path}`);
  const context = await handler.query(request);

  if (context instanceof Response) {
    throw new Error(`Unexpected response while rendering ${path}: ${context.status}`);
  }

  const router = createStaticRouter(handler.dataRoutes, context);
  return renderToString(<StaticRouterProvider router={router} context={context} hydrate={false} />);
};
