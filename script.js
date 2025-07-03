const myLibrary = [];

const bookshelf = document.querySelector(".bookshelf");

const addBookDialog = document.querySelector(".add-book");

const showDialog = document.querySelector(".show-dialog");

showDialog.addEventListener("click", () => {
  addBookDialog.showModal();
});

const closeDialog = document.querySelector(".cancel");
closeDialog.addEventListener("click", () => {
  addBookDialog.close();
});

const addBookForm = document.querySelector(".add-book-form");

addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const bookFormData = new FormData(addBookForm);
  let data = {
    title: bookFormData.get("title"),
    author: bookFormData.get("author"),
    pages: `${bookFormData.get("pages")} pages`,
    read: bookFormData.get("read") === "on" ? "Read" : "Not read",
  };
  addBookToLibrary(data.title, data.author, data.pages, data.read);
  addBookDialog.close();
});

function Book(title, author, pages, read) { 
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
  let bookObj = new Book(title, author, pages, read);
  myLibrary.push(bookObj);
  console.log(`Added book to library`);
  displayBook(createBookContainer(bookObj));
}

function removeBook(book) {
  const element = document.getElementById(book.id);
  element.remove();
  myLibrary.splice(myLibrary.indexOf(book), 1);
  console.log(`${book.id} removed`);
  console.log(myLibrary);
}
function markAsRead(event, book) {
  const element = document.getElementById(book.id);
  const readDiv = element.children[3];
  const btn = event.target;

  readDiv.classList.toggle("is-read");
  book.read = readDiv.classList.contains("is-read") ? "Read" : "Not read";
  btn.innerText = readDiv.classList.contains("is-read")
    ? "Unmark as read"
    : "Mark as read";
  readDiv.textContent = book.read;
}

function displayBook(book) {
  bookshelf.appendChild(book);
}

function createBookContainer(bookObj) {
  const book = document.createElement("div");
  book.className = "book";
  book.id = bookObj.id;
  for (prop in bookObj) {
    const txt = document.createElement("div");
    txt.className = prop;
    txt.textContent = bookObj[prop];
    if (bookObj[prop] === "Read") {
    txt.classList.add("is-read");
    }
    book.appendChild(txt);
  }

 
  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", () => removeBook(bookObj));
  book.appendChild(removeBtn);

  const markReadBtn = document.createElement("button");
  markReadBtn.className = "mark-read-btn";
  markReadBtn.textContent = "Mark as read";
  markReadBtn.addEventListener("click", (event) => markAsRead(event, bookObj));
  book.appendChild(markReadBtn);

  return book;
}

//sample books
myLibrary.push(addBookToLibrary("Blood Meridian", "Cormac McCarthy", "337 pages", "Not read"));
myLibrary.push(addBookToLibrary("1984", "George Orwell", "328 pages", "Not read"));
myLibrary.push(addBookToLibrary("I, Robot", "Isaac Asimov", "253 pages", "Not read"));