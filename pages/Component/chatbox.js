import io from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import styles from '../../styles/Chat.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

let socket

export default function Chatbox(props) {
  const { username, chatId} = props
  console.log('aqui esta o username' + username);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    socketInitializer();
    return () => {
      socket.off("input-change");
    };
  }, []);

  const socketInitializer = async () => {

    await fetch("/api/socket");
    socket = io()
    socket.on("input-change", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      console.log('my msg' + msg.message)
      console.log(messages)
    });
  };
  
  const inputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const menssage = { message:inputRef.current.value,user:'you'}
    setMessages((prevMessages) => [...prevMessages, menssage]);
    console.log("Input value: ", inputRef.current.value);
    socket.emit("input-change", menssage);
    console.log('menssagem pos envio '+ messages.message)
  };

  return (
    <>
      <div className={styles.chatBox}>
      <div>
        <p>{username}</p>
      </div>
        {messages.map((message) => (
          <div className={styles.boxtwo} style={message.user === "you" ? { display: "flex", justifyContent: "end", width: "100%" } : { justifyContent: "start", width: "100%" }}>
            <div style={message.user === "you" ? { backgroundColor: "rgba(41, 41, 41, 0.044)", width: `${message.message.length * 10}px`, padding: 5, margin: 3 } : { backgroundColor: "rgba(122, 127, 131, 0.412)", width: `${message.message.length * 10}px`, padding: 5, margin: 3 }}>
              <p>{message.message}</p>
            </div>
          </div>
          ))}

        <div>
          <form style={{backgroundColor:'rgba(41, 41, 41, 0.044)'}} onSubmit={handleSubmit}>
            <input style={{width:'85%'}} type="text" ref={inputRef} />
            <button type="submit"><FontAwesomeIcon icon={faPaperPlane}/></button>
          </form>
        </div>
      </div>
    </>
  );
}
