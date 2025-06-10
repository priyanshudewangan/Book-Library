const myLibrary = [];

function Books(name, author, pages, read){
    this.id = crypto.randomUUID(); //This creates a unique id
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//To change the book read from true to false
Books.prototype.toggleRead = function(){
    this.read = !this.read
}

//Add a New Book
function addBookToLibrary(title, author, pages, read){
    myLibrary.push(new Books(title, author, pages, read))
    showBooks();
}

//creating a showBooks() function

function showBooks() {
    const list = document.getElementById('bookList')
    list.innerHTML = '' //This clears the box so we dont get duplicates
    
    myLibrary.forEach(book =>{ //This goes through each Book in the above array
        const card = document.createElement('div');
        card.className = "book-card";

        card.innerHTML = `
        <h3>${book.name}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Status: ${book.read ? "Read" : "Not Read"}</p>
        <button onclick="toggleRead('${book.id}')">Toggle Read</button>
        <button onclick="removeBook('${book.id}')">Remove</button>
        `;

        list.appendChild(card);
    });
}

document.getElementById("newBookBtn").addEventListener("click", () => {
    const form = document.getElementById("bookForm");
    form.style.display = form.style.display === "none" ? "block" : "none";
});

function removeBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        showBooks();
    }
}

function toggleRead(id) {
    const book = myLibrary.find(book => book.id === id);
    if (book) {
        book.toggleRead();
        showBooks();
    }
}


document.getElementById("bookForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);

    this.reset();
    this.style.display = "none";
});

