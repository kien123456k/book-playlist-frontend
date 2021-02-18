import {useState} from 'react';
import {graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash';
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/index';

const displayAuthors = (props) => {
  var data = props.getAuthorsQuery;
  if (data.error) {
    return <option disabled>None</option>;
  }
  if (data.loading) {
    return <option disabled>Loading authors</option>;
  }
  return data.authors.map((author) => {
    return (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    );
  });
};

const AddBook = (props) => {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');
  const submitForm = (e) => {
    e.preventDefault();
    props.addBookMutation({
      variables: {
        name: name,
        genre: genre,
        authorId: authorId,
      },
      refetchQueries: [{query: getBooksQuery}],
    });
  };
  return (
    <form id='add-book' onSubmit={submitForm}>
      <div className='field'>
        <label>Book name:</label>
        <input type='text' onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className='field'>
        <label>Genre:</label>
        <input type='text' onChange={(e) => setGenre(e.target.value)} required />
      </div>
      <div className='field'>
        <label>Author:</label>
        <select onChange={(e) => setAuthorId(e.target.value)} required>
          <option>Select author</option>
          {displayAuthors(props)}
        </select>
      </div>
      <button className='bttn-material-circle bttn-md bttn-danger'>+</button>
    </form>
  );
};

export default compose(
  graphql(getAuthorsQuery, {name: 'getAuthorsQuery'}),
  graphql(addBookMutation, {name: 'addBookMutation'})
)(AddBook);
