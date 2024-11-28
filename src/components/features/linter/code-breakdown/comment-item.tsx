//eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export default CommentItem;
