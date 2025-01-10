import { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function randomID(len: number = 5): string {
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  let result = '';
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function getUrlParams(url = window.location.href): URLSearchParams {
  const queryString = url.split('?')[1] || '';
  return new URLSearchParams(queryString);
}

const appID = parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID || '0', 10);
const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET || '';

if (!appID || !serverSecret) {
  console.error('Missing environment variables: NEXT_PUBLIC_ZEGO_APP_ID or NEXT_PUBLIC_ZEGO_SERVER_SECRET');
}

export default function VideoUIKit() {
  const roomID = getUrlParams().get('roomID') || randomID(5);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        randomID(10),
        `User_${randomID(5)}`
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: videoRef.current,
        sharedLinks: [
          {
            name: 'Personal link',
            url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
      });
    }
  }, [roomID]);

  return <div className="myCallContainer" ref={videoRef}></div>;
}
