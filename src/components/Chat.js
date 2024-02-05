import { useEffect, useState, useRef } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../config/firebase-config";
import styles from "../styles/chat.module.css";

export const Chat = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setNewMessages] = useState([]);
  const messageRef = collection(db, "messages");
  const messageListRef = useRef(null);

  useEffect(() => {
    const querryMessages = query(messageRef, where("room", "==", room));
    const unsubscribe = onSnapshot(querryMessages, (snapshot) => {
      let newMessages = [];
      snapshot.forEach((doc) => {
        newMessages.push({ ...doc.data(), id: doc.id });
      });
      // Sort messages by createdAt in ascending order (oldest to newest)
      newMessages.sort((a, b) => a.createdAt - b.createdAt);

      setNewMessages(newMessages);

      if (messageListRef) {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
      }
      
    });

    return () => unsubscribe();
  }, [room,messageRef]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;
    const user = localStorage.getItem("name");

    console.log(newMessage, serverTimestamp(), user, room);
    if (typeof room !== "string" || room.trim() === "") {
      console.error("Invalid room value:", room);
      return;
    }
    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: user,
      room,
    });
    
    setNewMessage("");

   
  };

  return (
    <div className={styles["chat-app"]}>
  <div ref={messageListRef} className={styles["message-list"]}>
    {messages.map((message) => (
      <div key={message.id} className={styles.message}>
        <div className={styles["message-header"]}>
          <span style={{fontSize:"11px"}}>
            {message.createdAt?.toDate()?.toLocaleString([], { hour: 'numeric', minute: 'numeric', hour12: false })}
          </span>
          <span style={{ marginLeft: "8px", fontSize:"12px"}}>{message.user}</span>
        </div>
        <div className={styles["message-body"]}>
          <strong style={{ marginTop: "8px" }}>{message.text}</strong>
        </div>
      </div>
    ))}
  </div>

  <form className={styles["new-message-form"]} onSubmit={handleSubmit}>
    <input
      className={styles["new-message-input"]}
      placeholder="your message"
      onChange={(e) => setNewMessage(e.target.value)}
      value={newMessage}
    />
    <button variant="contained" color="primary"className={styles.sendbutton}>Send</button>
  </form>
</div>
  );
};
