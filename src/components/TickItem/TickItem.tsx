import { FaCircleCheck } from 'react-icons/fa6';
export const TickItem = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid grid-cols-[50px_1fr] gap-3 mb-[80px]">
      <div className="text-3xl text-green-500 flex justify-center items-center">
        <FaCircleCheck />
      </div>
      <div>{children}</div>
    </div>
  );
};
