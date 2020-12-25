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

export default function News() {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [updateTodo] = useMutation(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
    console.log(data)
  return <div className="row">
      {data.newses.map(({ id, title, body }:any) => {
        return (
          <div className="card col xl3 l4 s6" style={{padding: "0 .75rem"}}>
            <div className="card-image waves-effect waves-block waves-light">
              <img className="activator" src="https://i1.wp.com/katzenworld.co.uk/wp-content/uploads/2019/06/funny-cat.jpeg?fit=1920%2C1920&ssl=1"/>
            </div>
            <div className="card-content">
              <span className="card-title activator grey-text text-darken-4" style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', marginRight: '20px'}}>{title}<i className="material-icons right">more_vert</i></span>
              <p><a href="#">Жмяк</a></p>
            </div>
            <div className="card-reveal">
              <span className="card-title grey-text text-darken-4">{title}<i className="material-icons right">close</i></span>
              <p>{body}</p>
            </div>
          </div>
        );
      })}
    </div>
  
  
}
