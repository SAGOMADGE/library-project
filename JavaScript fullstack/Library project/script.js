// FORM ELEMENTS
const form = document.querySelector("form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readCheckbox = document.querySelector("#read");
const openFormBtn = document.getElementById("btn-open-form");
const dialog = document.getElementById("my-dialog");
const cardContainer = document.getElementById("cards-container");
const emptyContainer = document.getElementById("empty-container");

// ARRAY FOR BOOKS
const myLibrary = [];

// CONSTRUCTOR FOR BOOKS
function Book(title, author, pages, isRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
};

// ADD BOOK TO ARRAY
function addBookToLibrary(book) {
  myLibrary.push(book);
}

// RENDER BOOKS
function render() {
  cardContainer.innerHTML = "";

  if (myLibrary.length === 0) {
    emptyContainer.style.display = "block";
  } else {
    emptyContainer.style.display = "none";
  }

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.dataset.id = book.id;

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>${book.author}</p>
      <p>${book.pages} страниц</p>
      <p>${book.isRead ? "Прочитано" : "Не прочитано"}</p>

      <div class="btn-area">
        <button class="remove-btn">Удалить</button>
        <button class="toggle-btn">
          ${
            book.isRead
              ? "Отметить как непрочитанную"
              : "Отметить как прочитанную"
          }
        </button>
      </div>
    `;

    cardContainer.append(card);
  });
}

// SUBMIT FORM
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;
  const isRead = readCheckbox.checked;

  const newBook = new Book(title, author, pages, isRead);
  addBookToLibrary(newBook);

  render();

  form.reset();
  dialog.close();
});

// REMOVE / TOGGLE BUTTONS
cardContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const id = e.target.closest(".book-card").dataset.id;
    const index = myLibrary.findIndex((book) => book.id === id);
    if (index !== -1) myLibrary.splice(index, 1);
    render();
  }

  if (e.target.classList.contains("toggle-btn")) {
    const id = e.target.closest(".book-card").dataset.id;
    const book = myLibrary.find((b) => b.id === id);
    book.toggleRead();
    render();
  }
});

// OPEN MODAL
openFormBtn.addEventListener("click", () => {
  emptyContainer.style.display = "none";
  cardContainer.style.display = "none";
  dialog.showModal();
});

// CLOSE MODAL ON BACKDROP
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) dialog.close();
});

// RETURN CONTAINERS BACK WHEN MODAL CLOSES
dialog.addEventListener("close", () => {
  cardContainer.style.display = "grid";
  if (myLibrary.length === 0) {
    emptyContainer.style.display = "block";
  }
});
