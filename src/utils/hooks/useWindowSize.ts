import { useEffect, useState } from "react";

export default function useWindowSize() {
    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    const changeWindowSize = () => {
        setSize({ width: window.innerWidth, height: window.innerHeight })
    };

    useEffect(() => {
        console.log("Attach");
        window.addEventListener('resize', () => {
            changeWindowSize()
        });

        return () => {
            window.removeEventListener('resize', () => {
                changeWindowSize()
            });
        }
    }, []);

    return size;
}
