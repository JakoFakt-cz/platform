import Link from "next/link";
import { Icon } from "@iconify/react";
import React from "react";

export const BackBtn = () => {
    return (
        <Link href="/dash" className="w-full flex gap-1 opacity-60 hover:opacity-100 transition-all duration-200 items-center">
            <Icon icon="prime:arrow-left" width="25" height="25" />
            <span>Zpět</span>
        </Link>
    );
};