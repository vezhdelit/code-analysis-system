import TokenItem from '@/components/features/linter/code-breakdown/token-item';
import { Button } from '@/components/ui/button';
import CollapsibleWithArrow from '@/components/ui/collapsible-with-arrow';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { FaCompressArrowsAlt, FaExpandArrowsAlt } from 'react-icons/fa';

// Component to render a node and its children
const ASTNode = ({ node }) => {
    // Determine the label for the node
    const label = node.type + (node.name ? `: ${node.name}` : '');

    return (
        <div className='ml-5 flex flex-col border-l border-gray-300 pl-2'>
            <strong className='text-blue-500'>
                {label}{' '}
                {node.loc && (
                    <span className='text-sm'>
                        ({node.loc.start.line}:{node.loc.start.column} - {node.loc.end.line}:
                        {node.loc.end.column})
                    </span>
                )}
            </strong>

            {node.id && (
                <div className='ml-5 border-l border-gray-300 pl-2 text-sm font-semibold text-gray-500 dark:text-gray-400'>
                    <span className='text-xs'> type: {node.id.type} </span>
                    <br />
                    <span className='text-xs'>name: {node.id.name}</span>
                </div>
            )}
            {node.init && (
                <div className='ml-5 mt-1 border-l border-gray-300 pl-2 text-sm font-semibold text-gray-500 dark:text-gray-400'>
                    <span className='text-xs'>type: {node.init.type} </span> <br />
                    <span className='text-xs'>value: {node.init.value}</span>
                </div>
            )}

            {node.kind && (
                <div className='text-xs font-semibold text-gray-500 dark:text-gray-400'>
                    kind: {node.kind}
                </div>
            )}

            {/* Recursively render children */}
            {Array.isArray(node.declarations) &&
                node.declarations.map((child, index) => <ASTNode node={child} key={index} />)}
            {Array.isArray(node.params) &&
                node.params.map((param, index) => <ASTNode node={param} key={index} />)}
            {Array.isArray(node.body) &&
                node.body.map((child, index) => <ASTNode node={child} key={index} />)}
        </div>
    );
};

// Main component to visualize the AST
const ASTTree = ({ ast }) => {
    const [selectedType, setSelectedType] = useState('minimize');
    const t = useTranslations('analysis');

    if (!ast) return null;

    return (
        <section className='flex flex-col'>
            <CollapsibleWithArrow
                showArrow={ast.body.length > 0}
                className='text-blue-500'
                header={
                    <h2 className='pl-2 text-base font-semibold'>
                        {t('labels.tokens')} ({ast.body.length})
                    </h2>
                }>
                <div className='relative'>
                    <Button
                        variant={'ghost'}
                        size={'sm'}
                        className='absolute right-0 top-0 text-blue-500'
                        onClick={() => {
                            setSelectedType(selectedType == 'minimize' ? 'expand' : 'minimize');
                        }}>
                        {selectedType == 'minimize' ? (
                            <FaExpandArrowsAlt />
                        ) : (
                            <FaCompressArrowsAlt />
                        )}
                    </Button>
                    {selectedType == 'minimize' ? (
                        <div className='flex flex-col rounded-md border border-blue-500/15 bg-blue-50 py-4 pr-1 text-blue-500 dark:bg-blue-500/15'>
                            <ASTNode node={ast} />
                        </div>
                    ) : (
                        <ul className='space-y-1'>
                            {
                                //eslint-disable-next-line @typescript-eslint/no-explicit-any
                                ast.body.map((token: any, index: number) => (
                                    <TokenItem key={index} token={token} />
                                ))
                            }
                        </ul>
                    )}
                </div>
            </CollapsibleWithArrow>
        </section>
    );
};

export default ASTTree;
