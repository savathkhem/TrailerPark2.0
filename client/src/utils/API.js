import axios from "axios";

export default {
  getMovies: function() {
    return axios.get("/api/movies/in-theaters");
  },
  getTopMovies: function(id) {
    return axios.get("/api/movies/top-movies");
  },
  getTopTv: function(id) {
    return axios.get("/api/movies/top-tv");
  },
  getTrailers: function(query) {
    let search = query.replace(/\s/g, "+").toLowerCase();
    console.log(search)
    // var queryTitle = parsedTitle.toLowerCase();
    return axios.get("/api/movies/trailers/"+ search);
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
