'use client';
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { Home, Menu, House, ArrowBigRightDash, Plane, Phone, GlassWater, ShoppingCart, Folders, PlaneTakeoff, Gamepad2 } from "lucide-react";
import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { fetchFirebaseData } from "./asset/config";

export default function RootLayout({ children }: { children: ReactNode }) {

  const [firebaseData, setFirebaseData] = useState({
    bag: 0,
    seat: 0,
    emergency: 0,
  });

  useEffect(() => {
    fetchFirebaseData()
      .then((data) => {
        setFirebaseData({
          bag: data.bag,
          seat: data.seat,
          emergency: data.emergency,
        });
      })
      .catch((error) => console.error("❌ Error fetching Firebase data:", error));
  }, []);

  const { bag, seat, emergency } = firebaseData;

  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isArrowOpen, setIsArrowOpen] = useState(false);

  const router = useRouter();

  const handleMenuClick = () => {
    router.push('/Cabin');
    console.log(isMenuOpen);
  };

  const handleArrowClick = () => {
    router.push('/');
    console.log(isArrowOpen);
  };

  console.log("bag:", bag);
  console.log(seat);
  console.log(emergency);

  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-[#000428] to-[#004e92]">
        <div className="px-6 py-4 flex justify-between">
          <button onClick={handleMenuClick}
            className="px-6 py-4 flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:scale-105 transition transform ease-in-out">
            <House className="w-6 h-6 text-white" />
            <span className="font-semibold">Cabin</span>
          </button>
          <button onClick={handleArrowClick}
            className="px-6 py-4 flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:scale-105 transition transform ease-in-out">
            <ArrowBigRightDash className="w-6 h-6 text-white" />
          </button>
        </div>

        {isMenuOpen && (
          <><div className="relative">
            <nav className="px-6 py-4 flex gap-8">
              <Link href="/Restroom" className="text-gray-700 dark:text-white px-4 py-2 hover:text-blue-500 transition-all duration-200 ease-out">
                Restroom
              </Link>
              <Link href="/SeatBelt" className="text-gray-700 dark:text-white px-4 py-2 hover:text-blue-500 transition-all duration-200 ease-out">
                Seat Belt
              </Link>
              <Link href="/Baggage" className="text-gray-700 dark:text-white px-4 py-2 hover:text-blue-500 transition-all duration-200 ease-out">
                Baggage Bin
              </Link>
            </nav>

            {/* <div className="relative">
      <div className="px-3 py-4 w-full h-[50vh] relative">
        <Image
          src="/AirBus.png"
          alt="Banner"
          layout="fill"
          // objectFit="cover"
          className="opacity-90"
        />
      </div>
      {pathname === "/Restroom" && (
        <>
          <div className="absolute top-[50%] left-[50%] w-[40px] h-[92px] bg-orange-400 rounded-lg shadow-lg"
            style={{ transform: "translateX(-340px) translateY(-110px)", opacity: 0.7 }}>
          </div>
          <div className={` absolute top-[50%] left-[50%] w-[54px] h-[90px] ${seat <= 4 ? "bg-green-400" : "bg-red-400"} rounded-lg shadow-lg `}
            style={{ transform: "translateX(-290px) translateY(-114px)", opacity: 0.5 }}>
          </div>
        </>
      )}

    </div> */}

          </div><main className="p-6">{children}</main></>
        )}
      </body>
    </html>
  );
}
