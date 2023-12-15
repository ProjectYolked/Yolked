import { useEffect, useState } from 'react';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            const isMobileDevice = window.innerWidth <= 768; // Adjust the threshold as needed

            setIsMobile(isMobileDevice);
        };

        // Initial check
        checkIsMobile();

        // Event listener for changes in window size
        window.addEventListener('resize', checkIsMobile);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);

    return isMobile;
};

export default useIsMobile;