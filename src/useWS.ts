import {useState, useRef, useEffect} from "react";

const useWS = () => {
  const ws = useRef<WebSocket | null>(null);

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // close websocket on unmount
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const establishWebSocketConnection = (
    handleMessage?: (message: any) => void,
  ) => {
    if (ws.current) {
      ws.current.close();
    }

    ws.current = new WebSocket("wss://ws.blockchain.info/inv");

    ws.current.onopen = () => {
      console.log("WebSocket connected");
      ws.current?.send(JSON.stringify({op: "unconfirmed_sub"}));
      setIsConnected(true);
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      handleMessage?.(message);
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
    };
  };

  const disconnectWebSocket = () => {
    if (ws.current) {
      ws.current.close();
    }
  };

  return {isConnected, disconnectWebSocket, establishWebSocketConnection};
};

export default useWS;
