'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Rusults from './Results/Rusults';
import { Pagination } from './Pagination/Pagination';
import queryString from 'query-string';
import { Filters } from './Filters/Filters';

interface FiltersData {
  petFriendly?: boolean;
  hasParking?: boolean;
  minPrice?: string;
  maxPrice?: string;
}

export const PropertySearch = () => {
  const [properties, setProperties] = useState([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const pageSize = 3;
  const router = useRouter();
  const pathname = usePathname();

  const search = async () => {
    const { page, minPrice, maxPrice, hasParking, petFriendly } =
      queryString.parse(window.location.search) as Record<string, string>;
    const filters: FiltersData = {};

    if (minPrice) filters.minPrice = parseInt(minPrice).toString();
    if (maxPrice) filters.maxPrice = parseInt(maxPrice).toString();
    if (hasParking === 'true') filters.hasParking = true;
    if (petFriendly === 'true') filters.petFriendly = true;

    const response = await fetch(`/api/search`, {
      method: 'POST',
      body: JSON.stringify({ page: parseInt(page || '1'), ...filters }),
    });
    const data = await response.json();
    setProperties(data.properties);
    setTotalResults(data.total);
  };

  const handlePageClick = async (pageNumber: number) => {
    const { petFriendly, hasParking, minPrice, maxPrice } = queryString.parse(
      window.location.search
    );
    router.push(
      `${pathname}?page=${pageNumber}&petFriendly=${
        petFriendly === 'true'
      }&hasParking=${
        hasParking === 'true'
      }&minPrice=${minPrice || ''}&maxPrice=${maxPrice || ''}`
    );
  };

  useEffect(() => {
    search();
  }, []);

  const handleSearch = async ({
    petFriendly,
    hasParking,
    minPrice,
    maxPrice,
  }: FiltersData) => {
    // update our browser url
    // search
    router.push(
      `${pathname}?page=1&petFriendly=${!!petFriendly}&hasParking=${!!hasParking}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
  };

  return (
    <div>
      <Filters onSearch={handleSearch} />
      <Rusults properties={properties} />
      <Pagination
        onPageClick={handlePageClick}
        totalPages={Math.ceil(totalResults / pageSize)}
      />
    </div>
  );
};
