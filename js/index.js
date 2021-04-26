console.log("This is our library.")

function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

function Display() {

}

Display.prototype.add = function(book) {
    let tableContent = document.getElementById('tableContent');
    let uiString = `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`;
    tableContent.innerHTML += uiString;
}

Display.prototype.clear = function clear() {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

Display.prototype.validate = function(book) {
    if(book.name.length < 3 || book.author.length < 3) {
        return false;
    } 
    else {
        return true;
    }
}

Display.prototype.show = function(messageType, givenMessage, color) {
    let message = document.getElementById('message');
    let alertMessage = `<div class="alert alert-${color} alert-dismissible fade show" role="alert">
                            <strong>${messageType}: </strong> ${givenMessage}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
    message.innerHTML = alertMessage;
    setTimeout(() => {
        alertMessage.innerHTML = ''
    }, 3000);
}

let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit',
function libraryFormContent(e) {
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let scifi = document.getElementById('scifi');
    if (scifi.checked) {
        type = scifi.value
    }
    else if (programming.checked) {
        type = programming.value
    }
    else if (mystery.checked) {
        type = mystery.value
    }

    let book = new Book(name, author, type);
    
    let display = new Display();
    

    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show("Success", "Your form has been submitted successfully.", "success");
    }
    else {
        display.show("Error", "Please check the values you have entered.", "danger");
        console.log("Error");
    }

    e.preventDefault();
})