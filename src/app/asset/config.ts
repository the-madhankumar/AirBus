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

export async function fetchFirebaseData() {
  try {
    const BagRef = ref(database, "SensorData/Bag");
    const snapshot = await get(BagRef);

    const seatRef = ref(database, "SensorData/Seat");
    const seatsnapshot = await get(seatRef);

    const emergencyRef = ref(database, "SensorData/emergency");
    const emergencysnapshot = await get(emergencyRef);

    return {
      bag: snapshot.exists() ? snapshot.val() : null,
      seat: seatsnapshot.exists() ? seatsnapshot.val() : null,
      emergency: emergencysnapshot.exists() ? emergencysnapshot.val() : null,
    };
  } catch (error) {
    console.error("Error fetching data from Firebase:", error);
    return { bag: null, seat: null, emergency: null };
  }
}
