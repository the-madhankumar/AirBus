'use client';

import { Folders, Gamepad2, GlassWater, Phone, Plane, PlaneTakeoff, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function page() {
    const router = useRouter();
    const handleVideoClick = () => {
        router.push('/Video');
    }
    return (
        <div>
            <nav className="px-6 py-4 flex  justify-between gap-8">
                <div className="px-6 py-4 flex">
                    <button
                        className="px-6 py-4 flex items-center gap-3 bg-gradient-to-r from-blue-300 to-purple-700 text-white rounded-lg hover:scale-105 transition transform ease-in-out">
                        <span className="font-semibold">Banglore</span>
                        <span>-------</span>
                        <PlaneTakeoff className="text-white" />
                        <span>-------</span>
                        <span className="font-semibold">Hamburg</span>
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
                        <Folders onClick = {handleVideoClick} className="px-3 py-4 w-full h-[50vh]" />
                        <label className="flex flex-center text-[20px] text-white font-bold">Gallery</label>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-gray-500 to-blue-300 p-4 rounded-lg shadow-lg shadow-blue-200 w-1/4">
                    <div className="flex flex-col justify-center">
                        <Plane className="px-3 py-4 w-full h-[50vh] relative" />
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
    );
}