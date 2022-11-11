// array which stores the book added by the user
let myBooks = [];


// constructor function which instatiates the books
function Book (name, author, page, id, status) {
    this.name = name;
    this.author = author;
    this.page = page;
    this.id = id;
    this.status = status;
}

// function which adds the book to the array and also make the book
function addBookToLibrary (bookName, author, page, id, status) {
    const book = new Book(bookName, author, page, id, status);
    myBooks.push(book);
}

// grabbing the elements from the DOM
const container = document.querySelector(".card-container");
const addBtn = document.querySelector("#add-btn");
const form = document.querySelector("#id01");


// deletes the book by checkind the id 
// if the deletebutton id matches the book's id
// we remove it from the array and render it
function deleteBook(e) {
    const selectedId = e.target.id;
    let filteredBooks = myBooks.filter(function (eachbook) {
        if (eachbook.id === Number(selectedId)){
            return false;
        }else {
            return true;
        }
    });

    myBooks = filteredBooks;
    showBooks(myBooks);  
}

// button that toggles the form modal
addBtn.addEventListener("click", () => {
    if (window.getComputedStyle(form).display === "none") {
        form.style.display = "block";
    }else {
        form.style.display = "none";
    }
});


// when the use clicks outside the box the form is
// not displayed
var modal = document.getElementById('id01');

	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
}


// when user clicks the cancel button the form is not
// displayed
const cancelBtn = document.querySelector("#cancel");
cancelBtn.addEventListener("click", () => {
    form.style.display = 'none';
});


// form disappears when the little cross is clicked
const span = document.querySelector("#cross");
span.addEventListener("click", () => {
    form.style.display = "none";
});


// whenever the form is submitted the book is added to 
// the array(Library) and we call the showBooks function
const submitBtn = document.querySelector(".add-book-btn");
submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    form.style.display = "none";
    const book = document.querySelector("#book");
    const author = document.querySelector("#author");
    const page = document.querySelector("#page");
    const id = new Date().getTime();
    const statusInput = document.querySelector("#status");
    let status;
    if (statusInput.checked) {
        status = "Read";
    }else {
        status = "Not read";
    }

    addBookToLibrary(book.value, author.value, page.value, id , status);
    showBooks(myBooks);
});



// shows the book by looping through the array and 
// also adds various classes.
function showBooks(array) {
    container.innerHTML =  " ";
    array.forEach(function (eachbook){
        const div = document.createElement("div");
        div.id = eachbook.id;
        div.classList.add("card");

        const p = document.createElement("p");
        p.textContent = `Name: ${eachbook.name}`;
        p.classList.add("title");

        const p1 = document.createElement("p");
        p1.textContent = `Author: ${eachbook.author}`;
        p1.classList.add("author");

        const p2 = document.createElement("p");
        p2.textContent = `Page: ${eachbook.page}`;
        p2.classList.add("page");

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        const statusBtn = document.createElement("button");
        statusBtn.id = eachbook.id;
        if (eachbook.status.toLowerCase() === "read") {
            statusBtn.textContent = "Read";
            statusBtn.classList.add("read-btn");
        } else {
            statusBtn.textContent = "Not Read";
            statusBtn.classList.add("unread-btn");
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.id = eachbook.id;
        deleteBtn.onclick = deleteBook;
        deleteBtn.classList.add("delete-btn");

        buttonContainer.append(statusBtn, deleteBtn);
        div.append(p, p1, p2, buttonContainer);

        container.append(div);
    });
}

function checkButton() {
    const readBtns = document.querySelectorAll(".read-btn");
    readBtns.forEach(function (readBtn) {
        readBtn.addEventListener("click", () => {
            readBtn.classList.remove("read-btn");
            findBookAndUpdateStatus(readBtn.id, "read");
            readBtn.textContent = "Not Read";
            readBtn.classList.add("unread-btn");
        });
    });

    const unreadBtns = document.querySelectorAll(".unread-btn");
    unreadBtns.forEach(function (unreadBtn) {
        unreadBtn.addEventListener("click", () => {
            unreadBtn.classList.remove("unread-btn");
            findBookAndUpdateStatus(unreadBtn.id, "unread");
            unreadBtn.textContent = "Read";
            unreadBtn.classList.add("read-btn");
        });
    });
}

function findBookAndUpdateStatus(id, statusNow) {
    for (let i = 0; i < myBooks.length; i++) {
        if (statusNow === "read") {
            if (myBooks[i].id === Number(id)) {
                myBooks[i].status = "Not Read";
            }
        } else if (statusNow === "unread") {
            if (myBooks[i].id === Number(id)) {
                myBooks[i].status = "Read";
            }
        }
    }
}

setInterval(checkButton, 500);