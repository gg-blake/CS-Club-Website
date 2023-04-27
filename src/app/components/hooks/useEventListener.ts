import { useEffect, useRef } from 'react';

type EventHandler = (event: Event) => void;

// Hook
export default function useEventListener(eventName: string, handler: EventHandler) {
    // Create a ref that stores handler
    const savedHandler = useRef<EventHandler>(() => {});
  
    // Update ref.current value if handler changes.
    // This allows our effect below to always get latest handler ...
    // ... without us needing to pass it in effect deps array ...
    // ... and potentially cause effect to re-run every render.
    useEffect(() => {
        if (!handler) return;
        savedHandler.current = handler;

        return function unMount() {
            savedHandler.current = () => {};
        }
    }, [handler]);
  
    useEffect(
      () => {
        // Make sure element supports addEventListener
        // On
        const isSupported = window && window.addEventListener;
        if (!isSupported) return;
  
        // Create event listener that calls handler function stored in ref
        if (!handler) return;

        const eventListener = (event: Event) => savedHandler.current(event);
  
        // Add event listener
        window.addEventListener(eventName, eventListener);
  
        // Remove event listener on cleanup
        return () => {
          window.removeEventListener(eventName, eventListener);
        };
      },
      [eventName, window] // Re-run if eventName or element changes
    );
}