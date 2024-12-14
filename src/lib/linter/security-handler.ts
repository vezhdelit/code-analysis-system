export interface SecurityLocation {
    start: {
        line: number;
        column: number;
    };
    end: {
        line: number;
        column: number;
    };
}

export interface SecurityVulnerability {
    type: string;
    description: string;
    range?: [number, number];
    loc?: SecurityLocation;
}

export class SecurityHandler {
    readonly vulnerabilities: SecurityVulnerability[];

    constructor() {
        this.vulnerabilities = [];
    }

    recordVulnerability(
        type: string,
        description: string,
        range?: [number, number],
        loc?: SecurityLocation
    ): void {
        this.vulnerabilities.push({
            type,
            description,
            range,
            loc,
        });
    }

    // Check for eval usage
    visitEval(node: any, metadata: any): void {
        if (
            node.type === 'CallExpression' &&
            node.callee.type === 'Identifier' &&
            node.callee.name === 'eval'
        ) {
            this.recordVulnerability(
                'eval-usage',
                'Detected use of eval() which can lead to code injection vulnerabilities',
                metadata.range,
                metadata.loc
            );
        }
    }

    // Check for innerHTML
    visitInnerHTML(node: any, metadata: any): void {
        if (
            node.type === 'AssignmentExpression' &&
            node.left.type === 'MemberExpression' &&
            node.left.property.name === 'innerHTML'
        ) {
            this.recordVulnerability(
                'innerHTML-usage',
                'Use of innerHTML can lead to XSS vulnerabilities',
                metadata.range,
                metadata.loc
            );
        }
    }

    // Check for sensitive data
    visitIdentifier(node: any, metadata: any): void {
        const sensitivePatterns = [/password/i, /token/i, /secret/i, /key/i, /credential/i];

        if (node.type === 'VariableDeclarator' || node.type === 'Property') {
            const name = node.id?.name || node.key?.name;
            if (name && sensitivePatterns.some(pattern => pattern.test(name))) {
                this.recordVulnerability(
                    'sensitive-data',
                    'Potential sensitive data exposure detected',
                    metadata.range,
                    metadata.loc
                );
            }
        }
    }

    visit(node: any, metadata: any): void {
        this.visitEval(node, metadata);
        this.visitInnerHTML(node, metadata);
        this.visitIdentifier(node, metadata);
    }
}
