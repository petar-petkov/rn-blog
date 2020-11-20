import React, { useContext } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';

const IndexScreen = () => {
  const { state, addBlogPost } = useContext(BlogContext);

  return (
    <View style={styles.container}>
      <Text>Index</Text>
      <Button
        title="Add Post" 
        // This can be shortened to just {addBlogPost}
        // it's like that for readability 
        onPress={() => addBlogPost()}
      />
      <FlatList 
        data={state}
        keyExtractor={(blogPost) => blogPost.title}
        renderItem={({ item }) => {
          return (
            <Text>{item.title}</Text>
          )
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({

})

export default IndexScreen;