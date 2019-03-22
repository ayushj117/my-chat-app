import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const GET_POSTS = gql`
  query GetPosts {
    getAllUser {
      id
      name
      password
    }
  }
`;

export default () => (
  <Query query={GET_POSTS}>
    {({ loading, error, data }) => {
      console.log(data);
      if (loading) return <p>Loading...</p>;
      if (error) return <p>error...</p>;
      return !loading && (
      <>
        <thead>
          <tr>
            <th>Author</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {data.getAllUser.map(post => (
            <tr key={post.id}>
              <td>{post.email}</td>
              <td>{post.password}</td>
            </tr>
          ))}
        </tbody>
        </>
    )
  }}
  </Query>
);