import { analyzeVitals } from "../utils/Derivation";
import {
    Thermometer,
    Activity,
    HeartPulse,
    Wind,
    ShieldAlert,
    ShieldCheck,
    Gauge
} from "lucide-react";

export function getWidgetStatus(TEMP_DATA: {
    BODY_TEMPERATURE: number;
    HEART_RATE: number;
    RESPIRATORY_RATE: number;
}) {
    const data = analyzeVitals({
        temp: TEMP_DATA.BODY_TEMPERATURE,
        heartRate: TEMP_DATA.HEART_RATE,
        respiratoryRate: TEMP_DATA.RESPIRATORY_RATE
    });

    return [
    {
        label: "Fever Status",
        value: `${TEMP_DATA.BODY_TEMPERATURE}°C`,
        status: data.fever,
        icon: Thermometer,
        color: data.fever === "Fever"
            ? "text-red-500"
            : "text-green-500",
        coordinates: {
            top: "5%",
            left: "10%",
        },
        range: "Normal < 37.5°C"
    },
    {
        label: "Respiratory–Cardiac Ratio",
        value: data.crr.value.toFixed(2),
        status: data.crr.status,
        icon: Activity,
        color: data.crr.status === "Normal"
            ? "text-green-500"
            : "text-yellow-500",
        coordinates: {
            top: "5%",
            left: "90%",
        },
        range: "3 – 5"
    },
    {
        label: "Physiological Stress Index",
        value: data.psi.value.toFixed(2),
        status: data.psi.status,
        icon: Gauge,
        color: data.psi.status === "Normal Stress"
            ? "text-green-500"
            : "text-red-500",
        coordinates: {
            top: "35%",
            left: "100%",
        },
        range: "~7 – 15"
    },
    {
        label: "Metabolic Activity Indicator",
        value: data.mri.value.toFixed(2),
        status: data.mri.status,
        icon: Wind,
        color: data.mri.status === "Normal"
            ? "text-green-500"
            : "text-orange-500",
        coordinates: {
            top: "35%",
            left: "0%",
        },
        range: "~440 – 750"
    },
    {
        label: "Modified Shock Indicator",
        value: data.msi.value.toFixed(2),
        status: data.msi.status,
        icon: HeartPulse,
        color: data.msi.status === "Normal"
            ? "text-green-500"
            : "text-red-500",
        coordinates: {
            top: "65%",
            left: "90%",
        },
        range: "3 - 5"
    },
    {
        label: "Infection Risk Indicator",
        value: data.ipi.value.toFixed(2),
        status: data.ipi.status,
        icon: ShieldAlert,
        color: data.ipi.status === "Low Risk"
            ? "text-green-500"
            : "text-red-500",
        coordinates: {
            top: "65%",
            left: "10%",
        },
        range: "Low if < 2"
    },
    {
        label: "Vital Stability Index",
        value: data.vsi.value.toFixed(2),
        status: data.vsi.status,
        icon: ShieldCheck,
        color: data.vsi.status === "Stable"
            ? "text-green-500"
            : "text-red-500",
        coordinates: {
            top: "90%",
            left: "50%",
        },
        range: "≈1 when stable"
    }
];
}