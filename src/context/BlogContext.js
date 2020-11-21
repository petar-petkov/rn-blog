import { call } from 'react-native-reanimated';
import createDataContext from './createDataContext';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'add_blog_post':
      return [
        ...state,
        { 
          id: Math.floor(Math.random() * 999999),
          title: action.payload.title,
          content: action.payload.content
        }
      ];
    case 'delete_blog_post':
      return state.filter(
        (blogPost) => blogPost.id !== action.payload
      );
    case 'edit_blog_post':
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id
          ? action.payload
          : blogPost;

        /*
        // If alternative 
        if (blogPost.id === action.payload.id) {
          return action.payload;
        } else {
          return blogPost;
        }
        */
      })
    default:
      return state;
  }
};

const addBlogPost = (dispatch) => {
  return (title, content, callback) => {
    dispatch({
      type: 'add_blog_post',
      // Avoiding shorthand just for readability
      payload: {title: title, content: content}
    });

    // Check if we even have a callback
    if (callback) {
      callback();
    }

  };
};

const deleteBlogPost = (dispatch) => {
  return (id) => {
    dispatch({ type: 'delete_blog_post', payload: id })
  };

}

const editBlogPost = (dispatch) => {
  return (id, title, content, callback) => {
    dispatch({
      type: 'edit_blog_post',
      // Avoiding shorthand just for readability
      payload: {id: id, title: title, content: content}
    });

    // Check if we even have a callback
    if (callback) {
      callback();
    }

  };
};

export const { Context, Provider } = createDataContext(
  // Reducer...
  blogReducer,
  // Actions
  { addBlogPost, deleteBlogPost, editBlogPost },
  // Initial state value
  [{ title: 'Test Post', content: 'Test Content', id: 1 }]
);
