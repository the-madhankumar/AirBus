'use client';

import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { fetchFirebaseData } from '../asset/config';

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (seat === 3 || seat === 7) {
      setIsModalOpen(true);
    }
  }, [seat]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
            <button
              className="bg-red-500 text-gray-600 px-4 py-2 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
