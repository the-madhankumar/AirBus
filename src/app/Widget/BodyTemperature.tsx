"use client";

type Props = {
    value?: number;
};

export default function BodyTempWidget({ value = 90 }: Props) {
    return (
        <div
            className="relative 
            w-[120px] h-[120px] 
            flex items-center justify-center"
        >
            <div className="flex flex-col items-center justify-center gap-1">

                <div className="
                    absolute
                    w-[50px] h-[50px] 
                    flex flex-row items-center justify-center
                    rounded-full
                    bg-gradient-to-br from-green-900 via-slate-800 to-green-900
                    shadow-[0_0_15px_rgba(0,0,0,0.6)]
                ">
                    <span className="text-white text-xl font-bold leading-none">
                        {value}
                    </span>
                    <span className="text-[10px] text-white/60 tracking-widest">
                        °C
                    </span>
                </div>

            </div>

        </div>
    );
}
