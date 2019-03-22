import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      author
      body
    }
  }
`;

export default () => (
  <Query query={GET_POSTS}>
    {({ loading, data }) => !loading && (
      <>
        <thead>
          <tr>
            <th>Author</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {data.posts.map(post => (
            <tr key={post.id}>
              <td>{post.author}</td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>
        </>
    )}
  </Query>
);