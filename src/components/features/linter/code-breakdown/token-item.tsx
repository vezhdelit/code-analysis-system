//eslint-disable-next-line @typescript-eslint/no-explicit-any
const TokenItem = ({ token }: { token: any }) => {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderNested = (_: string, value: any) => {
        if (Array.isArray(value)) {
            return (
                <ul className='pl-4'>
                    {value.map((item, index) => {
                        if (typeof item === 'object' && item !== null) {
                            return <TokenItem key={index} token={item} />;
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
        <li className='flex flex-col rounded-md border border-blue-500/15 bg-blue-50 px-3 py-2 text-blue-500 dark:bg-blue-500/15'>
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

export default TokenItem;
