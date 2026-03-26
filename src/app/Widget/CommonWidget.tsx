type VitalWidgetProps = {
    label: string;
    value: string | number;
    status: string;
    icon: React.ReactNode;
    color: string;
    range: string;
};

export function VitalWidget({
    label,
    value,
    status,
    icon,
    color,
    range,
}: VitalWidgetProps) {

    const bgColor = color.replace("text", "bg");

    return (
        <div className="relative w-[260px] h-[150px] rounded-2xl p-[1px] bg-gradient-to-br from-white/20 to-white/5 hover:scale-105 transition duration-300">

            <div className={`absolute inset-0 rounded-2xl blur-xl opacity-20 ${bgColor}`} />

            <div className="relative w-full h-full rounded-2xl  bg-black/40 backdrop-blur-lg border border-white/20 shadow-lg p-4 flex items-center gap-4">

                <div className={`flex items-center justify-center w-[70px] h-[70px] rounded-xl ${color}`}>
                    {icon}
                </div>

                <div className="flex flex-col justify-between h-full w-full">

                    <div className="flex justify-between items-center">
                        <span className="text-xs text-white/60 uppercase tracking-wide">
                            {label}
                        </span>
                    </div>

                    <div>
                        <div className="text-3xl font-bold text-white leading-none">
                            {value}
                        </div>
                        <div className={`text-sm font-medium mt-1 ${color}`}>
                            {status}
                        </div>
                        <span className="text-[20px] text-white/40">
                            {range}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}