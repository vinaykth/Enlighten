// HAMBURGER MENU
function openNav() {
  var x = document.getElementById("nav-collection");
  if (x.style.display === "flex") {
    x.style.display = "none";
  } else {
    x.style.display = "flex";
  }
}

// ADD AND DELETE BOOK
const bookInputForm = document.querySelector('#bookInputForm');
const bookInput = document.querySelector('#newbook');
const searchInput = document.querySelector('#searchbook');
const addBookBtn = document.querySelector('#addbookbtn');
const deleteAllBooksBtn = document.querySelector('#deleteallbookbtn');
const bookCollection = document.querySelector('.collection');

// load all event listeners
loadAllEventListeners();

// load all event listeners
function loadAllEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getBooks);
  // add book
  bookInputForm.addEventListener('submit', addBook);
  // delete book
  bookCollection.addEventListener('click', deleteBook);
  // delete all books
  deleteAllBooksBtn.addEventListener('click', deleteAllBooks);
  // search books
  searchInput.addEventListener('keyup', searchBook);
}

// Get Books from Local Storage
function getBooks() {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  books.forEach(function (book) {
    const bookk = document.createElement('div');
    bookk.className = 'card-item';
    const li = document.createElement('li');
    li.textContent = book;
    bookk.appendChild(li);
    const a = document.createElement('a');
    a.setAttribute('href', '#');
    const i = document.createElement('i');
    i.classList = 'fas fa-trash fa-1x';
    a.appendChild(i);
    bookk.appendChild(a);
    bookCollection.appendChild(bookk);
  });
}

// add book
function addBook(e) {
  if (bookInput.value === '') {
    alert('Add Book....!');
    return;
  }
  const book = document.createElement('div');
  book.className = 'card-item';
  const li = document.createElement('li');
  li.textContent = bookInput.value;
  book.appendChild(li);
  const a = document.createElement('a');
  a.setAttribute('href', '#');
  const i = document.createElement('i');
  i.classList = 'fas fa-trash fa-1x';
  a.appendChild(i);
  book.appendChild(a);
  bookCollection.appendChild(book);
  // Store in LS
  storeBookInLocalStorage(bookInput.value);
  bookInput.value = '';
  e.preventDefault();
}

// Store Book
function storeBookInLocalStorage(book) {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}

// delete book
function deleteBook(e) {
  if (e.target.parentElement.parentElement.classList.contains('card-item')) {
    e.target.parentElement.parentElement.remove();
    // Remove from Local Storage
    removeBookFromLocalStorage(e.target.parentElement.parentElement);
  }
}

// Remove from Local Storage
function removeBookFromLocalStorage(bookItem) {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  books.forEach(function (book, index) {
    if (bookItem.textContent === book) {
      books.splice(index, 1);
    }
  });
  localStorage.setItem('books', JSON.stringify(books));
}

// delete all books
function deleteAllBooks(e) {
  bookCollection.innerHTML = '';
  // delete from Local Storage
  deleteBooksFromLocalStorage();
}

// Delete Books from Local Storage
function deleteBooksFromLocalStorage() {
  localStorage.clear();
}

// search book
function searchBook(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.card-item').forEach((book) => {
    console.log(book.parentElement)
    const bookName = book.firstElementChild.textContent;
    if (bookName.toLowerCase().indexOf(text) !== -1) {
      book.style.display = 'flex';
    } else {
      book.style.display = 'none';
    }
  })
}
