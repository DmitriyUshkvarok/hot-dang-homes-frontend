import { gql } from '@apollo/client';
import { getClient } from '@/lib/client';
import { notFound } from 'next/navigation';
import { BlockRenderer } from '@/components/BlockRender/BlockRender';
import { cleanAndTransformBlocks } from '@/utils/cleanAndTransformBlocks';

interface PageProps {
  params: { slug: string[] };
}

const GET_PAGE_BY_URI = gql`
  query GetPageByUri($uri: String!) {
    pageBy(uri: $uri) {
      id
      title
      blocks(postTemplate: false)
      seo {
        metaDesc
        title
      }
    }
    propertyBy(uri: $uri) {
      id
      title
      blocks(postTemplate: false)
      seo {
        metaDesc
        title
      }
    }
  }
`;

const GET_ALL_PAGES = gql`
  query AllPagesQuery {
    pages {
      nodes {
        uri
      }
    }
    properties {
      nodes {
        uri
      }
    }
  }
`;

const client = getClient();
const { data } = await client.query({ query: GET_ALL_PAGES });
export async function generateStaticParams() {
  // Проверяем, что данные существуют
  const pageRoutes =
    data?.pages?.nodes?.map((node: { uri: string }) => ({
      slug: node.uri.split('/').filter(Boolean),
    })) || [];

  const propertyRoutes =
    data?.properties?.nodes?.map((node: { uri: string }) => ({
      slug: node.uri.split('/').filter(Boolean),
    })) || [];

  // Объединяем маршруты
  return [...pageRoutes, ...propertyRoutes];
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const uri = `/${slug.join('/')}/`;

  const client = getClient();
  const { data } = await client.query({
    query: GET_PAGE_BY_URI,
    variables: { uri },
  });

  const seo = data?.pageBy?.seo || data?.propertyBy?.seo;
  console.log(seo);
  return {
    title: seo?.title || 'Default Title',
    description: seo?.metaDesc || 'Default description',
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const uri = `/${slug.join('/')}/`;

  const client = getClient();
  const { data } = await client.query({
    query: GET_PAGE_BY_URI,
    variables: { uri },
  });

  if (!data?.pageBy) {
    notFound();
  }
  const blocksWithIds = cleanAndTransformBlocks(data.pageBy.blocks || []);
  console.log('blocksWithIds', blocksWithIds);

  return (
    <div>
      <h1>{data.pageBy.title}</h1>
      <BlockRenderer blocks={blocksWithIds} />
    </div>
  );
}