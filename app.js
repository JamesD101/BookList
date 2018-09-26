// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI() {}

UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');
//    Create table row element
    const row = document.createElement('tr');
//    Insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="" class="delete">X</a></td>
    `
    list.appendChild(row);
};
//Show alert
UI.prototype.showAlert = function (message, className) {
//    Create div
    const div = document.createElement('div');
//    Add classes
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
//    Get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    //Insert alert - 1 is what we want to insert then 2 is before what
    container.insertBefore(div, form);

//    Timeout after 3 seconds
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
};

//Delete Book
UI.prototype.deleteBook = function(target){
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
};

//Clear fields
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
};
// Event Listeners for submitting the book
document.getElementById('book-form').addEventListener('submit', function (e) {
   //Get what is inside the form
   const title = document.getElementById('title').value,
       author = document.getElementById('author').value,
       isbn = document.getElementById('isbn').value;
   //Instantiate Book
   const book = new Book(title, author, isbn);
   //Instantiate UI
   const ui = new UI();

   //Validate
    if (title === '' || author === '' || isbn === '') {
    //Error alert
        ui.showAlert('Please fill in all fields', 'error')
    } else {
        // Add book to list
        ui.addBookToList(book);
        //Show success
        ui.showAlert('Book Added!!!', 'success');
        //Clear UI fields
        ui.clearFields();
    }

   e.preventDefault();
});

//Event listener for delete

document.getElementById('book-list').addEventListener('click', function (e) {

    const ui = new UI();
    //Delete book
    ui.deleteBook(e.target);

    //Show message
    ui.showAlert('Book removed', 'success');

    e.preventDefault();
});