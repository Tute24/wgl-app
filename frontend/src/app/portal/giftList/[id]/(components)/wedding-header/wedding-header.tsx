'use client';

import Link from 'next/link';
import { IoArrowRedoSharp } from 'react-icons/io5';

interface weddingHeaderProps {
  owner: boolean;
  weddingTitle: string;
  weddingDate: string;
  id: number;
}
export default function WeddingHeader({
  owner,
  weddingDate,
  weddingTitle,
  id,
}: weddingHeaderProps) {
  return (
    <div className="relative w-full">
      {owner && (
        <div className="absolute right-4 top-0 text-sm sm:text-[18px]">
          <h2 className="text-amber-800 font-poppins">
            <Link
              className="flex flex-row gap-2 text-center items-center hover:underline"
              href={`/portal/giftsTable/${id}`}
            >
              View gifted products <IoArrowRedoSharp size={18} />
            </Link>
          </h2>
        </div>
      )}
      <div className={`flex flex-col text-center items-center ${owner ? 'mt-10' : ''}`}>
        <h1 className="font-bold text-stone-700 text-2xl sm:text-[32px] font-poppins">
          {`${weddingTitle}: `}
          <span className="text-paleGold">{weddingDate}</span>
        </h1>
      </div>
    </div>
  );
}
