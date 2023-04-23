import styles from "../../styles/Chat.module.css";
import Image from "next/image";
import imagem from "../../public/315281570_1330066611099327_3957239708455660094_n.jpg";
import Chatbox from "../Component/chatbox";
import { useState, useEffect } from "react";

export default function Chat(props) {
  const [chat, setChat] = useState(false);
  const { user, chatId } = props;
  const chatFunc = () => {
    setChat(true);
  };
  return (
    <>
      <div className={styles.chat}>
        <div className={styles.chatHeader}>
          <p>Contatos</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div onClick={chatFunc} className={styles.userBox}>
            <div>
              <Image
                src={imagem}
                width={40}
                height={40}
                style={{ borderRadius: 20 }}
              />
            </div>
            <div>
              <p>{user.username}</p>
            </div>
          </div>
        </div>
      </div>
      {chat && <Chatbox username={user.username} chatId={chatId.chatId} />}
    </>
  );
}
