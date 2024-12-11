import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Получаем тело запроса, если оно понадобится для фильтров
    const filters = await req.json();

    let hasParkingFilter = ``;
    let petFriendlyFilter = ``;
    let minPriceFilter = ``;
    let maxPriceFilter = ``;

    if (filters.hasParking) {
      hasParkingFilter = `
      {
        key: "has_parking"
        compare: EQUAL_TO
        value: "1"
      },
      `;
    }

    if (filters.petFriendly) {
      petFriendlyFilter = `
      {
        key: "pet_friendly"
        compare: EQUAL_TO
        value: "1"
      },
      `;
    }

    if (filters.minPrice) {
      minPriceFilter = `
      {
        key: "price"
        compare: GREATER_THAN_OR_EQUAL_TO
        value: "${filters.minPrice}"
        type: NUMERIC
      }
      `;
    }
    if (filters.maxPrice) {
      maxPriceFilter = `
      {
        key: "price"
        compare: LESS_THAN_OR_EQUAL_TO
        value: "${filters.maxPrice}"
        type: NUMERIC
      }
      `;
    }

    const query = `
      query AllProperties {
        properties(where: {
        offsetPagination: {size: 3, offset: ${((filters.page || 1) - 1) * 3}}
            metaQuery: {
            relation: AND
            metaArray: [
              ${petFriendlyFilter}
              ${hasParkingFilter}
              ${minPriceFilter}
              ${maxPriceFilter}
            ]
          }
        })
        {
        pageInfo {
              offsetPagination {
                total
              }
            }
          nodes {
           databaseId
            title
            uri
            featuredImage {
                node {
                  uri
                  sourceUrl
                }
              }
            propertyFeatures {
              badrooms
              bathrooms
              hasParking
              price
              petFriendly
            }
          }
        }
      }
    `;

    const response = await fetch(`${process.env.NEXT_PUBLIC_WP_GRAPHQL_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from GraphQL API');
    }

    const { data } = await response.json();

    // Возвращаем полученные данные
    return NextResponse.json({
      total: data?.properties?.pageInfo?.offsetPagination?.total,
      properties: data?.properties?.nodes,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      return NextResponse.json(
        { message: 'Internal Server Error', error: error.message },
        { status: 500 }
      );
    } else {
      console.error('Unknown error:', error);
    }
  }
}
