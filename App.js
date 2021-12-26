import './App.css';
import { React, useState, useEffect } from 'react';
import Message from './Components/Message';
import { FormControl, Input, Button, InputLabel } from '@mui/material';
import db from './Components/db';
import { addDoc, collection, query, onSnapshot, orderBy } from "firebase/firestore"
import { serverTimestamp } from "firebase/firestore";
import FlipMove from 'react-flip-move';
import image from './logo-128@2x.png'
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
// import firebase from 'firebase/compat/app';



function App() {
  //state 
  //input 
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    { userName: "", message: "" }]);

  //user name helps us to know whos sending the text 
  const [userName, setUserName] = useState('');

  const handleClick = (event) => {
    event.preventDefault();
    //Adding timestamp and pushing the data into the firestore
    addDoc(collection(db, "messages"),
      {
        message: message,
        userName: userName,
        timeStamp: serverTimestamp()
      })
    setMessage("")
  }

  //useEffect with no constraint is to run this when the component mount 
  useEffect(() => {
    const name = prompt("Please enter User Name")
    if (name !== "")
      setUserName(name);
    else {
      setUserName("unknown")
      return
    }
  }, [])

  //to retrieve the data from the firebase
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timeStamp", "desc"))
    const unsub = onSnapshot(q, (querySnapshot) => {
      setMessages(querySnapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
    }
    )

  }, [])

  return (
    <div className='App'>
      {/*the Input form*/}
      <img style={{ height: "100px", width: "100px" }} src={image}></img>
      <h2>{`Hey ${userName}, Welcome to Messenger!!`}</h2>
      <form className="app__form">
        <FormControl className="app__formControl">

          <Input
            className="app__input"
            placeholder='Enter Message'
            id="my-input"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <IconButton className="app__iconButton" disabled={!Input} type="submit" variant="contained" onClick={handleClick}
          ><SendIcon /></IconButton>

        </FormControl>
      </form>
      <FlipMove>
        {/* To display messsages  */}
        {messages.map(message => (<Message message={message.message} key={message.id} userName={userName} />))}
      </FlipMove>
    </div >
  );
}

export default App;
