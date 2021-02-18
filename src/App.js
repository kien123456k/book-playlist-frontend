import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

// components
import BookList from './components/BookList';
import AddBook from './components/AddBook';

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id='main'>
        <h1>Kirin Tran's Book PlayList</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
