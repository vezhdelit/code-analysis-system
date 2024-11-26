import { HTTP_STATUS_CODES } from '@/enums/server';
import { parse, tokenize } from '@/lib/linter';
import type { ParseCodeRoute, TokenizeCodeRoute } from '@/server/routes/linter/linter.routes';
import type { OpenAPIHonoRouteHandler } from '@/server/types';

export const tokenizeCode: OpenAPIHonoRouteHandler<TokenizeCodeRoute> = async c => {
    const { code, config } = c.req.valid('json');
    const tokens = tokenize(code, config, null);

    return c.json({ tokens }, HTTP_STATUS_CODES.OK);
};

export const parseCode: OpenAPIHonoRouteHandler<ParseCodeRoute> = async c => {
    const { code, config } = c.req.valid('json');
    const tokens = parse(code, config, null);

    return c.json({ tokens }, HTTP_STATUS_CODES.OK);
};
