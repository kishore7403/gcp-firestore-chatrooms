import { useState } from "react";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {db} from "../config/firebase-config";
import './Home.css';

export const Chat = (props)=>{

    const {room} = props
    const [newMessage,setNewMessage]=useState("");

    const messageRef=collection(db,"messages")
    const handleLSubmit= async(e) =>{
        e.preventDefault();
        if (newMessage==="") return;
        const user = localStorage.getItem("name");

        console.log(newMessage,serverTimestamp(),user,room)
        if (typeof room !== 'string' || room.trim() === '') {
            console.error("Invalid room value:", room);
            return;
        }
        await addDoc(messageRef,{
            text:newMessage,
            createdAt: serverTimestamp(),
            user: user,
            room,
        })

        setNewMessage("")
    }

    return <div className="chat-app"> 
    <form onSubmit={handleLSubmit} className="new-message-form">
        <input className="new-message-form"
        placeholder="Message here..."
        onChange={(e)=> setNewMessage(e.target.value)}
        value={newMessage}/>
    <button type="submit" className="send-button"> send</button>
    </form>
    </div>
}