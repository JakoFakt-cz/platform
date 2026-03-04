'use client';

import { useState } from 'react';

interface SettingsSwitchProps {
    title: string;
    description: string;
}

export default function SettingsSwitch({ title, description }: SettingsSwitchProps) {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <label
            className="w-full inline-flex items-center justify-between cursor-pointer p-4 bg-white/5 border border-primary/20 hover:border-primary/50 gap-7 rounded-xl transition-all group">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="sr-only peer"
            />
            <div className="select-none">
                <p className="font-semibold text-primary mb-1">{title}</p>
                <p className="text-xs font-normal text-gray-500">{description}</p>
            </div>
            <div
                className="shrink-0 relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner">
            </div>
        </label>
    );
}
