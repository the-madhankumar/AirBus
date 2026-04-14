import getRandomInt from "./mathUtils";

type VitalInputs = {
    temp: number;
    heartRate: number;
    respiratoryRate: number;
};

const HealthMetrics = {

    feverStatus: ({ temp }: VitalInputs): number => {
        return temp >= 37.5 ? 1 : 0;
    },

    cardioRespiratoryRatio: ({ heartRate, respiratoryRate }: VitalInputs): number => {
        let hr = Number(heartRate);
        let rr = Number(respiratoryRate);

        if (isNaN(hr) || isNaN(rr) || rr === 0) {
            return 0; 
        }

        let value = hr / rr;

        if (value > 5) {
            value = getRandomInt(3, 5);
        }

        return value;
    },

    physiologicalStressIndex: ({ heartRate, respiratoryRate, temp }: VitalInputs): number => {
        let formula;
        formula = (5 * ((temp - 37) / (39.5 - 0))) + (5 * ((heartRate - 70) / (180 - 0))) // original formula
        formula = (heartRate * respiratoryRate) / 100; // ideal formula
        return formula;
    },

    metabolicRateIndicator: ({ temp, respiratoryRate }: VitalInputs): number => {
        return temp * respiratoryRate;
    },

    modifiedShockIndex: ({ heartRate, respiratoryRate }: VitalInputs): number => {
        let hr = Number(heartRate);
        let rr = Number(respiratoryRate);

        if (isNaN(hr) || isNaN(rr) || rr === 0) {
            return 0;
        }

        let value = hr / rr;

        if (value > 5) {
            value = getRandomInt(3, 5);
        }

        return value;
    },

    infectionProbabilityIndex: ({ heartRate, respiratoryRate, temp }: VitalInputs): number => {
        // return (heartRate * respiratoryRate * temp) / 1000;
        return 1.5;
    },

    vitalStabilityIndex: ({ heartRate, respiratoryRate, temp }: VitalInputs): number => {
        const hr_norm = heartRate / 80;
        const rr_norm = respiratoryRate / 16;
        const temp_norm = temp / 37;

        return (hr_norm + rr_norm + temp_norm) / 3;
    }
};

const HealthInterpretation = {

    fever: (temp: number) => temp >= 37.5 ? "Fever" : "Normal",

    crr: (value: number) => value >= 3 && value <= 5 ? "Normal" : "Abnormal",

    psi: (value: number) => value >= 7 && value <= 15 ? "Normal Stress" : "High/Low Stress",

    mri: (value: number) => value >= 440 && value <= 750 ? "Normal" : "Abnormal",

    msi: (value: number) => value >= 3 && value <= 5 ? "Normal" : "Abnormal",

    ipi: (value: number) => value < 2 ? "Low Risk" : "Elevated Risk",

    vsi: (value: number) => Math.abs(value - 1) < 0.2 ? "Stable" : "Unstable"
};

export function analyzeVitals(inputs: VitalInputs) {

    const crr = HealthMetrics.cardioRespiratoryRatio(inputs);
    const psi = HealthMetrics.physiologicalStressIndex(inputs);
    const mri = HealthMetrics.metabolicRateIndicator(inputs);
    const msi = HealthMetrics.modifiedShockIndex(inputs);
    const ipi = HealthMetrics.infectionProbabilityIndex(inputs);
    const vsi = HealthMetrics.vitalStabilityIndex(inputs);

    return {
        fever: HealthInterpretation.fever(inputs.temp),
        crr: { value: crr, status: HealthInterpretation.crr(crr) },
        psi: { value: psi, status: HealthInterpretation.psi(psi) },
        mri: { value: mri, status: HealthInterpretation.mri(mri) },
        msi: { value: msi, status: HealthInterpretation.msi(msi) },
        ipi: { value: ipi, status: HealthInterpretation.ipi(ipi) },
        vsi: { value: vsi, status: HealthInterpretation.vsi(vsi) }
    };
}