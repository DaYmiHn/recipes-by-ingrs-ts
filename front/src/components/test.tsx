import { useMutation, gql, useQuery } from '@apollo/client';

const EXCHANGE_RATES = gql`
  mutation {
    createNews(input: {
      title: "andy",
      body: "hope is a good thing",
    }) {
      id
      title
    }
  }
`;
const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String!, $type: String!) {
    updateTodo(id: $id, type: $type) {
      id
      type
    }
  }
`;
const GET_TODOS = gql`
    {
    newses {
      id
      title
      body
    }
  }
`;

export default function Todos() {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [updateTodo] = useMutation(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
    console.log(data)
  return data.newses.map(({ id, title }:any) => {
    let input:any;

    return (
      <div key={id}>
        <p>{title}</p>
        <form
          onSubmit={e => {
            e.preventDefault();
            updateTodo({ variables: { id, title: input.value } });
            input.value = '';
          }}
        >
          <input
            ref={node => {
              input = node;
            }}
          />
          <button type="submit">Update Todo</button>
        </form>
      </div>
    );
  });
}
