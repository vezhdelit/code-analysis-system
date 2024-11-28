import { HTTP_STATUS_CODES } from '@/enums/server';
import { parse, tokenize } from '@/lib/linter';
import { db } from '@/server/db';
import { codes, projects, results } from '@/server/db/schema';
import type {
    AnalyzeCodeRoute,
    GetCodeAnalysisResultsRoute,
} from '@/server/routes/analysis/analysis.routes';
import type { OpenAPIHonoRouteHandler } from '@/server/types';
import { and, eq } from 'drizzle-orm';

export const analyzeCode: OpenAPIHonoRouteHandler<AnalyzeCodeRoute> = async c => {
    const { analysisType, config } = c.req.valid('json');
    const { codeId, projectId } = c.req.valid('param');

    const user = c.get('user')!;
    const userId = user.id;

    const project = await db.query.projects.findFirst({
        where: and(eq(projects.id, projectId), eq(projects.userId, userId)),
    });
    if (!project) {
        return c.json({ message: 'Project not found.' }, HTTP_STATUS_CODES.NOT_FOUND);
    }

    const code = await db.query.codes.findFirst({
        where: and(eq(codes.id, codeId), eq(codes.projectId, projectId)),
    });
    if (!code) {
        return c.json({ message: 'Code not found.' }, HTTP_STATUS_CODES.NOT_FOUND);
    }

    // Example analysis logic
    const analysisResult =
        analysisType === 'tokenize'
            ? tokenize(code.content, config, null)
            : parse(code.content, config, null);

    const exist = await db.query.results.findFirst({
        where: and(
            eq(results.codeId, codeId),
            eq(results.projectId, projectId),
            eq(results.analysisType, analysisType)
        ),
    });

    if (exist) {
        const [updated] = await db
            .update(results)
            .set({
                resultData: JSON.stringify(analysisResult),
            })
            .where(eq(results.id, exist.id))
            .returning();

        return c.json(updated, HTTP_STATUS_CODES.OK);
    }

    const [created] = await db
        .insert(results)
        .values({
            analysisType,
            resultData: JSON.stringify(analysisResult),
            codeId,
            projectId,
        })
        .returning();

    return c.json(created, HTTP_STATUS_CODES.CREATED);
};

export const getCodeAnalysisResults: OpenAPIHonoRouteHandler<
    GetCodeAnalysisResultsRoute
> = async c => {
    const { codeId, projectId } = c.req.valid('param');

    const user = c.get('user')!;
    const userId = user.id;

    const project = await db.query.projects.findFirst({
        where: and(eq(projects.id, projectId), eq(projects.userId, userId)),
    });
    if (!project) {
        return c.json({ message: 'Project not found.' }, HTTP_STATUS_CODES.NOT_FOUND);
    }

    const code = await db.query.codes.findFirst({
        where: and(eq(codes.id, codeId), eq(codes.projectId, projectId)),
    });
    if (!code) {
        return c.json({ message: 'Code not found.' }, HTTP_STATUS_CODES.NOT_FOUND);
    }

    const result = await db.query.results.findFirst({
        where: and(eq(results.codeId, codeId), eq(results.projectId, projectId)),
    });
    if (!result) {
        return c.json({ message: 'Analysis result not found.' }, HTTP_STATUS_CODES.NOT_FOUND);
    }

    return c.json(result, HTTP_STATUS_CODES.OK);
};
