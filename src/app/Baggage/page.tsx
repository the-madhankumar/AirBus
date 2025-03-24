'use client';
import { LockKeyholeOpen, LockKeyhole, TriangleAlert } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchFirebaseData } from '../asset/config';
import { initializeApp } from 'firebase/app';
import { get, getDatabase, onValue, ref, set } from 'firebase/database';

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
  const [emergencyColor, setEmergencyColor] = useState<string>('');

  useEffect(() => {
    if (emergency === 1) {
      setEmergencyColor('bg-red-700 text-red-200');
    } else {
      setEmergencyColor('bg-green-800 text-green-100');
    }
  }, [emergency]);
  
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

  
    const handleEmergencyClick = async () => {
      const emergencyRef = ref(database, "SensorData/emergency");
  
      get(emergencyRef).then(async (snapshot) => {
        if (snapshot.exists()) {
          const currentValue = snapshot.val();
          await set(emergencyRef, !currentValue);
          console.log("Emergency button clicked!");
          setEmergencyColor(emergencyColor === 'bg-red-700 text-red-200' ? 'bg-green-800 text-green-100' : 'bg-red-700 text-red-200');
        } else {
          console.error("No data found for emergency!");
        }
      }).catch((error) => {
        console.error("Error toggling emergency status:", error);
      });
    };

  const getColor = () => {
    switch(bag){
      case 0:
        return { color :"bg-green-800 text-green-100", val : "Empty" };
      case 1:
        return { color :"bg-green-800 text-green-100", val : "Empty" };
      case 2:
        return { color :"bg-orange-700 text-orange-100", val : "25%" };
      case 3:
        return { color :"bg-orange-700 text-orange-100", val : "50%" };
      case 4:
        return { color :"bg-orange-700 text-orange-100", val : "75%" };
      case 5:
        return { color :"bg-red-700 text-red-200", val : "Full" };
      default:
        return { color :"bg-red-700 text-red-200", val : "--" };
    }
  }

  const { color , val } = getColor();

  return (
    <><div className="relative">
      <div className="px-3 py-4 w-full h-[50vh] relative">
        <Image
          src="/baggage_jpg_format.jpg"
          alt="Banner"
          layout="fill"
          // objectFit="cover"
          className="opacity-90" />
      </div>
      <div>
        <div
          className={`absolute top-[52.5%] left-[51.45%] w-[7%] h-[12%] rounded-sm shadow-lg ${color} flex justify-center items-center`}
          style={{ transform: transform1, opacity: 0.7 }}
        >
          {val}
        </div>
      </div>
    </div>
    <div onClick={handleEmergencyClick} className={`"cursor-pointer hover:scale-105 transition transform ease-in-out flex items-center gap-4 ${emergencyColor} my-4 px-6 py-4 rounded-lg shadow-md  md:w-[16%] lg:w-[16%]"`}>
        <TriangleAlert className={`"w-10 h-10 ${emergencyColor}`} />
        <span className={`text-lg font-semibold`}>Emergency Alert</span>
      </div>
    <div className="flex flex-col gap-4 p-4 md:w-full">
        <div className="flex items-center gap-3 bg-green-100 dark:bg-green-900 px-6 py-4 rounded-lg shadow-md w-[16%] md:w-[50%]">
          <span className="text-lg font-semibold text-green-700 dark:text-green-300">Empty</span>
        </div>
        <div className="flex items-center gap-3 bg-red-100 dark:bg-orange-700 px-6 py-4 rounded-lg shadow-md w-[16%] md:w-[50%]">
          <span className="text-lg font-semibold text-red-700 dark:text-red-300">
          {val !== "Empty" ? `${val} Filled` : val}
          </span>
        </div>
        <div className="flex items-center gap-3 bg-red-100 dark:bg-red-900 px-6 py-4 rounded-lg shadow-md w-[16%] md:w-[50%]">
          <span className="text-lg font-semibold text-red-700 dark:text-red-300">Occupied</span>
        </div>
      </div></>
  );
}
