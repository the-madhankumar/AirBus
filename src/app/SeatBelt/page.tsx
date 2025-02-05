'use client';

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { searchParams } = new URL(window.location.href);
  const firebaseData = searchParams.get("data");
  console.log("[ INFO ] SeatBelt Input Data : ", firebaseData);
  return (
    <div className="flex lg:flex-row gap-6 p-6 w-full md:flex-col">
      <div className="bg-blue-600 p-6 rounded-lg shadow-md lg:w-1/2 md:w-full">
        <h2 className="text-center text-lg font-semibold mb-4">Business Class</h2>
        <div className="p-4 rounded-lg shadow-md relative w-full">
          <div className="flex flex-row gap-12">
            {Array(8).fill(20).map((num, index) => (
              <div key={index} className="border-2 border-gray-400 p-2 rounded-md">{num}</div>
            ))}
          </div>
        </div>
        <button className="mt-4 w-full bg-gradient-to-r from-[#000428] to-[#004e92] text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Send Alert
        </button>
      </div>

      <div className="bg-blue-600 p-6 rounded-lg shadow-md lg:w-1/2 md:w-full">
        <h2 className="text-center text-lg font-semibold mb-4">Economy Class</h2>
        <div className="p-4 rounded-lg shadow-md space-y-4 w-full">
          {Array(3).fill(0).map((_, rowIndex) => (
            <div key={rowIndex} className="flex flex-row gap-12">
              {Array(8).fill(20).map((num, index) => (
                <div key={index} className="border-2 border-gray-400 p-2 rounded-md">{num}</div>
              ))}
            </div>
          ))}
        </div>
        <button className="mt-4 w-full bg-gradient-to-r from-[#000428] to-[#004e92] text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Send Alert
        </button>
      </div>
    </div>
  );
}
