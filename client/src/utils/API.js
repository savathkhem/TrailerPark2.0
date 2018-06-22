import axios from "axios";

export default {
  // Gets all books
  getMovies: function() {
    return axios.get("/api/movies/in-theaters");
  },
  // Gets the book with the given id
  getTopMovies: function(id) {
    return axios.get("/api/movies/top-movies");
  },
  getTopTv: function(id) {
    return axios.get("/api/movies/top-tv");
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
