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
        return heartRate / respiratoryRate;
    },

    physiologicalStressIndex: ({ heartRate, respiratoryRate }: VitalInputs): number => {
        return (heartRate * respiratoryRate) / 100;
    },

    metabolicRateIndicator: ({ temp, respiratoryRate }: VitalInputs): number => {
        return temp * respiratoryRate;
    },

    modifiedShockIndex: ({ heartRate, respiratoryRate }: VitalInputs): number => {
        return heartRate / respiratoryRate;
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