'use client';

import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { fetchFirebaseData } from '../asset/config';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';

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
    seatalert: null
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
           seatalert: data.SeatAlert ?? "No data",
         });
       } else {
         console.log('No data available');
       }
     });
 
     return () => unsubscribe();
   }, []);

  const { bag, seat, emergency , seatalert} = firebaseData;

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log("seatalert:", seatalert, "seat:", seat);
  
    if (seatalert === true && (seat === 3 || seat === 7)) {
      console.log("Setting modal open"); 
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [seatalert, seat]);
  
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="video-container">
        <video width="420" height="140" controls autoPlay loop className="mx-auto">
          <source src="/Video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
  
        {isModalOpen && (
          <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="modal-content bg-gray-800 p-8 rounded-lg shadow-lg w-[80%] max-w-lg">
              <h2 className="text-xl font-semibold mb-4">Seat Belt Alert</h2>
              <p className="mb-4">Wear the seat belt</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );  
}
