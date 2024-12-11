import { PropertyCard } from './ProperyCard/PropertyCard';

interface PropertyFeatures {
  badrooms: number;
  bathrooms: number;
  hasParking: boolean;
  price: number;
  petFriendly: boolean;
}

interface Property {
  databaseId: number;
  title: string;
  uri: string;
  featuredImage?: {
    node?: {
      sourceUrl: string;
    };
  };
  propertyFeatures: PropertyFeatures;
}

interface ResultsProps {
  properties: Property[];
}

const Rusults = ({ properties }: ResultsProps) => {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-3 gap-5 mb-10">
      {properties?.map((property) => (
        <PropertyCard
          key={property?.databaseId}
          title={property?.title}
          destination={property?.uri}
          badrooms={property?.propertyFeatures?.badrooms}
          bathrooms={property?.propertyFeatures?.bathrooms}
          price={property?.propertyFeatures?.price}
          hasParking={property?.propertyFeatures?.hasParking}
          petFriendly={property?.propertyFeatures?.petFriendly}
          image={property.featuredImage?.node?.sourceUrl}
        />
      ))}
    </div>
  );
};

export default Rusults;
