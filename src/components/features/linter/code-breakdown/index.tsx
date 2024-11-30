import CommentsSection from '@/components/features/linter/code-breakdown/comments-section';
import ErrorSection from '@/components/features/linter/code-breakdown/errors-section';
import TokensSection from '@/components/features/linter/code-breakdown/tokens-section';
//eslint-disable-next-line @typescript-eslint/no-explicit-any
const CodeBreakdown = ({ analysis }: { analysis: any }) => {
    if (!analysis) return null;
    return (
        <div className='flex flex-col gap-2 bg-gray-100 font-sans'>
            <TokensSection tokens={analysis.body} />
            <CommentsSection comments={analysis.comments} />
            <ErrorSection errors={analysis.errors} />
        </div>
    );
};

export default CodeBreakdown;
