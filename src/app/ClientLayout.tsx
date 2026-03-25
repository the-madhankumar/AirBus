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
      .catch((error) => console.error("❌ Firebase Error:", error));
  }, []);

  const handleMenuClick = () => router.push('/Pages/Cabin');
  const handleArrowClick = () => router.push('/');

  return (
    <div className="bg-gradient-to-r from-[#000428] to-[#004e92] min-h-screen text-white">

      <header className="flex items-center justify-between px-6 py-5 gap-4">
        <button
          onClick={handleMenuClick}
          className="flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow-lg hover:scale-105 transition transform duration-300"
        >
          <House className="w-5 h-5" />
          <span className="font-semibold">Cabin</span>
        </button>

        <nav className="flex gap-6 p-5
                border-b-4 border-cyan-400 rounded-b-2xl 
                shadow-md shadow-cyan-400/30
                hover:scale-105 hover:shadow-lg transition-transform duration-300">
          {[
            { label: "Restroom", href: "/Pages/Restroom" },
            { label: "Seat Belt", href: "/Pages/SeatBelt" },
            { label: "Baggage Bin", href: "/Pages/Baggage" },
            { label: "Monitoring", href: "/Pages/Monitor" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white font-medium hover:text-blue-400 transition duration-200 border border-white/20 p-2 rounded-md"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={handleArrowClick}
          className="flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow-lg hover:scale-105 transition transform duration-300"
        >
          <ArrowBigRightDash className="w-5 h-5" />
        </button>
      </header>

      <main className="p-6">
        {children}
      </main>
    </div>
  );
}