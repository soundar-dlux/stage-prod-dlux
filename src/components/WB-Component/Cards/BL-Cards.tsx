
import React from "react";
import Image from "next/image";
import { Layers3 } from "lucide-react";

export interface FeatureCardProps {
    title: string;
    description: string;
    imageSrc?: string;
    imageAlt?: string;
    icon?: React.ReactNode;
    className?: string;
}

const BLFeatureCard: React.FC<FeatureCardProps> = ({
    title,
    description,
    imageSrc,
    imageAlt,
    icon,
    className = "",
}) => {
    return (
        <div
            className={`
        group relative flex flex-col overflow-hidden
        w-full max-w-[367px] h-[485px]
        rounded-[4px]
        border border-[#FCEFE7] border-b-[5px] border-b-[#FF500D]
        bg-gradient-to-b from-white via-[#FFFBF8] to-[#FFF3EB]
        px-6 pb-7 pt-8 sm:px-7
        shadow-[2px_2px_8px_rgba(27,27,27,0.12)]
        transition-all duration-300
        hover:-translate-y-1.5
        hover:shadow-[2px_6px_16px_rgba(27,27,27,0.18)]
        ${className}
      `}
        >
            {/* Image / Icon */}
            <div className="flex h-[200px] shrink-0 items-center justify-center">
                <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    {imageSrc ? (
                        <Image
                            src={imageSrc}
                            alt={imageAlt || title}
                            width={112}
                            height={112}
                            className="h-24 w-24 sm:h-28 sm:w-28 object-contain drop-shadow-sm"
                        />
                    ) : (
                        icon || <Layers3 size={100} strokeWidth={3} className="text-[#FF500D]" />
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="pt-4">
                <h3 className="mb-3.5 text-[20px] font-semibold leading-[1.35] tracking-tight text-[#FF500D]">
                    {title}
                </h3>

                <p className="text-[15px] sm:text-[16px] font-normal leading-[1.55] text-[#555555]">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default BLFeatureCard;

