
import { gql } from '@apollo/client';

export const CREATE_ORDER = gql`
  mutation CreateOrder($customerInput: CustomerInput!, $items: [ItemsInput!]!) {
  createOrder(CustomerInput: $customerInput, items: $items) {
    order_id
    customer_id
    status
    totalAmount
    createdAt
    updatedAt
  }
  }
   `;

  export const GET_ORDERS = gql`
  query   get_Products {
    product_id
    name
    price
    Orginal_price
    features
    image
    bgColor
    popular
    description
    createdAt
    updatedAt
    hidden
  }
 `;


export const GET_REVIEWS = gql`
query GetReviews {
  getReviews {
    review_id
    name
    rating
    text
    Product_img
    conversation_img
    createdAt
    updatedAt
  }
}
`;
