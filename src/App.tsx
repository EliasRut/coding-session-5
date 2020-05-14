import React from 'react';
import { Header, Segment, Container, Input, Button, Form, List } from 'semantic-ui-react';
import './App.css';
import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCm60kMZo4ayzEOUTEIM_XjOmeilrWI_Rw",
  authDomain: "simplechatapp-481e5.firebaseapp.com",
  databaseURL: "https://simplechatapp-481e5.firebaseio.com",
  projectId: "simplechatapp-481e5",
  storageBucket: "simplechatapp-481e5.appspot.com",
  messagingSenderId: "625311044714",
  appId: "1:625311044714:web:8b6b429eefdb5adbc06613"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

interface ChatMessage {
  author: string;
  message: string;
  timestamp: number;
}

interface AppProps {
  headerText: string;
}

interface AppState {
  loadedChatMessages: Array<ChatMessage>;
}

class App extends React.Component<AppProps, AppState> {
  state = {
    loadedChatMessages: [{
      author: 'The white bunny',
      message: 'Test message until DB is loaded',
      timestamp: Date.now()
    }]
  } as AppState

  componentDidMount() {
    db.collection("ChatMessages").onSnapshot((query) => {
      const chatPostsDbDocs = query.docs;
      const chatPosts: Array<ChatMessage> = [];
      for (let i = 0; i < chatPostsDbDocs.length; i++) {
        const chatPost = chatPostsDbDocs[i].data() as ChatMessage;
        chatPosts.push(chatPost);
      }

      this.setState({
        loadedChatMessages: chatPosts
      });
    });
  }

  render() {
    const chatMessageItems = [];
    const sortedMessages = this.state.loadedChatMessages
      .sort((left, right) => left.timestamp - right.timestamp);
    for (let i = 0; i < sortedMessages.length; i++) {
      const chatMessage = sortedMessages[i];
      const timeStr = new Date(chatMessage.timestamp).toLocaleTimeString();
      chatMessageItems.push(
        <List.Item>
          <div className="metaData">[{timeStr}] {chatMessage.author}: </div>
          <div className="message">{chatMessage.message}</div>
        </List.Item>
      );
    }
    return (
      <div className="App">
        <Header>{this.props.headerText}</Header>
        <Container className="ChatContainer">
          <Segment raised={true} padded={true} textAlign="left">
            <List>
              {chatMessageItems}
            </List>
          </Segment>
          <Segment raised={true} padded={true} textAlign="left">
            <Header size="small">Create a new blog post.</Header>
            <Form>
              <List>
                <List.Item>
                  <Input
                  label="author"
                  id="author"
                  />
                </List.Item>
                <List.Item>
                  <Input
                    label="message"
                    id="message"
                  />
                </List.Item>
                <List.Item>
                  <Button
                    onClick={() => this.onSubmitButtonClick()}
                  >
                    Submit
                  </Button>
                </List.Item>
              </List>
            </Form>
          </Segment>
        </Container>
      </div>
    );
  }

  onSubmitButtonClick() {
    const authorInputElement = document.getElementById('author') as HTMLInputElement;
    const messageInputElement = document.getElementById('message') as HTMLInputElement;
    const authorValue = authorInputElement.value;
    const messageValue = messageInputElement.value;

    authorInputElement.value = "";
    messageInputElement.value = "";
    db.collection("ChatMessages").doc().set({
      message: messageValue,
      author: authorValue,
      timestamp: Date.now()
    });
  }
}

export default App;