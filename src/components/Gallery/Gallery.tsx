'use client';
import Image from 'next/image';

interface GalleryProps {
  columns?: number;
  cropImages?: boolean;
  linkTo?: string;

  items: {
    id: string;
    attributes: {
      height: number;
      linkDestination: string;
      sizeSlug: string;
      url: string;
      width: number;
      alt?: string;
    };
  }[];
}

export const Gallery = ({ columns = 3, cropImages, items }: GalleryProps) => {
  let maxHeight = 0;
  let maxWidth = 0;

  if (cropImages) {
    items?.forEach((item) => {
      if (item.attributes.height > maxHeight) {
        maxHeight = item.attributes.height;
      }
      if (item.attributes.width > maxWidth) {
        maxWidth = item.attributes.width;
      }
    });
  }

  const columnWidth = 100 / columns;
  return (
    <div className="flex flex-wrap max-w-5xl mx-auto">
      {items?.map((item) => (
        <div
          key={item.id}
          style={{ width: `${columnWidth}%` }}
          className="p-5 flex-grow relative magic-list__item"
        >
          <Image
            src={item.attributes.url}
            height={maxHeight || item.attributes.height}
            width={maxWidth || item.attributes.width}
            alt={item.attributes.alt || ''}
            className={`object-cover ${cropImages ? 'opacity-0' : ''}`}
          />
          {!!cropImages && (
            <Image
              src={item.attributes.url}
              alt={item.attributes.alt || ''}
              className="object-cover p-5"
              fill
              sizes="1000px"
            />
          )}
        </div>
      ))}
    </div>
  );
};
