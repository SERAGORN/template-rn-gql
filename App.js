import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Tabbar from 'react-native-tabbar-bottom';
import Router from './router';
import Home from './Home';
import Profile from './Profile';


const client = new ApolloClient({
  uri: "http://192.168.1.34:4000/graphql",
  opts: {
    mode: 'no-cors',
  },
});

export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      page: "HomeScreen",
    }
  }

  render() {
    return (
      <ApolloProvider client={client}>
      <View style={styles.container}>
        {
          // if you are using react-navigation just pass the navigation object in your components like this:
          // {this.state.page === "HomeScreen" && <MyComp navigation={this.props.navigation}>Screen1</MyComp>}
        }
        {this.state.page === "HomeScreen" && <Home></Home>}
        {this.state.page === "NotificationScreen" && <Router navigation={this.props.navigation}></Router>}
        {this.state.page === "ProfileScreen" && <Profile></Profile>}
        {this.state.page === "ChatScreen" && <Router navigation={this.props.navigation}></Router>}
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
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});