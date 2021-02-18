import {graphql} from 'react-apollo';
import {getBookQuery} from '../queries';

const displayBookDetail = (props) => {
  const {book} = props.data;
  if (book) {
    return (
      <div>
        <h2>{book.name}</h2>
        <p>
          Genre: <span>{book.genre}</span>
        </p>
        <p>
          Author: <span>{book.author.name}</span>
        </p>
        <p>All books by this author:</p>
        <ul className='other-books'>
          {book.author.books.map((item) => {
            return <li key={item.id}>{item.name}</li>;
          })}
        </ul>
      </div>
    );
  } else {
    return <h3>No book selected...</h3>;
  }
};

const BookDetail = (props) => {
  return <div id='book-details'>{displayBookDetail(props)}</div>;
};

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId,
      },
    };
  },
})(BookDetail);
