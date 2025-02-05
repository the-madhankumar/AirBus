'use client';
import { LockKeyholeOpen, LockKeyhole } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchFirebaseData } from '../asset/config';

export default function Restroom() {
  const [firebaseData, setFirebaseData] = useState({
    bag: null,
    seat: null,
    emergency: null,
  });

  useEffect(() => {
    fetchFirebaseData()
      .then((data: { bag: any; seat: any; emergency: any; }) => {
        setFirebaseData({
          bag: data.bag,
          seat: data.seat,
          emergency: data.emergency,
        });
      })
      .catch((error: any) => console.error("❌ Error fetching Firebase data:", error));
  }, []);

  const { bag, seat, emergency } = firebaseData;
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [windowHeight, setWindowHeight] = useState<number>(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getTransform = (baseX: number, baseY: number) => {
    const xOffset = (baseX / 100) * windowWidth;
    const yOffset = (baseY / 100) * windowHeight;
    return `translateX(${xOffset}px) translateY(${yOffset}px)`;
  };

  const transform1 = getTransform(-11.14, -14);


  return (
    <><div className="relative">
      <div className="px-3 py-4 w-full h-[50vh] relative">
        <Image
          src="/abb.png"
          alt="Banner"
          layout="fill"
          // objectFit="cover"
          className="opacity-90" />
      </div>
      <div>
        <div
          className={`absolute top-[50%] left-[50%] w-[5%] h-[10%] rounded-lg shadow-lg bg-white text-black flex justify-center items-center`}
          style={{ transform: transform1, opacity: 0.7 }}
        >
          {
            bag === 0 ? "0%" :
              bag === 1 ? "0%" :
                bag === 2 ? "25%" :
                  bag === 3 ? "50%" :
                    bag === 4 ? "75%" :
                      bag === 5 ? "100%" :
                        "--"}
        </div>
      </div>
    </div><div className="flex flex-col gap-4 p-4 md:w-full">
        <div className="flex items-center gap-3 bg-green-100 dark:bg-green-900 px-6 py-4 rounded-lg shadow-md w-[16%] md:w-[50%]">
          <span className="text-lg font-semibold text-green-700 dark:text-green-300">Empty</span>
        </div>
        <div className="flex items-center gap-3 bg-red-100 dark:bg-orange-700 px-6 py-4 rounded-lg shadow-md w-[16%] md:w-[50%]">
          <span className="text-lg font-semibold text-red-700 dark:text-red-300">{
            bag === 0 ? "0%" :
              bag === 1 ? "0%" :
                bag === 2 ? "25%" :
                  bag === 3 ? "50%" :
                    bag === 4 ? "75%" :
                      bag === 5 ? "100%" :
                        "--"} Filled</span>
        </div>
        <div className="flex items-center gap-3 bg-red-100 dark:bg-red-900 px-6 py-4 rounded-lg shadow-md w-[16%] md:w-[50%]">
          <span className="text-lg font-semibold text-red-700 dark:text-red-300">Occupied</span>
        </div>
      </div></>
  );
}
