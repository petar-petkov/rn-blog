import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
import { EvilIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 

const IndexScreen = ({ navigation }) => {
  const { state, getBlogPosts, deleteBlogPost } = useContext(BlogContext);

  useEffect(() => {
    getBlogPosts();

    // We want to run the get request each time we visit the index
    const listener = navigation.addListener('didFocus', () => {
      getBlogPosts();
    });

    // If this function ever executes it means that Index Screen
    // was removed entirely from the stack, so we need to
    // delete the listener to avoid memory leaks
    return () => {
      listener.remove();
    };
    // this array is here to signal we want to run our function only once
  }, []);

  return (
    <View style={styles.container}>
      <FlatList 
        data={state}
        keyExtractor={(blogPost) => blogPost.title}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id })}>
              <View style={styles.row}>
                <Text style={styles.title}>{item.id} - {item.title}</Text>
                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                  <EvilIcons name="trash" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  );
};

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <View style={styles.iconContainer}>
          <AntDesign name="plus" style={styles.createIcon} />
        </View>
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 15
  },
  title: {
    fontSize: 18
  },
  icon: {
    fontSize: 35,
    color: 'red'
  },
  createIcon: {
    fontSize: 30,
    color: 'black',
  },
  iconContainer: {
    marginRight: 10
  }
})

export default IndexScreen;