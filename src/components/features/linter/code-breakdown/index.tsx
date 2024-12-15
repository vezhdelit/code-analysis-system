import CommentsSection from '@/components/features/linter/code-breakdown/comments-section';
import ErrorSection from '@/components/features/linter/code-breakdown/errors-section';
import VulnerabilitiesSection from '@/components/features/linter/code-breakdown/vulnerabilities-section';
import ASTTree from '@/components/ui/ast-tree';
//eslint-disable-next-line @typescript-eslint/no-explicit-any
const CodeBreakdown = ({ analysis }: { analysis: any }) => {
    if (!analysis) return null;
    return (
        <div className='flex flex-col gap-2 font-sans'>
            <ASTTree ast={analysis} />
            {/* <TokensSection tokens={analysis.body} /> */}
            <CommentsSection comments={analysis.comments} />
            <ErrorSection errors={analysis.errors} />
            <VulnerabilitiesSection vulnerabilities={analysis.vulnerabilities} />
        </div>
    );
};

export default CodeBreakdown;
