import { gql } from "@apollo/client";

export const GET_ITEMS = gql`
  query getItems {
    items {
      id
      title
      description
      price
      image
      url
      wisher
      cameTrue
    }
  }
`;

export const GET_ITEM = gql`
  query getItem($id: ID!) {
    item(id: $id) {
      id
      title
      description
      price
      image
      url
      wisher
      cameTrue
    }
  }
`;
