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
    SeatAlert: 0
  });
  
  const [emergencyColor, setEmergencyColor] = useState<string>('');

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
          SeatAlert: data.SeatAlert ?? "No data"
        });
      } else {
        console.log('No data available');
      }
    });

    return () => unsubscribe();
  }, []);


  const { bag, seat, emergency, SeatAlert } = firebaseData;
  console.log("seat data:", seat !== undefined ? seat : "Data not yet loaded");

  useEffect(() => {
    if (firebaseData.SeatAlert === 1) {
      setEmergencyColor('bg-red-700 text-red-200');
    } else {
      setEmergencyColor('bg-green-800 text-green-100');
    }
  }, [firebaseData.SeatAlert]);
  

  const handleSeatAlertClick = async () => {
    const seatRef = ref(database, "SensorData/SeatAlert");
    get(seatRef).then(async (snapshot) => {
      if (snapshot.exists()) {
        const currentValue = snapshot.val();
        await set(seatRef, !currentValue);
        setEmergencyColor(emergencyColor === 'bg-red-700 text-red-200' ? 'bg-green-800 text-green-100' : 'bg-red-700 text-red-200');
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
      <div onClick={handleSeatAlertClick} className={`"cursor-pointer hover:scale-105 transition transform ease-in-out ${emergencyColor} flex items-center gap-4 my-4 px-6 py-4 rounded-lg shadow-md  md:w-[16%] lg:w-[16%]"`}>
        <TriangleAlert className={`"w-10 h-10 ${emergencyColor}`} />
        <span className="text-lg font-semibold">Seat Belt Alert</span>
      </div>
      <div className="flex flex-row gap-4 p-4 bg-white rounded-lg shadow-md w-[40%]">
        <div>
        {[
          { label: "Seated - Belt Unfastened", color: "bg-red-500" },
          { label: "Seated - Belt Fastened", color: "bg-green-500" }
        ].map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${item.color}`}></div>
            <span className="text-lg font-sans font-bold text-gray-800 italic">{item.label}</span>
          </div>
        ))}
        </div>
        <div>
        {[
          { label: "Not Seated - Belt Fastened", color: "bg-orange-500" },
          { label: "Not Seated - Belt Unfastened", color: "bg-gray-500" }
        ].map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${item.color}`}></div>
            <span className="text-lg font-sans font-bold text-gray-800 italic">{item.label}</span>
          </div>
        ))}
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
