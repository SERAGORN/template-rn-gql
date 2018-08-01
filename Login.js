import React from 'react';
import { StyleSheet, Text, View, Button ,TextInput} from 'react-native';
import { Query , Mutation } from "react-apollo";
import gql from "graphql-tag";
import SocketIOClient from 'socket.io-client';

export default class Login extends React.Component {

    constructor() {
        super()
        this.state = {
          name: "",
          password: "",
          loading: 0,
          load: 1,
        }
        this.socket = SocketIOClient('http://192.168.1.38:3010');
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

  render() {
    return (
        
          <View style={styles.containerLogin}>
          {this.loginInput()}
            {this.passwordInput()}
            {this.LoginButton()}
            {this.RegisterButton()}
            {this.loginFetch()}
        </View>
            
    );
  }
}

const styles = StyleSheet.create({
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