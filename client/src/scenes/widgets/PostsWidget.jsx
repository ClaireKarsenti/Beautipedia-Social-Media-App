import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../state/index';
import PostWidget from './PostWidget';

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts || []);
  const token = useSelector((state) => state.token);

  const fetchPosts = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      console.error(`Error fetching ${isProfile ? 'user' : ''} posts:`, error);
    }
  };

  useEffect(() => {
    const apiUrl = isProfile
      ? `https://beautipedia-clairekarsenti.onrender.com/posts/${userId}/posts`
      : 'https://beautipedia-clairekarsenti.onrender.com/posts';

    fetchPosts(apiUrl);
  }, [userId, isProfile, token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {Array.isArray(posts) &&
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )}
    </>
  );
};

export default PostsWidget;
