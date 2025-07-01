
const myLibrary = [];

const addBookDialog = document.querySelector(".add-book");

const showDialog = document.querySelector(".show-dialog");

showDialog.addEventListener("click", () => {
    addBookDialog.showModal();
})

const closeDialog = document.querySelector(".cancel");
closeDialog.addEventListener("click", () => {
    addBookDialog.close();
})

const showBooks = document.querySelector(".show-books");
showBooks.addEventListener("click", () => {
    displayBooks();
})

const addBookForm = document.querySelector(".add-book-form");

addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const bookFormData = new FormData(addBookForm);
    let data = {
        title: bookFormData.get("title"),
        author: bookFormData.get("author"),
        pages: bookFormData.get("pages"),
    }

    console.log(bookFormData.get("title"));
    
    addBookToLibrary(data.title, data.author, data.pages);
    addBookDialog.close();

    
})


function Book(title, author, pages) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary(title, author, pages) {
    let book = new Book(title, author, pages)
    myLibrary.push(book);
    console.log(`Added book to library`);
    displayBooks();
}

function displayBooks() {
    console.log(myLibrary);
}



