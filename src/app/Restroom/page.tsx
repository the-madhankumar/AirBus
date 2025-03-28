'use client';
import { LockKeyholeOpen, LockKeyhole } from 'lucide-react';
import { useSearchParams } from 'next/navigation'
import Image from "next/image";
import { useEffect, useState } from 'react';
import { fetchFirebaseData } from '../asset/config';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref } from 'firebase/database';

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

export default function Restroom() {
  const [firebaseData, setFirebaseData] = useState({
    bag: 0,
    seat: 0,
    emergency: 0,
  });

   useEffect(() => {
     const dataRef = ref(database, 'SensorData');
 
     const unsubscribe = onValue(dataRef, (snapshot) => {
       const data = snapshot.val();
       console.log("Raw Firebase data:", data); 
 
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
    <><div className="relative">
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
          className={`absolute top-[51%] left-[50.35%] w-[2.3%] h-[20%] rounded-sm shadow-lg 
          ${[1, 5].includes(seat) ? "bg-gray-400" :  
              [2, 6].includes(seat) ? "bg-orange-400" :
                [3, 7].includes(seat) ? "bg-red-800" :  
                  "bg-green-500"                            
            }`}
          style={{ transform: transform1, opacity: 0.7 }}
        ></div>

        <div
          className={`absolute top-[50%] left-[49.9%] w-[3.5%] h-[17%] rounded-md shadow-lg 
          ${seat <= 4 ? "bg-green-400" : "bg-red-400"}`}
          style={{ transform: transform2, opacity: 0.5 }}
        ></div>
      </div>


    </div><div className="flex flex-col gap-6 p-6 md:w-full">
        <div className="flex items-center gap-4 bg-green-100 dark:bg-green-900 px-6 py-4 rounded-lg shadow-md  md:w-[40%] lg:w-[16%]">
          <LockKeyholeOpen className="w-10 h-10 text-green-600" />
          <span className="text-lg font-semibold text-green-700 dark:text-green-300">Available</span>
        </div>
        <div className="flex items-center gap-4 bg-red-100 dark:bg-red-900 px-6 py-4 rounded-lg shadow-md md:w-[40%] lg:w-[16%]">
          <LockKeyhole className="w-10 h-10 text-red-600" />
          <span className="text-lg font-semibold text-red-700 dark:text-red-300">Occupied</span>
        </div>
      </div></>

  );
}
