import { createRouter } from '@/server/app';
import * as handlers from './analysis.handlers';
import * as routes from './analysis.routes';

const analysisRouter = createRouter()
    .openapi(routes.analyzeCode, handlers.analyzeCode)
    .openapi(routes.getCodeAnalysisResults, handlers.getCodeAnalysisResults);

export default analysisRouter;
