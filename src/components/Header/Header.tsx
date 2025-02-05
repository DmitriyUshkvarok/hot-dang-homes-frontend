import Link from 'next/link';
import { FaHeart, FaHouseUser } from 'react-icons/fa';

const routes = [
  {
    id: 1,
    label: 'Home',
    destination: '/',
    subMenuItems: [],
  },
  {
    id: 2,
    label: 'Selling',
    destination: '/selling',
    subMenuItems: [
      {
        id: 21,
        label: 'Guide to Selling',
        destination: '/selling/guide-to-selling',
      },
      {
        id: 22,
        label: 'Book a Valuation',
        destination: '/selling/book-a-valuation',
      },
    ],
  },
  {
    id: 3,
    label: 'Buying',
    destination: '/buying',
    subMenuItems: [
      {
        id: 31,
        label: 'All Properties',
        destination: '/buying/all-properties',
      },
      {
        id: 32,
        label: 'Guide to Buying',
        destination: '/buying/guide-to-buying',
      },
    ],
  },
];

const Header = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-[100]">
      <div className="bg-slate-800 text-white px-5 h-[64px] sticky top-0 z-20 flex">
        <div className="py-4 pl-5 flex text-pink-600">
          <FaHouseUser size={30} />
          <FaHeart size={30} />
        </div>
        <div className="flex flex-1 justify-end">
          {routes.map((item) => (
            <div
              key={item.id}
              className="hover:bg-slate-700 cursor-pointer relative group"
            >
              <div>
                <Link className="p-5 block" href={item.destination}>
                  {item.label}
                </Link>
              </div>
              {!!item.subMenuItems?.length && (
                <div className="group-hover:block hidden bg-slate-800 text-right absolute right-0 top-full -mt-3">
                  {item.subMenuItems.map((subMenuItem) => (
                    <Link
                      key={subMenuItem.id}
                      href={subMenuItem.destination}
                      className="block whitespace-nowrap p-5 hover:bg-slate-700"
                    >
                      {subMenuItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="ml-3 my-auto">
            <Link href="/contact-us" className="btn">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
