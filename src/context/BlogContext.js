import createDataContext from './createDataContext';
import backendApi from '../api/backendApi';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'get_blog_posts':
      return action.payload;
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

const getBlogPosts = dispatch => {
  return async () => {
    const response = await backendApi.get('/posts');
    // response.data === [{post1}, {post2}, {}]

    dispatch({ type: 'get_blog_posts', payload: response.data });
  };
}

const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    await backendApi.post('/posts/', { title: title, content: content })

    // Check if we even have a callback
    if (callback) {
      callback();
    }

  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await backendApi.delete(`/post/${id}/`);
    dispatch({ type: 'delete_blog_post', payload: id });
  };

}

const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {

    await backendApi.put(`/post/${id}/`, { title: title, content: content });

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
  { getBlogPosts, addBlogPost, deleteBlogPost, editBlogPost },
  // Initial state value
  []
);
