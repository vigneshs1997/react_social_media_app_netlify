import React, { useEffect, useState } from 'react'

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({//windowSize called state is changing based on decreasing size of window
        width: undefined,
        height: undefined
    });
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        handleResize();
        window.addEventListener("resize", handleResize);//please listen the event 
        return () => window.removeEventListener("resize", handleResize);//to avoid memory leak  - revoke listening after work
    },[])
  return windowSize
}

export default useWindowSize
