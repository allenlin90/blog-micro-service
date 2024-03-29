import axios from 'axios';
import { useState } from 'react';

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      content,
    });

    setContent('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>New Comment</label>
          <input
            value={content}
            className='form-control'
            onChange={(e) => setContent(e.target.value)}
          />
          <button className='btn btn-primary'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CommentCreate;
