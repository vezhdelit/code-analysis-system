'use client';
import VulnerabilityItem from '@/components/features/linter/code-breakdown/vulnerability-item';
import CollapsibleWithArrow from '@/components/ui/collapsible-with-arrow';
import { useTranslations } from 'next-intl';

// {
//     "type": "sensitive-data",
//     "description": "Potential sensitive data exposure detected",
//     "range": [
//       30,
//       49
//     ],
//     "loc": {
//       "start": {
//         "line": 3,
//         "column": 6
//       },
//       "end": {
//         "line": 3,
//         "column": 25
//       }
//     }
//   }
//   {
//     "type": "eval-usage",
//     "description": "Detected use of eval() which can lead to code injection vulnerabilities",
//     "range": [
//       52,
//       72
//     ],
//     "loc": {
//       "start": {
//         "line": 4,
//         "column": 0
//       },
//       "end": {
//         "line": 4,
//         "column": 20
//       }
//     }
//   }
//   {
//     "type": "sensitive-data",
//     "description": "Potential sensitive data exposure detected",
//     "range": [
//       131,
//       186
//     ],
//     "loc": {
//       "start": {
//         "line": 6,
//         "column": 6
//       },
//       "end": {
//         "line": 6,
//         "column": 61
//       }
//     }
//   }

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const VulnerabilitiesSection = ({ vulnerabilities }: { vulnerabilities: any }) => {
    const t = useTranslations('analysis');

    if (!vulnerabilities) return null;
    return (
        <section className='flex flex-col'>
            <CollapsibleWithArrow
                showArrow={vulnerabilities.length > 0}
                className='text-yellow-500'
                header={
                    <h2 className='pl-2 text-base font-semibold'>
                        {t('labels.vulnerabilities')} ({vulnerabilities.length})
                    </h2>
                }>
                <ul className='space-y-1'>
                    {
                        //eslint-disable-next-line @typescript-eslint/no-explicit-any
                        vulnerabilities.map((vulnerability: any, index: number) => (
                            <VulnerabilityItem key={index} vulnerability={vulnerability} />
                        ))
                    }
                </ul>
            </CollapsibleWithArrow>
        </section>
    );
};

export default VulnerabilitiesSection;
