import {useState, useRef, useEffect} from "react";
import {WSMessage} from "../types";

const BLOCKCHAIN_INFO_WS_URL = "wss://ws.blockchain.info/inv";
const SUBSCRIBE_MESSAGE = JSON.stringify({op: "unconfirmed_sub"});

const useTransactionsData = () => {
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
    handleMessage?: (message: WSMessage) => void,
  ) => {
    if (ws.current) {
      ws.current.close();
    }

    ws.current = new WebSocket(BLOCKCHAIN_INFO_WS_URL);

    ws.current.onopen = () => {
      console.log("WebSocket connected");
      ws.current?.send(SUBSCRIBE_MESSAGE);
      setIsConnected(true);
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("WebSocket message:", message.op);
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

export default useTransactionsData;
