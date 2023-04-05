import { useEffect, useRef } from 'react';

type EventHandler = (event: Event) => void;

// Hook
export default function useEventListener(eventName: string, handler: EventHandler, element = window) {
    // Create a ref that stores handler
    const savedHandler = useRef<EventHandler>(() => {});
  
    // Update ref.current value if handler changes.
    // This allows our effect below to always get latest handler ...
    // ... without us needing to pass it in effect deps array ...
    // ... and potentially cause effect to re-run every render.
    useEffect(() => {
        if (!handler) return;
        savedHandler.current = handler;
    }, [handler]);
  
    useEffect(
      () => {
        // Make sure element supports addEventListener
        // On
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;
  
        // Create event listener that calls handler function stored in ref
        if (!handler) return;

        const eventListener = (event: Event) => savedHandler.current(event);
  
        // Add event listener
        element.addEventListener(eventName, eventListener);
  
        // Remove event listener on cleanup
        return () => {
          element.removeEventListener(eventName, eventListener);
        };
      },
      [eventName, element] // Re-run if eventName or element changes
    );
}