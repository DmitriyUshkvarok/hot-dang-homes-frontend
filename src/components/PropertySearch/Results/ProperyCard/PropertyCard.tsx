import Image from 'next/image';
import Link from 'next/link';
import numeral from 'numeral';
import { FaBath, FaBed, FaCar, FaDog } from 'react-icons/fa';

interface PropertyCardProps {
  title: string;
  destination: string;
  image?: string;
  badrooms: number;
  bathrooms: number;
  price: number;
  hasParking: boolean;
  petFriendly: boolean;
}

export const PropertyCard = ({
  title,
  destination,
  image,
  badrooms,
  bathrooms,
  price,
  hasParking,
  petFriendly,
}: PropertyCardProps) => {
  return (
    <Link
      href={destination}
      className="border-2 border-slate-300 p-5 block bg-slate-100 hover:bg-slate-200"
    >
      <div className="flex w-full relative h-[200px]">
        <Image
          src={image ? image : ''}
          priority
          fill
          alt="house img"
          sizes="300px"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="mt-3 text-lg font-bold">{title}</div>
      <div className="text-lg">£{numeral(price).format('0,0')}</div>
      <div className="flex justify-between text-sm mt-3">
        <div>
          <FaBath />
          <span className="pl-2">{bathrooms} bathrooms</span>
        </div>
        <div>
          <FaBed />
          <span className="pl-2">{badrooms} bedrooms</span>
        </div>
      </div>
      {(!!hasParking || !!petFriendly) && (
        <div className="flex justify-between text-sm mt-3">
          <div>
            {!!hasParking && (
              <>
                <FaCar /> <span className="pl-2">parking available</span>
              </>
            )}
          </div>
          <div>
            {!!petFriendly && (
              <>
                <FaDog />
                <span className="pl-2">pet friendly</span>
              </>
            )}
          </div>
        </div>
      )}
    </Link>
  );
};
