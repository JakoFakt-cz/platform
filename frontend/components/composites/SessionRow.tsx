import { Icon } from "@iconify/react";

interface SessionRowProps {
    device: string;
    lastLogin: string;
    ipAddress: string;
    location: string;
    icon: string;
}

export default function SessionRow({ device, lastLogin, ipAddress, location, icon }: SessionRowProps) {
    return (
        <tr className="border-b border-primary/10">
            <td className="p-2 flex items-center gap-2">
                <Icon icon={icon} className="text-2xl" />
                <span>{device}</span>
            </td>
            <td className="p-2">{lastLogin}</td>
            <td className="p-2">{ipAddress}</td>
            <td className="p-2">{location}</td>
            <td className="p-2 text-right">
                <button className="text-red-500 hover:scale-120 transition-all duration-200 cursor-pointer">
                    <Icon icon="mdi:logout" />
                </button>
            </td>
        </tr>
    );
}