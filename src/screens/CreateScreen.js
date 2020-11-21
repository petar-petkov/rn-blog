import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Context as BlogContext, Context } from '../context/BlogContext';

const CreateScreen = ({ navigation }) => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { addBlogPost } = useContext(Context);

  return (
    <View>
      <Text style={styles.label}>Title:</Text>
      <TextInput 
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)} 
      />

      <Text style={styles.label}>Content:</Text>
      <TextInput 
        style={styles.input}
        value={content}
        onChangeText={(content) => setContent(content)
      }/>
      <Button
        title="Create Post"
        onPress={() => {
          // The 3rd argument is a callback function to context
          addBlogPost(title, content, () => {
            navigation.navigate('Index');
          });

        }}

      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
    padding: 5,
    margin: 5
  },
  label: {
    fontSize: 22,
    marginBottom: 5,
    marginLeft: 5

  }
});

export default CreateScreen;