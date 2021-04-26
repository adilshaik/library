console.log("This is Es6 classes and inheritance");
showBooks();

//Adding ScrollBar
let tableBody = document.getElementById('table');
tableBody.style.height = '350px';
tableBody.style.overflow = 'auto';

//Function TO Show Books
function showBooks() {
    let getBooks = localStorage.getItem('books');
    let booksObj;
    if (getBooks == null) {
        booksObj = [];
    }
    else {
        booksObj = JSON.parse(getBooks);
    }
    let uiString = "";
    booksObj.forEach(function(element, index) {
        uiString += `<tr class="tableRows">
                        <td>${element.name}</td>
                        <td>${element.author}</td>
                        <td>${element.type}</td>
                        <td><button id="${index}" onclick="deleteBook(this.id)" type="button" class="btn btn-primary">Delete</button></td>
                    </tr>`;
    });
    let tableContent = document.getElementById('tableContent');
    if (booksObj.length != 0) {
        tableContent.innerHTML = uiString;
    }
    else {
        tableContent.innerHTML = "";
    }
}

// Function for deleting notes

function deleteBook(index) {
    let getBooks = localStorage.getItem('books');
    let booksObj;
    if (getBooks == null) {
        booksObj = [];
    }
    else {
        booksObj = JSON.parse(getBooks);
    }
    booksObj.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(booksObj));
    showBooks();
    let message = document.getElementById('message');
    let alertMessage = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>Deleted: </strong> You have removed the book from library.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
    message.innerHTML = alertMessage;
    setTimeout(() => {
    message.innerHTML = '';
    }, 3000);
}

class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
};

class Display {
    // For adding a Book
    add(book) {
        let getBooks = localStorage.getItem('books');
        let booksObj;
        if (getBooks == null) {
            booksObj = [];
        }
        else {
            booksObj = JSON.parse(getBooks);
        }
        booksObj.push(book);
        localStorage.setItem('books', JSON.stringify(booksObj));
        showBooks();    
    }

    //To clear the value after adding a book in the form
    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    //To validate values, where user cannot add values less than 4 characters
    validate(book) {
        if(book.name.length < 4 || book.name.length < 4) {
            return false;
        }
        else {
            return true;
        }
    }
    
    // For Showing alert message
    show(value, givenMessage, color) {
        let message = document.getElementById('message');
        let alertMessage = `<div class="alert alert-${color} alert-dismissible fade show" role="alert">
                                <strong>${value}: </strong> ${givenMessage}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`;
        message.innerHTML = alertMessage;
        setTimeout(() => {
            message.innerHTML = '';
        }, 3000);
    }

}

// Submit Eventlistner of form
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormContent);

function libraryFormContent(e) {
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type; 
    let scifi = document.getElementById('scifi');
    let programming = document.getElementById('programming');
    let mystery = document.getElementById('mystery');

    e.preventDefault();

    if(scifi.checked) {
        type = scifi.value;
    }
    else if(programming.checked) {
        type = programming.value;
    }
    else if(mystery.checked) {
        type = mystery.value;
    }

    let book = new Book(name, author, type);

    let display = new Display();
    
    if(display.validate(book)) {
        display.add(book);
        display.clear();
        display.show("Success", "Your story has been successfully submitted.", "success");
    }
    else {
        display.show("Error", "Please check the values you have entered.", "danger");

    }
}