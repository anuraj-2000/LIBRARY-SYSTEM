
import { useEffect, useState } from "react";
import API from "./api/api";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const res = await API.get("/books");
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const borrowBook = async (id) => {
    try {
      await API.post(`/books/borrow/${id}`);
      fetchBooks();
    } catch {
      alert("No copies available");
    }
  };

  const returnBook = async (id) => {
    try {
      await API.post(`/books/return/${id}`);
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-8">Library System</h1>

      {loading ? (
        <p className="text-lg">Loading...</p>
      ) : (
        <div className="grid gap-6 w-full max-w-md">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-gray-800 p-5 rounded-xl shadow-lg hover:scale-105 transition"
            >
              <h2 className="text-xl font-semibold">{book.title}</h2>

              <p className="text-gray-400 mt-2">
                Available: {book.available_copies}
              </p>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => borrowBook(book.id)}
                  disabled={book.available_copies === 0}
                  className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-600 cursor-pointer"
                >
                  Borrow
                </button>

                <button
                  onClick={() => returnBook(book.id)}
                  disabled={
                    book.available_copies === book.total_copies
                  }
                  className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-600 cursor-pointer"
                >
                  Return
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
