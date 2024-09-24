//Book class: Represent a book
class Book{
    constructor(title,author,no){
        this.title = title;
        this.author = author;
        this.no = no;
    }
}

// UI class: handle ui tasks

class UI{
    static displayBooks(){
        
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookTOList(book));
    }
    static addBookTOList(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.no}</td>
        <td><a href="#" class="btn delete">X</a></td>
        `;
        list.appendChild(row);
    }
    static deleteBook(el){
        if (el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#no').value = '';
    }
    static showAlert(message,className){
        const div = document.createElement('div');
        div.className = `alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);

        //vanish in 3sec
        setTimeout(() => document.querySelector(`.alert-${className}`).remove(),3000);
        }
}
// store class: handles storage

class Store{
    static getBooks(){
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;

    }
    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));

    }
    static removeBook(no){
        const books = Store.getBooks();
        books.forEach((book,index) =>{
            if(book.no === no){
                books.splice(index,1);
            }
        });
    localStorage.setItem('books',JSON.stringify(books));

    }
}

//Events : display books
document.addEventListener('DOMContentLoaded',UI.displayBooks);

//Events : add a book

document.querySelector('#book-form').addEventListener('submit',(e) => {
         e.preventDefault();
        //get form values
        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const no = document.querySelector('#no').value;

        

        //validation
        if (title === '' || author ===''||no===''){
            UI.showAlert('please fill in all fields','danger')
        }
        else{
            // Instantiate book
        // const book = new Book(title,author,no);
        const book = {
            title:title,
            author:author,
            no:no
        }
        
        //Add book to ui

        UI.addBookTOList(book);

        // add book to store
        Store.addBook(book);

        //show success message
        UI.showAlert('Book added','success');

        //clear fields
        UI.clearFields();
        }

    }
)

// Events to remove a book

document.querySelector('#book-list').addEventListener('click',(e) =>{
    UI.deleteBook(e.target);

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    
    UI.showAlert('Book removed','success');
})
console.log(Store.getBooks());