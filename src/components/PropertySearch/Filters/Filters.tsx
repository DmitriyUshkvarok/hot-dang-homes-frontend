import { Input } from '@/components/UI/Input/Input';
import { ChangeEvent, useEffect, useState } from 'react';
import queryString from 'query-string';

interface FilterProps {
  onSearch: (filters: {
    petFriendly: boolean;
    hasParking: boolean;
    minPrice: string;
    maxPrice: string;
  }) => void;
}

interface WindowLocationSearch {
  petFriendly?: string;
  hasParking?: string;
  minPrice?: string;
  maxPrice?: string;
}

export const Filters = ({ onSearch }: FilterProps) => {
  const [petFriendly, setPetFriendly] = useState<boolean>(false);
  const [hasParking, setHasParking] = useState<boolean>(false);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  const handleSearch = () => {
    onSearch({
      petFriendly,
      hasParking,
      minPrice,
      maxPrice,
    });
  };

  useEffect(() => {
    const {
      petFriendly: petFriendlyInitial,
      hasParking: hasParkingInitial,
      minPrice: minPriceInitial,
      maxPrice: maxPriceInitial,
    } = queryString.parse(window.location.search) as WindowLocationSearch;

    setPetFriendly(petFriendlyInitial === 'true');
    setHasParking(hasParkingInitial === 'true');
    setMinPrice(minPriceInitial || '');
    setMaxPrice(maxPriceInitial || '');
  }, []);

  return (
    <div className="max-w-5xl mx-auto my-10 flex gap-5 border-solid border-slate-400 border-2 p-5 rounded-md">
      <div className="flex-1">
        <div>
          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={hasParking}
              onChange={() => setHasParking((value) => !value)}
            />
            <span className="pl-2">has parking</span>
          </label>
        </div>
        <div>
          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={petFriendly}
              onChange={() => setPetFriendly((value) => !value)}
            />
            <span className="pl-2">pet friendly</span>
          </label>
        </div>
      </div>
      <div className="flex-1">
        <span>Min price</span>
        <Input
          type="number"
          value={minPrice}
          min="0"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMinPrice(e.target.value)
          }
        />
      </div>
      <div className="flex-1">
        <span>Max price</span>
        <Input
          type="number"
          value={maxPrice}
          min="0"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMaxPrice(e.target.value)
          }
        />
      </div>
      <div>
        <div className="btn" onClick={handleSearch}>
          Search
        </div>
      </div>
    </div>
  );
};
