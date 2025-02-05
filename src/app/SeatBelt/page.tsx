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

  const handleEmergencyClick = () => {
    const emergencyRef = ref(database, "SensorData/emergency");

    // Use get() to fetch the current value and toggle it
    get(emergencyRef).then((snapshot) => {
      if (snapshot.exists()) {
        const currentValue = snapshot.val();
        // Toggle the value
        set(emergencyRef, !currentValue);
        console.log("Emergency button clicked!");
      } else {
        console.error("No data found for emergency!");
      }
    }).catch((error) => {
      console.error("Error toggling emergency status:", error);
    });
  };


  return (
    <><div className="px-3 py-4 w-full h-[50vh] relative">
      <Image
        src="/AirBus.png"
        alt="Banner"
        layout="fill"
        // objectFit="cover"
        className="opacity-90" />
    </div>

      <div onClick={handleEmergencyClick} className="cursor-pointer hover:scale-105 transition transform ease-in-out flex items-center gap-4 bg-green-100 dark:bg-red-200 my-4 px-6 py-4 rounded-lg shadow-md  md:w-[40%] lg:w-[16%]">
        <TriangleAlert className="w-10 h-10 text-red-800" />
        <span className="text-lg font-semibold text-red-800">Alert</span>
      </div>
      <div className="flex lg:flex-row gap-6 p-6 w-full md:flex-col">
        <div className="bg-blue-600 p-6 rounded-lg shadow-md lg:w-1/2 md:w-full absolute">
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

        <div className="bg-blue-600 p-6 rounded-lg shadow-md lg:w-1/2 md:w-full absolute">
          <h2 className="text-center text-lg font-semibold mb-4">Economy Class</h2>
          <div className="p-4 rounded-lg shadow-md space-y-4 w-full relative">
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
      </div></>
  );
}
