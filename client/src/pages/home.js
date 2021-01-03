import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag';
import { Grid, Image, Transition  } from 'semantic-ui-react'

import PostCard from '../components/postcard.js'

const FETCH_POSTS_QUERY = gql`
   {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

function Home () {
  // data is undefined until the operation completes so it does not throw an erorr we initially set it to an empty object
    const {
        loading,
        data: {getPosts: posts} = {}
      } = useQuery(FETCH_POSTS_QUERY);

    return (
        <div>
        <Grid columns={3} divided>
        <Grid.Row><h1>Recent Posts</h1></Grid.Row>
        <Grid.Row>
        {loading ? (
            <h1>Loading posts..</h1>
          ) : (
            <Transition.Group>
              {posts &&
                posts.map((post) => (
                  <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                    <PostCard post={post} />
                  </Grid.Column>
                ))}
            </Transition.Group>
          )}
        </Grid.Row>

        </Grid>
        </div>
    )
}

export default Home;