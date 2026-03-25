'use client';

import { useEffect, useState, ReactNode } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { House, ArrowBigRightDash } from "lucide-react";
import { fetchFirebaseData } from "./asset/config";

export default function ClientLayout({ children }: { children: ReactNode }) {

  const [firebaseData, setFirebaseData] = useState({
    bag: 0,
    seat: 0,
    emergency: 0,
  });

  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetchFirebaseData()
      .then((data) => {
        setFirebaseData({
          bag: data?.bag ?? 0,
          seat: data?.seat ?? 0,
          emergency: data?.emergency ?? 0,
        });
      })
      .catch((error) => {
        console.error("❌ Firebase Error:", error);
      });
  }, []);

  const { bag, seat, emergency } = firebaseData;

  const handleMenuClick = () => {
    router.push('/Pages/Cabin');
  };

  const handleArrowClick = () => {
    router.push('/');
  };

  return (
    <div className="bg-gradient-to-r from-[#000428] to-[#004e92] min-h-screen">

      <div className="px-6 py-4 flex justify-between">
        <button
          onClick={handleMenuClick}
          className="px-6 py-4 flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:scale-105 transition"
        >
          <House className="w-6 h-6" />
          <span className="font-semibold">Cabin</span>
        </button>

        <button
          onClick={handleArrowClick}
          className="px-6 py-4 flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:scale-105 transition"
        >
          <ArrowBigRightDash className="w-6 h-6" />
        </button>
      </div>

      {isMenuOpen && (
        <>
          <div className="px-6 py-4 flex gap-8">
            <Link href="/Pages/Restroom" className="text-white hover:text-blue-400 transition">
              Restroom
            </Link>
            <Link href="/Pages/SeatBelt" className="text-white hover:text-blue-400 transition">
              Seat Belt
            </Link>
            <Link href="/Pages/Baggage" className="text-white hover:text-blue-400 transition">
              Baggage Bin
            </Link>
            <Link href="/Pages/Monitor" className="text-white hover:text-blue-400 transition">
              Monitoring
            </Link>
          </div>

          {/* <div className="text-white px-6 text-sm opacity-70">
            Bag: {bag} | Seat: {seat} | Emergency: {emergency}
          </div> */}

          <main className="p-6">
            {children}
          </main>
        </>
      )}
    </div>
  );
}