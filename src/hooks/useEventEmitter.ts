import { useCallback, useMemo, useRef } from 'react';
import { getUniqueId } from '../utils/getUniqueId';

type EventsRefType = { [eventName: string]: { id: string; cb: Function }[] };

export const useEventEmitter = () => {
  const eventsRef = useRef<EventsRefType>({});

  const unsubscribe = useCallback((events: string[], ids: string[]) => {
    events.forEach((event) => {
      const eventFunctions = eventsRef.current[event] || [];
      const newEventFunctions = eventFunctions.filter(({ id }) => !ids.includes(id));

      eventsRef.current = {
        ...eventsRef.current,
        [event]: newEventFunctions,
      };
    });
  }, []);

  const subscribe = useCallback((event: string | string[], cb: (payload?: any) => void) => {
    const events = typeof event === 'string' ? [event] : event;
    const functionIds = [] as string[];

    events.forEach((event) => {
      const previousWatchCbs = eventsRef.current[event] || [];
      const id = getUniqueId();
      functionIds.push(id);

      eventsRef.current = {
        ...eventsRef.current,
        [event]: [...previousWatchCbs, { id, cb }],
      };
    });

    return () => unsubscribe(events, functionIds);
  }, []);

  const dispatch = useCallback((event: string, payload?: any) => {
    eventsRef.current[event] && eventsRef.current[event].forEach(({ cb }) => cb(payload));
  }, []);

  const value = useMemo(
    () => ({
      subscribe,
      dispatch,
    }),
    [subscribe, dispatch],
  );

  return value;
};
