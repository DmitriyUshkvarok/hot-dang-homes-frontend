import { BlockRenderer } from '@/components/BlockRender/BlockRender';
import { cleanAndTransformBlocks } from '@/utils/cleanAndTransformBlocks';
import { gql } from '@apollo/client';
import { getClient } from '@/lib/client';

const GET_HOME_BLOCKS = gql`
  query GetHomeBlocks {
    pageBy(uri: "/") {
      ... on Page {
        id
        blocks(postTemplate: false)
        seo {
          metaDesc
          title
        }
      }
    }
  }
`;

// Функция для получения данных
async function fetchHomeData() {
  const client = getClient();
  const { data } = await client.query({ query: GET_HOME_BLOCKS });
  return data?.pageBy || {};
}

export async function generateMetadata() {
  const pageData = await fetchHomeData();
  const seo = pageData.seo || {};
  console.log('seo', seo);

  return {
    title: seo.title || 'Default Title',
    description: seo.metaDesc || 'Default description',
  };
}

export default async function Home() {
  const pageData = await fetchHomeData();
  const blocks = pageData.blocks || [];
  const blocksWithIds = cleanAndTransformBlocks(blocks);
  console.log('blocksWithIds', blocksWithIds);

  return (
    <div>
      <BlockRenderer blocks={blocksWithIds} />
    </div>
  );
}
