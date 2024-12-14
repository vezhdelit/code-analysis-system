// @ts-nocheck

import { CommentHandler } from './comment-handler';
import { JSXParser } from './jsx-parser';
import { Parser } from './parser';
import { Tokenizer } from './tokenizer';

export function parse(code: string, options, delegate) {
    let commentHandler: CommentHandler | null = null;
    const proxyDelegate = (node, metadata) => {
        if (delegate) {
            delegate(node, metadata);
        }
        if (commentHandler) {
            commentHandler.visit(node, metadata);
        }
    };

    let parserDelegate = typeof delegate === 'function' ? proxyDelegate : null;
    let collectComment = false;
    if (options) {
        collectComment = typeof options.comment === 'boolean' && options.comment;
        const attachComment = typeof options.attachComment === 'boolean' && options.attachComment;
        if (collectComment || attachComment) {
            commentHandler = new CommentHandler();
            commentHandler.attach = attachComment;
            options.comment = true;
            parserDelegate = proxyDelegate;
        }
    }

    let isModule = false;
    if (options && typeof options.sourceType === 'string') {
        isModule = options.sourceType === 'module';
    }

    let parser: Parser;
    if (options && typeof options.jsx === 'boolean' && options.jsx) {
        parser = new JSXParser(code, options, parserDelegate);
    } else {
        parser = new Parser(code, options, parserDelegate);
    }

    const program = isModule ? parser.parseModule() : parser.parseScript();
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ast = program as any;

    if (collectComment && commentHandler) {
        ast.comments = commentHandler.comments;
    }
    if (parser.config.tokens) {
        ast.tokens = parser.tokens;
    }
    if (parser.config.tolerant) {
        ast.errors = parser.errorHandler.errors;
    }

    ast.vulnerabilities = parser.securityAnalyzer.getVulnerabilities();

    return ast;
}

export function parseModule(code: string, options, delegate) {
    const parsingOptions = options || {};
    parsingOptions.sourceType = 'module';
    return parse(code, parsingOptions, delegate);
}

export function parseScript(code: string, options, delegate) {
    const parsingOptions = options || {};
    parsingOptions.sourceType = 'script';
    return parse(code, parsingOptions, delegate);
}

export function tokenize(code: string, options, delegate) {
    const tokenizer = new Tokenizer(code, options);
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tokens: any = [];

    try {
        while (true) {
            let token = tokenizer.getNextToken();
            if (!token) {
                break;
            }
            if (delegate) {
                token = delegate(token);
            }
            tokens.push(token);
        }
    } catch (e) {
        tokenizer.errorHandler.tolerate(e);
    }

    if (tokenizer.errorHandler.tolerant) {
        tokens.errors = tokenizer.errors();
    }

    return tokens;
}

export { Syntax } from './syntax';

// Sync with *.json manifests.
export const version = '4.0.0-dev';
