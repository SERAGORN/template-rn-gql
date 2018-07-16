import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Query } from "react-apollo";
import gql from "graphql-tag";

export default class Home extends React.Component {



  render() {
    return (
        <Query
        query={gql`
        {
          courses {
            id
            title
            author
            description
            topic
            url
          }
        }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <Text>Loading...</Text>;
          if (error) return <Text>Error :(</Text>;
          return data.courses.map(({  title, author }) => (
            <View>
              <Text>{`${title} by ${author}`}</Text>
            </View>
          ));
        }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});