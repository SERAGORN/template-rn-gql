import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Query } from "react-apollo";
import gql from "graphql-tag";

export default class Home extends React.Component {

    constructor() {
        super()
        this.state = {
          refresh: 0,
        }
      }

dataFetching = () => {
    if (this.state.refresh == 1) {
        
    return (        
    <Query
        query={gql`
        {
            posts {
            _id
            title
            content
          }
        }
        `}
      >
        {({ loading, error, data, refetch }) => {
          if (loading) return <Text>Loading...</Text>;
          if (error) return <Text>Error :(</Text>;
          return (
            <View>
              {data.posts.map(({  title, content }) => (
            <View>
              <Text>{`${title} by ${content}`}</Text>
            </View>
          ))}
          <Button onPress={()=>refetch()} title="!REFETCH"></Button>
          </View>
        )
        }}
      </Query>
      )
    }
}

stateRemove = () => {
 this.setState({
     refresh: 0
 })
}
stateRender = () => {
    this.setState({
        refresh: 1
    })
   }
  render() {
    return (
        <View style={styles.container}>
            <Button style={styles.button} onPress={()=>(this.stateRemove())} title="remove">
            </Button>
            <Button style={styles.button} onPress={()=>(this.stateRender())} title="Render">
            </Button>
            {this.dataFetching()}

            
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%"
  },
  button: {
      top: "200px",
      width: 30,
      height: 50,
      marginTop: 50
  }
});