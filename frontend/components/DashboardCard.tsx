import Link from "next/link";
import { Icon } from "@iconify/react";
import React from "react";

interface DashboardCardProps {
    href: string;
    icon: string;
    title: string;
    children: React.ReactNode;
    disabled?: boolean;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ href, icon, title, children, disabled = false }) => {
    const cardContent = (
        <div className={`flex flex-col border rounded-lg p-4 group transition-all h-full ${
            disabled 
                ? "border-primary/30 bg-primary/5 cursor-not-allowed opacity-60" 
                : "border-primary hover:bg-primary hover:text-secondary cursor-pointer"
        }`}>
            <div className="flex items-center gap-1">
                <Icon icon={icon} className={`transition-transform duration-200 text-xl ${disabled ? "text-primary/50" : ""}`} />
                <h2 className="font-semibold">{title}</h2>
                {disabled && <span className="text-xs ml-auto bg-primary/20 text-primary/70 px-2 py-0.5 rounded">Brzy</span>}
            </div>
            <div className={`overflow-hidden text-sm transition-all duration-300 ease-in-out max-h-0 opacity-0 group-hover:mt-2 group-hover:max-h-40 group-hover:opacity-100 ${disabled ? "group-hover:max-h-0 group-hover:opacity-0" : ""}`}>
                {children}
            </div>
        </div>
    );

    if (disabled) {
        return <div className="h-full">{cardContent}</div>;
    }

    return (
        <Link href={href} className="h-full">
            {cardContent}
        </Link>
    );
};