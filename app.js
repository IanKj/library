const submit = document.querySelector('#addBookBtn')
const title = document.querySelector('#title')
const author = document.querySelector('#author')
const pages = document.querySelector('#pages')
const completed = document.querySelector('#completed')
const notCompleted = document.querySelector('#notCompleted')
const bookContainer = document.querySelector('.bookContainer');

const myLibrary = [];

function Book(title, author, pages, isCompleted) {
    this.title = title,
        this.author = author,
        this.pages = pages,
        this.isCompleted = isCompleted
}

submit.addEventListener('click', e => {
    let alreadyExists = function () {
        for (let book of myLibrary) {
            if (title.value.toLowerCase() === book.title) {
                console.log('this book already exists')
                return true
            }
        }
    }
    let isCompleted = completed.checked ? true : false;
    if (title.value === '' || author.value === '' || pages.value < 1) {
        return
    }
    // else if (alreadyExists()) {
    //     return
    // }
    else {
        const newBook = new Book(title.value, author.value, pages.value, isCompleted)
        addBookToLibrary(newBook)
    }
})

function addBookToLibrary(book) {
    myLibrary.push(book)
    const bookWrapper = document.createElement('article');
    const bookTitle = document.createElement('p');
    bookTitle.innerText = book.title;
    const bookAuthor = document.createElement('p');
    bookAuthor.innerText = book.author;
    const bookPages = document.createElement('p');
    bookPages.innerText = book.pages;
    const buttonWrapper = document.createElement('div');
    const isRead = document.createElement('button');
    isRead.innerText = book.isCompleted ? 'Read' : 'Not Read';

    if (book.isCompleted) {
        isRead.classList.add('isCompleted')
    } else isRead.classList.add('notCompleted')

    isRead.addEventListener('click', e => {
        if (isRead.classList.contains('isCompleted')) {
            isRead.classList.remove('isCompleted')
            isRead.classList.add('notCompleted')
            isRead.innerText = 'Not Read'
        } else {
            isRead.classList.remove('notCompleted')
            isRead.classList.add('isCompleted')
            isRead.innerText = 'Read'
        }
    })

    const remove = document.createElement('button');
    remove.innerText = 'Remove';
    remove.addEventListener('click', e => {
        const selectedBook = e.target.parentElement.parentElement
        for (let i = 0; i < myLibrary.length; i++) {
            if (selectedBook.firstElementChild.innerText.toLowerCase() === myLibrary[i].title.toLowerCase()) {
                myLibrary.splice(i, 1)
            }
        }
        selectedBook.remove();

    })

    buttonWrapper.append(isRead, remove);
    bookWrapper.append(bookTitle, bookAuthor, bookPages, buttonWrapper);
    bookContainer.append(bookWrapper);
}


