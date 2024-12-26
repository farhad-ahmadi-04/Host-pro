import { useEffect, useRef } from "react";

function useOutsideClick(handler, listenCapturing = true) {
    const ref = useRef();

    useEffect(function () {
        function closeAction(e) {
            if (ref.current && !ref.current.contains(e.target))
                handler();
        }

        document.addEventListener("click", closeAction, listenCapturing);

        return () => document.removeEventListener("click", closeAction, listenCapturing);
    }, [handler, listenCapturing]);

    return ref
}

export default useOutsideClick