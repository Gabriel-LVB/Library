const addBookBtn = document.querySelector(".add-book");
const booksContainer = document.querySelector(".books");
const formBackground = document.querySelector(".form-background");
const formContainer = document.querySelector(".form");
const form = document.querySelector("form");

const title = document.querySelector("form #title");
const author = document.querySelector("form #author");
const pages = document.querySelector("form #pages");

let allBooks = [];

let bookMold;
window.addEventListener("DOMContentLoaded", () => {
    bookMold = document.querySelector(".book").cloneNode(true);
    clear();
});

addBookBtn.addEventListener("click", () => {
    formContainer.classList.add("visible");
});

formBackground.addEventListener("click", () => {
    clearForm();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addBookToLibrary();
    clearForm();
    updateBooks();
});

function clear() {
    while (booksContainer.firstChild) {
        booksContainer.removeChild(booksContainer.lastChild);
    }
}

function clearForm(inputs = [title, author, pages]) {
    inputs.forEach((input) => {
        input.value = "";
    });
    formContainer.classList.remove("visible");
}

function addBookToLibrary() {
    function book(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = false;
    }

    const newBook = new book(title.value, author.value, pages.value);
    allBooks.push(newBook);
}

function updateBooks() {
    clear();
    allBooks.forEach((book, index) => {
        book.index = index;
        newBook = bookMold.cloneNode(true);
        if (book.read) {
            newBook.classList.add("read");
        }
        newBook.querySelector(".title").textContent = `"${book.title}"`;
        newBook.querySelector(".author").textContent = `-${book.author}`;
        newBook.querySelector(".pages").textContent = `${book.pages} pages`;
        newBook.querySelector(".read").addEventListener("click", (e) => {
            let bookNode = e.target.parentNode;
            if (bookNode.className.includes("read")) {
                e.target.textContent = "Mark as read";
                bookNode.classList.remove("read");
                book.read = false;
            } else {
                e.target.textContent = "Umark as read";
                bookNode.classList.add("read");
                book.read = true;
            }
        });
        newBook.querySelector(".delete").addEventListener("click", (e) => {
            deleteBookFromLibrary(book.index);
        });
        booksContainer.appendChild(newBook);
    });
}

function deleteBookFromLibrary(bookIndex) {
    allBooks.splice(bookIndex, 1);
    updateBooks();
}
