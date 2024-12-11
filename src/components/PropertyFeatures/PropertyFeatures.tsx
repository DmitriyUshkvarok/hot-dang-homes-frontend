import { FaBath, FaBed, FaCar, FaDog } from 'react-icons/fa';
import numeral from 'numeral';

interface PropertyFeaturesProps {
  bedrooms: string;
  bathrooms: string;
  price: string;
  hasParking: boolean;
  petFriendly: boolean;
}

export const PropertyFeatures = ({
  hasParking,
  petFriendly,
  bedrooms,
  bathrooms,
  price,
}: PropertyFeaturesProps) => {
  return (
    <div className="max-w-lg mx-auto my-10 bg-white text-slate-900 p-5 text-center">
      <div className="grid grid-cols-2 mb-4 gap-y-5">
        <div>
          <FaBed /> {bedrooms} bedrooms
        </div>
        <div>
          <FaBath /> {bathrooms} bathrooms
        </div>
        <div>
          {!!petFriendly && (
            <>
              <FaDog />
              pet friendly
            </>
          )}
        </div>
        <div>
          {!!hasParking && (
            <>
              <FaCar /> parking available
            </>
          )}
        </div>
      </div>
      <h3 className="text-5xl font-bold">£{numeral(price).format('0,0')}</h3>
    </div>
  );
};
