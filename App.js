import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Query , Mutation } from "react-apollo";
import gql from "graphql-tag";
import Tabbar from 'react-native-tabbar-bottom';
import Router from './router';
import Home from './Home';
import Profile from './Profile';
import Chat from './ChatPage';
import SocketIOClient from 'socket.io-client';


const client = new ApolloClient({
  uri: "http://192.168.1.38:3001/graphql",
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
      name: "",
      password: "",
      loading: 0,
      load: 1,
    }
    this.socket = SocketIOClient('http://192.168.1.38:3010');
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
        <View style={styles.containerLogin}>
          {this.loginInput()}
            {this.passwordInput()}
            {this.LoginButton()}
            {this.RegisterButton()}
            {this.loginFetch()}
        </View>
    )
  }
    if (this.state.loggined == 1) {
      return (
        this.renderStartApp()
      )
    }
    
  }


  loginFetch = () => {
    if (this.state.loading == 1) {
      return (        
      <Query
          query={gql`
          
            query userone($login: String!, $password: String!) {
              userone (login: $login, password: $password) {
              _id
              login
              name
              password
              }
            }
          
          `}
          variables = {{login: this.state.name, password: this.state.password}}
        >
          {({ loading, error, data}) => {

            if (loading) return <Text>LOAD</Text>;
            if (error) <Text>ERROR</Text>;
            if (data) {
              this.setState({
                loggined: 1
              })
            }
            return <Text>{data.userone.name}</Text>
          }}
        </Query>
        )
      }
  }
  
  dataMutation = () => {
  
      return(
          <Mutation mutation={gql`
          mutation createPost($title: String!, $content: String!){
          createPost(title: $title, content: $content) {
            _id,
            title,
            content
          }
          }
          `}>
          {(createPost, { data }) => (
            <View>
              <Button
                onPress={()=>{
                  createPost({ variables: { title: "KEK", content: "LOL" } });
                }} title="PLEASE">
              </Button>
            </View>
          )}
        </Mutation>
      )
  }
  
  
  
  loginInput = () => {
    return (
      <TextInput style={styles.logininput} 
      returnKeyLabel = {"next"}
      onChangeText={(text) => this.setState({name:text})}
      placeholder="login"/>
    )
  }
  passwordInput = () => {
    return(
      <TextInput style={styles.logininput} 
      returnKeyLabel = {"next"}
      onChangeText={(text) => this.setState({password:text})}
      placeholder="password"/>
    )
  }
  RegisterButton = () => {
    return(
      <View>
        <Button style={styles.buttonLogin} title="Register"/>
      </View>
    )
  }
  LoginButton = () => {
    return(
      <View>
        <Button onPress={() => this.loginAct()} style={styles.buttonLogin} title="Login"/>
      </View>
    )
  }
  loginAct = () => {
    this.setState({
      loading: 1
    }) 
  }
  logginedAct = () => {
    this.setState({
      loggined: 1
    })
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
  },
  containerLogin: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonLogin: {
      width: 200,
      height: 50,
      marginTop: 50
  },
  logininput: {
    width: 300,
    height: 60
  }
});