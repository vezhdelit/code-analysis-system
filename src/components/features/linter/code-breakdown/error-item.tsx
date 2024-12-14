//eslint-disable-next-line @typescript-eslint/no-explicit-any
const ErrorItem = ({ error }: { error: any }) => {
    return (
        <li className='flex flex-col rounded-md border border-red-500/10 bg-red-50 p-3 text-red-500 dark:bg-red-500/15'>
            <span className='text-xs font-semibold'>
                {error.lineNumber}:{error.index}
            </span>
            <p className='text-sm font-bold'>{error.description}</p>
        </li>
    );
};

export default ErrorItem;
