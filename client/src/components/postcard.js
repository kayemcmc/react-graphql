import React from 'react'
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

function PostCard({post:{ body, createdAt, id, username, likeCount, commentCount, likes}}) {
  const likePost = () => console.log('I like it')
  const commentOnPost = () => console.log('I comment all day')
  return(
    <Card fluid>
    <Card.Content>
      <Image
        floated='right'
        size='mini'
        src='https://react.semantic-ui.com/images/avatar/large/molly.png'
      />
      <Card.Header>{username}</Card.Header>
      <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)} ago</Card.Meta>
      <Card.Description>
        {body}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
    <Button as='div' labelPosition='right'>
    <Button color='teal' basic onClick={likePost}>
      <Icon name='heart' />
    </Button>
    <Label as='a' basic color='teal' pointing='left'>
     {likeCount}
    </Label>
    <Button color='blue' basic onClick={commentOnPost}>
    <Icon name='comments' />
  </Button>
  <Label as='a' basic color='blue' pointing='left'>
   {commentCount}
  </Label>
  </Button>
    </Card.Content>
  </Card>
  )
}

export default PostCard