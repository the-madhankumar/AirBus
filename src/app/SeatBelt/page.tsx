'use client';

import { useRouter } from "next/navigation";
import Image from 'next/image'
import { TriangleAlert } from "lucide-react";
import { fetchFirebaseData } from "../asset/config";
import { useEffect, useState } from "react";
import { onValue, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

const config = {
  apiKey: "AIzaSyBbZGaZeJvngmmRRPUaceo0pIqbfEQuKGk",
  authDomain: "airbus-poc-c7267.firebaseapp.com",
  databaseURL: "https://airbus-poc-c7267-default-rtdb.firebaseio.com",
  projectId: "airbus-poc-c7267",
  storageBucket: "airbus-poc-c7267.firebasestorage.app",
  messagingSenderId: "80259594188",
  appId: "1:80259594188:web:73236af5acc5c046a74f69"
};

const app = initializeApp(config);
const database = getDatabase(app);

export default function Page() {
  const [firebaseData, setFirebaseData] = useState({
    bag: 0,
    seat: 0,
    emergency: 0,
  });

  useEffect(() => {
    const dataRef = ref(database, 'SensorData');

    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Raw Firebase data:", data); // Check if Firebase returns numbers

      if (data) {
        setFirebaseData({
          bag: data.Bag ?? "No data",
          seat: data.Seat ?? "No data",
          emergency: data.emergency ?? "No data",
        });
      } else {
        console.log('No data available');
      }
    });

    return () => unsubscribe();
  }, []);


  const { bag, seat, emergency } = firebaseData;
  console.log("seat data:", seat !== undefined ? seat : "Data not yet loaded");

  const handleEmergencyClick = () => {
    const emergencyRef = ref(database, "SensorData/emergency");

    get(emergencyRef).then((snapshot) => {
      if (snapshot.exists()) {
        const currentValue = snapshot.val();
        set(emergencyRef, !currentValue);
        console.log("Emergency button clicked!");
      } else {
        console.error("No data found for emergency!");
      }
    }).catch((error) => {
      console.error("Error toggling emergency status:", error);
    });
  };

  const handleSeatAlertClick = () => {
    const seatRef = ref(database, "SensorData/SeatAlert");
    get(seatRef).then((snapshot) => {
      if (snapshot.exists()) {
        const currentValue = snapshot.val();
        set(seatRef, !currentValue);
        console.log("Seat alert button clicked!");
      } else {
        console.error("No data found for seat alert!");
      }
    }).catch((error) => {
      console.error("Error toggling seat alert status:", error);
    });
  };

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

  const transform1 = getTransform(-21, -13);
  const transform2 = getTransform(-17.5, -13);

  console.log("[ INFO ] Restroom input data : ", firebaseData);
  console.log("[ INFO ] Data type:", typeof seat);

  return (
    <>
      <div className="relative">
        <div className="px-3 py-4 w-full h-[50vh] relative">
          <Image
            src="/seatjpgformat.jpg"
            alt="Banner"
            layout="fill"
            // objectFit="cover"
            className="opacity-90" />
        </div>
        <div>
          <div
            className={`absolute top-[51%] left-[50.5%] w-[2.35%] h-[20%] rounded-sm shadow-lg 
              ${[1, 5].includes(seat) ? "bg-gray-400" :
                [2, 6].includes(seat) ? "bg-orange-400" :
                  [3, 7].includes(seat) ? "bg-red-800" :
                    "bg-green-500"
              }`}
            style={{ transform: transform1, opacity: 0.7 }}
          ></div></div>

        <div
          className={`absolute top-[50%] left-[49.9%] w-[3.5%] h-[17%] rounded-md shadow-lg 
              ${seat <= 4 ? "bg-green-400" : "bg-red-400"}`}
          style={{ transform: transform2, opacity: 0.5 }}
        ></div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6 p-6 w-full">
      <div onClick={handleEmergencyClick} className="cursor-pointer hover:scale-105 transition transform ease-in-out flex items-center gap-4 bg-green-100 dark:bg-red-200 my-4 px-6 py-4 rounded-lg shadow-md  md:w-[50%] lg:w-[20%]">
        <TriangleAlert className="w-10 h-10 text-red-800" />
        <span className="text-lg font-semibold text-red-800">Emergency Alert</span>
      </div>
      <div onClick={handleSeatAlertClick} className="cursor-pointer hover:scale-105 transition transform ease-in-out flex items-center gap-4 bg-green-100 dark:bg-red-200 my-4 px-6 py-4 rounded-lg shadow-md  md:w-[40%] lg:w-[16%]">
        <TriangleAlert className="w-10 h-10 text-red-800" />
        <span className="text-lg font-semibold text-red-800">Seat Belt Alert</span>
      </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 p-6 w-full">
        {/* Legend Section */}
        <div className="cursor-pointer hover:scale-105 transition transform ease-in-out flex items-center gap-4 bg-green-100 dark:bg-red-200 my-4 px-6 py-4 rounded-lg shadow-md  md:w-[40%] lg:w-[16%]">
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-red-800">Seated</span>
              <span className="text-lg font-semibold text-red-800">-------------------------------</span>
            <span className="text-lg font-semibold text-red-800">belt unfastened</span>
          </div>
        </div>
        <div className="cursor-pointer hover:scale-105 transition transform ease-in-out flex items-center gap-4 bg-green-100 dark:bg-green-200 my-4 px-6 py-4 rounded-lg shadow-md  md:w-[40%] lg:w-[16%]">
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-green-800">Seated</span>
              <span className="text-lg font-semibold text-green-800">-------------------------------</span>
            <span className="text-lg font-semibold text-green-800">belt fastened</span>
          </div>
        </div>
        <div className="cursor-pointer hover:scale-105 transition transform ease-in-out flex items-center gap-4 bg-green-100 dark:bg-orange-200 my-4 px-6 py-4 rounded-lg shadow-md  md:w-[40%] lg:w-[16%]">
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-orange-800">Not Seated</span>
              <span className="text-lg font-semibold text-orange-800">-------------------------------</span>
            <span className="text-lg font-semibold text-orange-800">belt fastened</span>
          </div>
        </div>
        <div className="cursor-pointer hover:scale-105 transition transform ease-in-out flex items-center gap-4 bg-green-100 dark:bg-gray-200 my-4 px-6 py-4 rounded-lg shadow-md  md:w-[40%] lg:w-[16%]">
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-gray-800">Not Seated</span>
              <span className="text-lg font-semibold text-gray-800">-------------------------------</span>
            <span className="text-lg font-semibold text-gray-800">belt unfastened</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6 p-6 w-full">
        {/* Business Class Section */}
        <div className="bg-blue-600 p-6 rounded-lg shadow-md lg:w-1/2 md:w-full relative">
          <h2 className="text-center text-lg font-semibold mb-4 text-white">Business Class</h2>
          <div className="p-4 rounded-lg shadow-md w-full">
            <div className="flex flex-wrap gap-4">
              {Array(8).fill(20).map((num, index) => (
                <div key={index} className="border-2 border-gray-400 p-4 rounded-md w-[50px] text-center ">
                  {num}
                </div>
              ))}
            </div>
          </div>
          <button className="mt-4 w-full bg-gradient-to-r from-[#000428] to-[#004e92] text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Send Alert
          </button>
        </div>

        <div className="bg-blue-600 p-6 rounded-lg shadow-md lg:w-1/2 md:w-full relative">
          <h2 className="text-center text-lg font-semibold mb-4 text-white">Economy Class</h2>
          <div className="p-4 rounded-lg shadow-md w-full">
            {Array(3).fill(0).map((_, rowIndex) => (
              <div key={rowIndex} className="flex flex-wrap gap-4 mb-2">
                {Array(8).fill(20).map((num, index) => (
                  <div key={index} className="border-2 border-gray-400 p-4 rounded-md w-[50px] text-center">
                    {num}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <button className="mt-4 w-full bg-gradient-to-r from-[#000428] to-[#004e92] text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Send Alert
          </button>
        </div>
      </div>
    </>
  );
}
