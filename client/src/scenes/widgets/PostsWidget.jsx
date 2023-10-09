import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, useTheme } from '@mui/material';
import { setPosts } from '../../state/index';
import PostWidget from './PostWidget';

const PostsWidget = ({ userId, isProfile = false, searchBar }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts || []);
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const main = palette.neutral.main;

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

  const filteredPosts = searchBar
  ? posts.filter((post) => {
      const postDescription = post?.description?.toLowerCase();
      const search = searchBar.toLowerCase();

      const descriptionMatch = postDescription?.includes(search);
      const firstNameMatch = post?.firstName?.toLowerCase()?.includes(search);
      const lastNameMatch = post?.lastName?.toLowerCase()?.includes(search);

      return descriptionMatch || firstNameMatch || lastNameMatch;
    })
  : posts;


  return (
    <>
      {filteredPosts.length === 0 ? (
        <Typography color={main} sx={{ mt: '1rem' }}>
          Sorry, there is no match.
        </Typography>
      ) : (
        filteredPosts.map(
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
        )
      )}
    </>
  );
};

export default PostsWidget;
