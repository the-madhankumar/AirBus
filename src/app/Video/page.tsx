'use client';

import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function Page() {
  const searchParams = useSearchParams();
  const firebaseData = searchParams.get('data');
  const data = firebaseData !== null ? parseInt(firebaseData, 10) : null;

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Trigger the modal to open based on the 'data' value
  useEffect(() => {
    if (data === 3 || data === 7) {
      setIsModalOpen(true);
    }
  }, [data]); // Depend on 'data', so this runs when 'data' changes

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="video-container">
      <video width="50%" height="240" controls autoPlay loop>
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
