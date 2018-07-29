import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Tabbar from 'react-native-tabbar-bottom';
import Router from './router';
import Home from './Home';
import Profile from './Profile';
import Chat from './ChatPage';
import LoginPage from './Login';


const client = new ApolloClient({
  uri: "http://192.168.1.37:3001/graphql",
  opts: {
    mode: 'no-cors',
  },
});

export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      page: "HomeScreen",
      loggined: 0,
    }
  }

  renderStartApp = () => {
    return(
    
      <View style={styles.container}>
        {
          // if you are using react-navigation just pass the navigation object in your components like this:
          // {this.state.page === "HomeScreen" && <MyComp navigation={this.props.navigation}>Screen1</MyComp>}
        }
        {this.state.page === "HomeScreen" && <Home></Home>}
        {this.state.page === "NotificationScreen" && <Router navigation={this.props.navigation}></Router>}
        {this.state.page === "ProfileScreen" && <Profile></Profile>}
        {this.state.page === "ChatScreen" && <Chat></Chat>}
        {this.state.page === "SearchScreen" && <Text>Screen5</Text>}

        <Tabbar
          stateFunc={(tab) => {
            this.setState({page: tab.page})
            //this.props.navigation.setParams({tabTitle: tab.title})
          }}
          activePage={this.state.page}
          tabs={[
            {
              page: "HomeScreen",
              icon: "home",
            },
            {
              page: "NotificationScreen",
              icon: "notifications",
              badgeNumber: 11,
            },
            {
              page: "ProfileScreen",
              icon: "person",
            },
            {
              page: "ChatScreen",
              icon: "chatbubbles",
              badgeNumber: 7,
            },
            {
              page: "SearchScreen",
              icon: "search",
            },
          ]}
        />
      </View>
     
      )
  }

  loginPressed = () => {
    this.setState({
      loggined: 1
    })
  }
  loginStart = () => {
    if (this.state.loggined == 0) {
    return(
       <LoginPage>
      <View style={styles.container}>
        <TextInput style={styles.logininput} />
        <Button onPress={()=>this.loginPressed()} title="Login"/>

      </View>
      </LoginPage>
    )
  }
    if (this.state.loggined == 1) {
      return (
        this.renderStartApp()
      )
    }
    
  }


  render() {
    return (
      <ApolloProvider client={client}>
      {this.loginStart()}
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logininput: {
    width: 300,
    height: 60
  }
});