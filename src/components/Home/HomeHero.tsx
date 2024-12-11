// 'use client';
// import { gql, useQuery } from '@apollo/client';
// import Image from 'next/image';
// import {
//   getFontSizeForHeading,
//   getTextAlign,
//   HeadingLevel,
//   TextAlign,
// } from '@/utils/fonts';

// interface BlockAttributes {
//   url?: string;
//   width?: number;
//   height?: number;
//   content?: string;
// }

// interface InnerBlock {
//   attributes?: {
//     content?: string;
//     textAlign?: string;
//     level?: number;
//   };
// }

// interface Block {
//   attributes?: BlockAttributes;
//   innerBlocks?: InnerBlock[];
// }

// // Тип для результата GraphQL-запроса
// interface HomePageData {
//   nodeByUri?: {
//     id: string;
//     blocks: Block[];
//   };
// }

// const GET_HOMEPAGE_BLOCKS = gql`
//   query GetHomePageBlocks {
//     nodeByUri(uri: "/") {
//       ... on Page {
//         id
//         blocks(postTemplate: false)
//       }
//     }
//   }
// `;

// const HomeHero = () => {
//   const { data, loading, error } = useQuery<HomePageData>(GET_HOMEPAGE_BLOCKS);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   console.log(data?.nodeByUri?.blocks);
//   return (
//     <div>
//       <ul>
//         {data?.nodeByUri?.blocks?.map((block, index) => {
//           const { attributes, innerBlocks } = block;

//           // Извлекаем все атрибуты из innerBlocks
//           const innerBlockData =
//             innerBlocks?.map((innerBlock) => innerBlock?.attributes) || [];

//           return (
//             <li key={index}>
//               <div>
//                 {attributes?.url && (
//                   <Image
//                     src={attributes.url}
//                     width={attributes.width || 600}
//                     height={attributes.height || 400}
//                     alt="Block content"
//                     priority
//                   />
//                 )}
//                 {innerBlockData.length > 0 && (
//                   <div>
//                     {innerBlockData.map((attributes, i) => (
//                       <div key={i}>
//                         {attributes?.content && (
//                           <h1
//                             className={`max-w-5xl mx-auto ${getTextAlign(attributes?.textAlign as TextAlign)} ${getFontSizeForHeading(attributes?.level as HeadingLevel)}`}
//                           >
//                             {attributes.content}
//                           </h1>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default HomeHero;
