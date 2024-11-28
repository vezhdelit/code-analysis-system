import TokenItem from '@/components/features/linter/code-breakdown/token-item';
import CollapsibleWithArrow from '@/components/ui/collapsible-with-arrow';
//eslint-disable-next-line @typescript-eslint/no-explicit-any
const TokensSection = ({ tokens }: { tokens: any }) => {
    if (!tokens) return null;
    return (
        <section className='flex flex-col'>
            <CollapsibleWithArrow
                showArrow={tokens.length > 0}
                className='text-blue-500'
                header={<h2 className='pl-2 text-base font-semibold'>Tokens ({tokens.length})</h2>}>
                <ul className='space-y-1'>
                    {
                        //eslint-disable-next-line @typescript-eslint/no-explicit-any
                        tokens.map((token: any, index: number) => (
                            <TokenItem key={index} token={token} />
                        ))
                    }
                </ul>
            </CollapsibleWithArrow>
        </section>
    );
};

export default TokensSection;
