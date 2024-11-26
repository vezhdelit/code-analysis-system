import { createRouter } from "../../app";
import * as handlers from "./linter.handlers";
import * as routes from "./linter.routes";

const linterRouter = createRouter()
	.openapi(routes.tokenizeCode, handlers.tokenizeCode)
	.openapi(routes.parseCode, handlers.parseCode);

export default linterRouter;
