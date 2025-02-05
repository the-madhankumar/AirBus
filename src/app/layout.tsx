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
    bag: null,
    seat: null,
    emergency: null,
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
    setIsMenuOpen(isMenuOpen => !isMenuOpen);
    setIsArrowOpen(isArrowOpen => !isArrowOpen);
    console.log(isMenuOpen);
  };

  const handleArrowClick = () => {
    setIsArrowOpen(isArrowOpen => !isArrowOpen);
    setIsMenuOpen(isMenuOpen => !isMenuOpen);
    console.log(isArrowOpen);
  };

  const handleVideoClick = () => {
    router.push(`/Video?data=${JSON.stringify(seat)}`)
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
            <span className="font-semibold">Menu</span>
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

        {
          isArrowOpen && (
            <div>

              <nav className="px-6 py-4 flex  justify-between gap-8">
                <div className="px-6 py-4 flex">
                  <button
                    className="px-6 py-4 flex items-center gap-3 bg-gradient-to-r from-blue-300 to-purple-700 text-white rounded-lg hover:scale-105 transition transform ease-in-out">
                    <span className="font-semibold">Banglore</span>
                    <span>-------</span>
                    <PlaneTakeoff className="text-white" />
                    <span>-------</span>
                    <span className="font-semibold">America</span>
                  </button>
                </div>
                <div className="px-6 py-4 flex flex-row justify-end gap-2">
                  <button
                    className="px-6 flex items-center gap-3 bg-gradient-to-r from-blue-300 to-purple-700 text-white rounded-lg hover:scale-105 transition transform ease-in-out">
                    <Phone className="w-6 h-6 text-white" />
                  </button>
                  <button
                    className="px-6 flex items-center gap-3 bg-gradient-to-r from-blue-300 to-purple-700 text-white rounded-lg hover:scale-105 transition transform ease-in-out">
                    <GlassWater className="w-6 h-6 text-white" />
                  </button>
                </div>
              </nav>


              <div id="heading" className="flex flex-row justify-center w-full text-[80px] text-white font-bold">Manage Cabin Experience</div>

              <div id="blocks" className="flex flex-row gap-5 mx-6 my-6">
                <div className="bg-gradient-to-r from-gray-500 to-blue-300 p-4 rounded-lg shadow-lg shadow-blue-200 w-1/4">
                  <div className="flex flex-col justify-center">
                    <ShoppingCart className="px-3 py-4 w-full h-[50vh] relative" />
                    <label className="flex flex-center text-[20px] text-white font-bold">Orders</label>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-gray-500 to-blue-300 p-4 rounded-lg shadow-lg shadow-blue-200 w-1/4">
                  <div className="flex flex-col justify-center">
                    <Folders onClick={handleVideoClick} className="px-3 py-4 w-full h-[50vh]" />
                    <label className="flex flex-center text-[20px] text-white font-bold">Gallery</label>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-gray-500 to-blue-300 p-4 rounded-lg shadow-lg shadow-blue-200 w-1/4">
                  <div className="flex flex-col justify-center">
                    <Plane onClick={handleMenuClick} className="px-3 py-4 w-full h-[50vh] relative" />
                    <label className="flex flex-center text-[20px] text-white font-bold">I-Cabin</label>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-gray-500 to-blue-300 p-4 rounded-lg shadow-lg shadow-blue-200 w-1/4">
                  <div className="flex flex-col justify-center">
                    <Gamepad2 className="px-3 py-4 w-full h-[50vh] relative" />
                    <label className="flex flex-center text-[20px] text-white font-bold">Games</label>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </body>
    </html>
  );
}
