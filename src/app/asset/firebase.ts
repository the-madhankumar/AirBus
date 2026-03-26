// firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { config, config_airbushealth } from "../Data/config_loader";

const app = !getApps().length
  ? initializeApp(config)
  : getApp();

const airbusApp = !getApps().some(a => a.name === "airbus")
  ? initializeApp(config_airbushealth, "airbus")
  : getApp("airbus");

const database = getDatabase(app);

export { app, database, airbusApp };