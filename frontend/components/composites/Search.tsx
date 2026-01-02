"use client"
import {useState} from "react";

const Search = () => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <>
            <div
                className={`fixed inset-0 bg-primary/50 backdrop-blur-sm transition-all duration-500 ${
                    isFocused ? 'opacity-100 z-40' : 'opacity-0 -z-10 pointer-events-none'
                }`}
                onClick={() => setIsFocused(false)}
            />

            <div className={`w-full px-5 md:px-50 mt-10 ${isFocused ? 'relative z-50' : 'z-50'}`}>
                <input
                    className={`flex h-15 p-5 rounded-2xl border border-primary shadow-xl w-full bg-secondary text-lg font-medium focus:outline-none transition-all duration-500 ease-out ${
                        isFocused ? 'scale-110 -translate-y-50' : 'scale-100'
                    }`}
                    placeholder="Hledejte výrok, tvrzení, osobu..."
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </div>
        </>
    );
};

export default Search;
