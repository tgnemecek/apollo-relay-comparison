import React from "react";
import { Link } from "react-router-dom";
import {
  gql,
  useQuery,
  useMutation,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
import ContactList from "../components/ContactList";
import Form from "../components/Form";

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache(),
});

export const GET_CONTACTS = gql`
  query contacts {
    viewer {
      allContacts {
        edges {
          node {
            name
            email
            id
          }
        }
      }
    }
  }
`;

const CREATE_CONTACT = gql`
  mutation createContact($input: ContactInput!) {
    createContact(input: $input) {
      contactEdge {
        __typename
        node {
          id
          email
          name
        }
      }
    }
  }
`;

const Main = () => {
  const { loading, error, data } = useQuery(GET_CONTACTS, { client });
  const [createContact, { data: mutationData }] = useMutation(CREATE_CONTACT, {
    client,
  });

  const getEdges = () => {
    if (data) {
      return [
        ...data.viewer.allContacts.edges,
        mutationData && mutationData.createContact.contactEdge,
      ].filter(Boolean);
    }
    return [];
  };

  return (
    <div className="Main">
      <Link to="/relay" className="switch">
        Switch to Relay
      </Link>
      <Link to="/apollo" className="switch">
        Switch to Apollo HOC
      </Link>
      <div className="container">
        <ContactList edges={getEdges()} />
        <Form
          onSubmit={(name, email) => {
            createContact({
              variables: {
                input: {
                  name,
                  email,
                },
              },
            });
          }}
        />
      </div>
    </div>
  );
};

export default Main;
