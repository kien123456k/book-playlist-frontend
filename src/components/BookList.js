import {useState} from 'react';
import {graphql} from 'react-apollo';
import {getBooksQuery} from '../queries';

//components
import BookDetails from './BookDetail';

const BookList = (props) => {
  const [selectedId, setSelectedId] = useState(null);
  const displayBooks = () => {
    const data = props.data;
    if (data.error) {
      return <h3>Opps! Something went wrong, please come back later!</h3>;
    }
    if (data.loading) {
      return <div>Loading books...</div>;
    }
    return data.books.map((book) => {
      return (
        <li
          key={book.id}
          onClick={(e) => {
            setSelectedId(book.id);
          }}
        >
          <button className='bttn-material-flat bttn-sm bttn-success'>{book.name}</button>
        </li>
      );
    });
  };
  return (
    <div>
      <ul id='book-list'>{displayBooks()}</ul>
      <BookDetails bookId={selectedId} />
    </div>
  );
};

export default graphql(getBooksQuery)(BookList);
