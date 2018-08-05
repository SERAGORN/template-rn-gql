import React from 'react';
import { View, Text, TextInput, Button, AsyncStorage } from 'react-native';
import SocketIOClient from 'socket.io-client';

import { GiftedChat } from 'react-native-gifted-chat';



class ChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: [],
      send: "",
    };


    this.socket = SocketIOClient('http://192.168.1.35:3010');
  }

  componentDidMount() {
    this.renderMessage();
  }
  renderMessage = () => {
    this.socket.on('message', (message) => {
      // React will automatically rerender the component when a new message is added.
      this.setState({ message: message });
    });
  }
  sendTest = () => {
    this.socket.emit('sended', this.state.send)
  }

  render() {

    return (
      <View style={{top: 100}}>
        <Button style={{paddingTop: 100, top: 100}} onPress={()=>this.sendTest()} title="EMIT"/>
        <Text>{this.state.message}</Text>
      <TextInput onChangeText={(text) => this.setState({send:text})}/>
      <Button title="Send"/>
      </View>
    );
  }

}

module.exports = ChatPage;