const ProgramAnalysis = ({ analysis }: { analysis: any }) => {
    if (!analysis) return null;
    return (
        <div className='flex flex-col gap-2 bg-gray-100 font-sans'>
            <TokensSection tokens={analysis.tokens.body} />
            <CommentsSection comments={analysis.tokens.comments} />
            <ErrorSection errors={analysis.tokens.errors} />
        </div>
    );
};

export default ProgramAnalysis;

const TokensSection = ({ tokens }: { tokens: any }) => {
    if (!tokens) return null;
    return (
        <section className='flex flex-col'>
            <h2 className='pl-2 text-base font-semibold text-blue-500'>Tokens ({tokens.length})</h2>
            <ul className='space-y-1'>
                {tokens.map((token, index) => (
                    <TokenItem key={index} token={token} />
                ))}
            </ul>
        </section>
    );
};

const TokenItem = ({ token }: { token: any }) => {
    // Helper function to render nested properties
    const renderNested = (key: string, value: any) => {
        if (Array.isArray(value)) {
            return (
                <ul className='pl-4'>
                    {value.map((item, index) => {
                        if (typeof item === 'object' && item !== null) {
                            return (
                                <li key={index}>
                                    <TokenItem token={item} />
                                </li>
                            );
                        } else {
                            return (
                                <li key={index}>
                                    <span>{String(item)}</span>
                                </li>
                            );
                        }
                    })}
                </ul>
            );
        }
        if (typeof value === 'object' && value !== null) {
            return (
                <div className='pl-4'>
                    {Object.entries(value).map(([nestedKey, nestedValue], index) => (
                        <div key={index}>
                            <strong>{nestedKey}:</strong> {renderNested(nestedKey, nestedValue)}
                        </div>
                    ))}
                </div>
            );
        }
        return <span>{String(value)}</span>;
    };

    return (
        <li className='flex flex-col rounded-md border border-blue-500/15 bg-blue-50 px-3 py-2 text-blue-500'>
            <h3 className='text-sm font-bold'>{token.type}</h3>
            <div className='text-xs'>
                {Object.entries(token).map(([key, value]) => {
                    // Skip the "type" key as it's already displayed in the header
                    if (key === 'type') return null;

                    return (
                        <div key={key}>
                            <strong>{key}:</strong> {renderNested(key, value)}
                        </div>
                    );
                })}
            </div>
        </li>
    );
};

const CommentsSection = ({ comments }: { comments: any }) => {
    if (!comments) return null;
    return (
        <section className='flex flex-col'>
            <h2 className='pl-2 text-base font-semibold text-green-500'>
                Comments ({comments.length})
            </h2>
            <ul className='space-y-1'>
                {comments.map((comment, index) => (
                    <CommentItem key={index} comment={comment} />
                ))}
            </ul>
        </section>
    );
};

const CommentItem = ({ comment }: { comment: any }) => {
    return (
        <li className='flex flex-col rounded-md border border-green-500/15 bg-green-50 px-3 py-2 text-green-500'>
            <span className='text-xs font-semibold'>
                {comment.loc.start.line}:{comment.loc.start.column} - {comment.loc.end.line}:
                {comment.loc.end.column}
            </span>
            <p className='text-sm font-bold'>{comment.value}</p>
        </li>
    );
};

const ErrorSection = ({ errors }: { errors: any }) => {
    if (!errors) return null;
    return (
        <section className='flex flex-col'>
            <h2 className='pl-2 text-base font-semibold text-red-500'>Errors ({errors.length})</h2>
            <ul className='space-y-1'>
                {errors.map((error, index) => (
                    <ErrorItem key={index} error={error} />
                ))}
            </ul>
        </section>
    );
};

const ErrorItem = ({ error }: { error: any }) => {
    return (
        <li className='flex flex-col rounded-md border border-red-500/10 bg-red-50 p-3 text-red-500'>
            <span className='text-xs font-semibold'>
                {error.lineNumber}:{error.index}
            </span>
            <p className='text-sm font-bold'>{error.description}</p>
        </li>
    );
};
