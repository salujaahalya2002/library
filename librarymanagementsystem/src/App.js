import React, { useState } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [newBook, setNewBook] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [newStudent, setNewStudent] = useState('');

  const handleAddBook = () => {
    if (newBook) {
      setBooks([...books, { title: newBook }]);
      setNewBook('');
    }
  };

  const handleBorrowBook = () => {
    if (selectedStudent && books.length > 0) {
      const bookToBorrow = books[0];
      setBorrowedBooks([...borrowedBooks, { student: selectedStudent, book: bookToBorrow }]);
      setBooks(books.slice(1)); // Remove the borrowed book from the list
    }
  };

  const handleReturnBook = (book) => {
    setBooks([...books, book]);
    setBorrowedBooks(borrowedBooks.filter((item) => item.book !== book));
  };

  const handleAddStudent = () => {
    if (newStudent) {
      setStudents([...students, newStudent]);
      setNewStudent('');
    }
  };

  return (
    <div className="App">
      <h1>Library Management System</h1>

      {/* Add Student */}
      <div>
        <h2>Student Name</h2>
        <input
          type="text"
          placeholder="Student Name"
          value={newStudent}
          onChange={(e) => setNewStudent(e.target.value)}
        />
        <button onClick={handleAddStudent}>Add Student</button>
      </div>

      {/* Add Book */}
      <div>
        <h2> Book Registration</h2>
        <input
          type="text"
          placeholder="Book Title"
          value={newBook}
          onChange={(e) => setNewBook(e.target.value)}
        />
        <button onClick={handleAddBook}>Add Book</button>
      </div>

      {/* Borrow Book */}
      <div>
        <h2>Lend a Book</h2>
        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
        >
          <option value="">Select Student</option>
          {students.map((student, index) => (
            <option key={index} value={student}>
              {student}
            </option>
          ))}
        </select>
        <button onClick={handleBorrowBook}>Borrow</button>
      </div>

      {/* List Borrowed Books */}
      <div>
        <h2>Return Books</h2>
        <ul>
          {borrowedBooks.map((item, index) => (
            <li key={index}>
              {item.student} - {item.book.title}{' '}
              <button onClick={() => handleReturnBook(item.book)}>Return</button>
            </li>
          ))}
        </ul>
      </div>

      {/* List Available Books */}
      <div>
        <h2>Listed available Books</h2>
        <ul>
          {books.map((book, index) => (
            <li key={index}>{book.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
