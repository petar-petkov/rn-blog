import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const BlogPostForm = (props) => {

  const [title, setTitle ] = useState(props.initialValues.title)
  const [content, setContent] = useState(props.initialValues.content)

  return (
    <View>
      <Text>Post ID:  </Text>
      <Text style={styles.label}>Title:</Text>
      <TextInput 
        style={styles.input}
        value={title}
        onChangeText={(newTitle) => setTitle(newTitle)} 
      />

      <Text style={styles.label}>Content:</Text>
      <TextInput 
        style={styles.input}
        value={content}
        onChangeText={(newContent) => setContent(newContent)
      }/>
      <Button
        title="Save"
        onPress={() => props.onSubmit(title, content)}
      />
    </View>
  )
};

BlogPostForm.defaultProps = {
  initialValues: {
    title: '',
    content: ''
  }
};

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

export default BlogPostForm;