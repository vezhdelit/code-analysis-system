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

export class SecurityAnalyzer {
    private vulnerabilities: SecurityVulnerability[] = [];

    // Check for eval usage which can lead to code injection
    checkEvalUsage(node: any, range: [number, number], loc: SecurityLocation) {
        if (
            node.type === 'CallExpression' &&
            node.callee.type === 'Identifier' &&
            node.callee.name === 'eval'
        ) {
            this.addVulnerability({
                type: 'eval-usage',
                description:
                    'Detected use of eval() which can lead to code injection vulnerabilities',
                range,
                loc,
            });
        }
    }

    // Check for innerHTML usage which can lead to XSS
    checkInnerHTML(node: any, range: [number, number], loc: SecurityLocation) {
        if (
            node.type === 'AssignmentExpression' &&
            node.left.type === 'MemberExpression' &&
            node.left.property.name === 'innerHTML'
        ) {
            this.addVulnerability({
                type: 'innerHTML-usage',
                description: 'Use of innerHTML can lead to XSS vulnerabilities',
                range,
                loc,
            });
        }
    }

    // Check for potentially sensitive data exposure
    checkSensitiveData(node: any, range: [number, number], loc: SecurityLocation) {
        const sensitivePatterns = [/password/i, /token/i, /secret/i, /key/i, /credential/i];

        if (node.type === 'VariableDeclarator' || node.type === 'Property') {
            const name = node.id?.name || node.key?.name;
            if (name && sensitivePatterns.some(pattern => pattern.test(name))) {
                this.addVulnerability({
                    type: 'sensitive-data',
                    description: 'Potential sensitive data exposure detected',
                    range,
                    loc,
                });
            }
        }
    }

    private addVulnerability(vulnerability: SecurityVulnerability) {
        this.vulnerabilities.push(vulnerability);
    }

    getVulnerabilities(): SecurityVulnerability[] {
        return this.vulnerabilities;
    }

    clear() {
        this.vulnerabilities = [];
    }
}
