type VitalWidgetProps = {
    label: string;
    value: string | number;
    status: string;
    icon: React.ReactNode;
    color: string; 
};

export function VitalWidget({
    label,
    value,
    status,
    icon,
    color
}: VitalWidgetProps) {

    const bgColor = color.replace("text", "bg");

    return (
        <div className="w-[200px] h-[140px] rounded-2xl p-[1px] bg-gradient-to-br from-white/20 to-white/5 hover:scale-105 transition duration-300">

            {/* Glow */}
            <div className={`absolute w-[200px] h-[140px] rounded-2xl blur-xl opacity-20 ${bgColor}`} />

            {/* Card */}
            <div className="relative w-full h-full rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg p-4 flex flex-col justify-between">

                {/* Top Section */}
                <div className="flex justify-between items-center">
                    <span className="text-xs text-white/70 uppercase tracking-wide">
                        {label}
                    </span>

                    <div className={`p-2 rounded-lg bg-white/10 ${color}`}>
                        {icon}
                    </div>
                </div>

                {/* Middle Section */}
                <div>
                    <div className="text-3xl font-bold text-white">
                        {value}
                    </div>

                    <div className={`text-sm font-medium ${color}`}>
                        {status}
                    </div>
                </div>

                {/* Bottom Accent */}
                <div className={`h-[3px] w-full rounded-full ${bgColor}`} />
            </div>
        </div>
    );
}