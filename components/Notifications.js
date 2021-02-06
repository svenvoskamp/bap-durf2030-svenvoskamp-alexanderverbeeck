import React, { useState } from "react";
import { useRouter } from "next/router";
import { useFetchUser } from "../lib/user";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withApollo } from "../lib/withApollo";

const GET_USER_DATA = gql`
  query getUser($id: String!) {
    users(where: { id: { _eq: $id } }) {
      company
      company_name
      first_name
      last_name
      id
      last_name
      phone_number
      sector
      picture
      department
      name
      nickname
      donations(order_by: { created_at: asc }) {
        id
        created_at
        amount
        reward
        updated_at
        user {
          first_name
          last_name
        }
        project_id
        user_id
      }
      projects {
        id
        category {
          category
        }
        district {
          district
        }
        image
        impact
        tagline
        description
        reward_one
        reward_two
        reward_three
        create_finished
        donated
        crowdfunding_finished
        speech
        phase_id
        phase {
          phase
        }
        theme {
          theme
        }
        user {
          id
          first_name
          last_name
        }
        needs {
          id
          type
          need
        }
        title
      }
    }
    needs(order_by: { pending: desc, provided: asc }) {
      id
      type
      motivation
      need
      user_id
      provided
      other_user_id
      project_id
      otheruser {
        id
        first_name
        last_name
      }
      pending
      project {
        title
      }
    }
    feedbacks {
      id
      type
      motivation
      user_id
      other_user_id
      accepted
      pending
      project_id
      otheruser {
        id
        first_name
        last_name
      }

      project {
        title
      }
    }
  }
`;

const GET_CURRENT_USER = gql`
  query getCurrentUser($id: String!) {
    users(where: { id: { _eq: $id } }) {
      id
      name
      password
      picture
      first_name
    }
  }
`;

const Nots = ({ props }) => {
  console.log(props);
  const [content, setContent] = useState(0);
  const [selectedProject, setSelectedProject] = useState("");
  const { user, loading } = useFetchUser();
  let incoming = [];
  let outgoing = [];
  props.needs.map((need) => {
    if (need.user_id == props.users[0].id) {
      if (need.pending == true) {
        incoming.push(need);
      }
    }
  });
  props.feedbacks.map((feedback) => {
    if (feedback.user_id == props.users[0].id) {
      if (feedback.pending == true) {
        incoming.push(feedback);
      }
    }
  });
  props.users[0].projects.map((project) => {
    if (project.phase_id == 3) {
      if (!project.reward_one) {
        incoming.push(project);
      }
      if (project.donated > 1500 && project.crowdfunding_finished == false) {
        incoming.push(project);
      }
    }
  });
  props.needs.map((need) => {
    if (need.other_user_id == props.users[0].id) {
      if (need.pending == true) {
        outgoing.push(need);
      }
    }
  });

  props.feedbacks.map((feedback) => {
    if (feedback.other_user_id == props.users[0].id) {
      if (feedback.pending == true) {
        outgoing.push(feedback);
      }
    }
  });

  return (
    <>
      <p className="notification-number">{incoming.length}</p>
    </>
  );
};

const Notifications = ({ id }) => {
  console.log(id);
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_USER_DATA, {
    variables: { id: id },
  });
  if (loading) {
    console.log(loading);
  }
  if (error) {
    console.log(error);
  }

  if (data && !loading) {
    console.log(data);
    return <Nots props={data} />;
  }
  if (!data && !loading) {
    return <Nots props={data} />;
  }
  return <></>;
};

export default Notifications;
