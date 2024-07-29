import {useRef, useEffect } from 'react';

export function useInterval(callback, delay) {
    const savedCallback = useRef();

    //remembers the latest callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    //set up the interval
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if(delay !==null){
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}