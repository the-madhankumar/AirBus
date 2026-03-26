import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import config from "../Data/config_loader";

export async function fetchFirebaseData() {
  try {
    if (!config.databaseURL) {
      throw new Error("Database URL missing in config");
    }

    const app = initializeApp(config);
    const database = getDatabase(app);

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