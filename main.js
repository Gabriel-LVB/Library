const addBookBtn = document.querySelector(".add-book");
const booksContainer = document.querySelector(".books");
const modalBackground = document.querySelector(".modal-background");
const modalContainer = document.querySelector(".modal");
const form = document.querySelector("form");

const inputTitle = document.querySelector("form #title");
const inputAuthor = document.querySelector("form #author");
const inputPages = document.querySelector("form #pages");

let allBooksLibrary = [];

let bookMoldToCopy;
window.addEventListener("DOMContentLoaded", () => {
    bookMoldToCopy = document.querySelector(".book").cloneNode(true);
    updateBooksContainer();
});

addBookBtn.addEventListener("click", () => {
    modalContainer.classList.add("visible");
});

modalBackground.addEventListener("click", () => {
    clearAndHideForm();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addBookToLibrary();
});

function clearBooksContainer() {
    while (booksContainer.firstChild) {
        booksContainer.removeChild(booksContainer.lastChild);
    }
}

function clearAndHideForm(inputs = [inputTitle, inputAuthor, inputPages]) {
    inputs.forEach((input) => {
        input.value = "";
    });
    modalContainer.classList.remove("visible");
}

function addBookToLibrary() {
    function book(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = false;
    }

    const newBook = new book(
        inputTitle.value,
        inputAuthor.value,
        inputPages.value
    );
    allBooksLibrary.push(newBook);
    clearAndHideForm();
    updateBooksContainer();
}

function updateBooksContainer() {
    clearBooksContainer();
    allBooksLibrary.forEach((book, index) => {
        createNewBookNode(book, index);
    });
}

function createNewBookNode(book, index) {
    newBook = bookMoldToCopy.cloneNode(true);

    addElementsToBook(newBook, book, index);
    addEventsToBook(newBook, book);

    booksContainer.appendChild(newBook);
}

function addElementsToBook(newBook, book, index) {
    book.index = index;
    if (book.read) {
        newBook.classList.add("read");
    }
    newBook.querySelector(".title").textContent = `"${book.title}"`;
    newBook.querySelector(".author").textContent = `-${book.author}`;
    newBook.querySelector(".pages").textContent = `${book.pages} pages`;
}

function addEventsToBook(newBook, book) {
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
    newBook.querySelector(".delete").addEventListener("click", () => {
        deleteBookFromLibrary(book.index);
    });
}

function deleteBookFromLibrary(bookIndex) {
    allBooksLibrary.splice(bookIndex, 1);
    updateBooksContainer();
}
