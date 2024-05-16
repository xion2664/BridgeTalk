import { handleSubscribeNotification, useUserStore } from '@/pages';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { decodeToken } from '@/shared';
import { useEffect } from 'react';

export function AppSseSubscriber() {
  const userStore = useUserStore();

  useEffect(() => {
    // get Event Source
    let sseEventSource = userStore.sseEventSource;
    const accessToken = decodeToken('access');

    if (!accessToken) return;

    if (!sseEventSource) {
      sseEventSource = handleSubscribeNotification();

      sseEventSource.onmessage = (e) => {
        console.log(e);
      };

      sseEventSource.onerror = (e) => {
        console.log(e);
      };

      userStore.setSseEventSource(sseEventSource);
      console.log(sseEventSource);
    }

    return () => {
      if (sseEventSource) {
        sseEventSource.close();
      }
    };
  }, [userStore.accessToken]);

  return <></>;
}
