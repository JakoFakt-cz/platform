import Link from "next/link";
import { Icon } from "@iconify/react";
import React from "react";

interface DashboardCardProps {
    href: string;
    icon: string;
    title: string;
    children: React.ReactNode;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ href, icon, title, children }) => {
    return (
        <Link href={href} className="h-full">
            <div className="flex flex-col border border-primary rounded-lg p-4 hover:bg-primary hover:text-secondary cursor-pointer group transition-all">
                <div className="flex items-center gap-1">
                    <Icon icon={icon} className="transition-transform duration-200 text-xl" />
                    <h2 className="font-semibold">{title}</h2>
                </div>
                <div className="overflow-hidden text-sm transition-all duration-300 ease-in-out max-h-0 opacity-0 group-hover:mt-2 group-hover:max-h-40 group-hover:opacity-100">
                    {children}
                </div>
            </div>
        </Link>
    );
};