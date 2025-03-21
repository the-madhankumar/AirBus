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

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (seat === 3 || seat === 7) {
      setIsModalOpen(true);
    }
    else{
      setIsModalOpen(false);
    }
  }, [seat]);

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <div className="video-container">
      <video width="420" height="140" controls autoPlay loop>
        <source src="/Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {isModalOpen && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="modal-content bg-gray-800 p-8 rounded-lg shadow-lg w-[80%] max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Seat Belt Alert</h2>
            <p className="mb-4">Wear the seat belt</p>
            {/* <button
              className="bg-red-500 text-gray-600 px-4 py-2 rounded"
              onClick={closeModal}
            >
              Close
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}
