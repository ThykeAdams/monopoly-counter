import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import io from "socket.io-client";
function useSocket(url: string) {
  const [socket, setSocket] = useState<any>(null);
  useEffect(() => {
    const socketIo = io(url);
    setSocket(socketIo);
    function cleanup() {
      socketIo.disconnect();
    }
    return cleanup;
  }, []);

  return socket;
}
function MyApp({ Component, pageProps }: AppProps) {
  pageProps.socket = useSocket("http://10.0.0.234:3001");
  return <Component {...pageProps} />;
}

export default MyApp;
