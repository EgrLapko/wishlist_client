import { gql } from "@apollo/client";

export const DELETE_ITEM = gql`
  mutation deleteItem($id: ID!) {
    deleteItem(id: $id) {
      id
      title
    }
  }
`;

export const ADD_ITEM = gql`
  mutation addItem(
    $title: String!
    $description: String
    $image: String
    $url: String!
    $price: String!
    $wisher: String!
  ) {
    addItem(
      title: $title
      description: $description
      image: $image
      url: $url
      price: $price
      wisher: $wisher
    ) {
      title
      description
      image
      url
      price
      wisher
    }
  }
`;

export const UPDATE_ITEM = gql`
  mutation updateItem(
    $id: ID!
    $title: String
    $description: String
    $image: String
    $url: String
    $price: String
    $wisher: String
    $cameTrue: Boolean
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      image: $image
      url: $url
      price: $price
      wisher: $wisher
      cameTrue: $cameTrue
    ) {
      title
      description
      image
      url
      price
      wisher
      cameTrue
    }
  }
`;
