import { gql } from "@apollo/client";

const QUERY_MATCHUPS = gql`
  query matchups($id: String) {
    matchups(_id: $id) {
      _id
      tech1
      tech2
      tech1_votes
      tech2_votes
    }
  }
`;

export { QUERY_MATCHUPS };
