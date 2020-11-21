import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons'; 

const ShowScreen = ({ navigation }) => {
  const id = navigation.getParam('id')

  const { state } = useContext(BlogContext);

  const blogPost = state.find((blogPost) => blogPost.id === id );

  return (
    <View>
      <Text>{blogPost.title}</Text>
      <Text>{blogPost.content}</Text>
    </View>
  );
};

ShowScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity 
        onPress={() => 
          navigation.navigate('Edit', { id: navigation.getParam('id') })
        }
      >
        <View style={styles.iconContainer}>
          <Feather name="edit" style={styles.icon} />
        </View>
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  icon: {
    fontSize: 25,
    color: 'black'
  },
  iconContainer: {
    marginRight: 10
  }
});

export default ShowScreen;