import { makeRouteHandler } from '@keystatic/next/route-handler';
import keystaticConfig from '../../../../keystatic.config';

const handlers = makeRouteHandler({
  config: keystaticConfig,
});

export const GET = process.env.NODE_ENV === 'development' ? handlers.GET : undefined;
export const POST = process.env.NODE_ENV === 'development' ? handlers.POST : undefined;
