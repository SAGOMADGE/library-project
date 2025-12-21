/* =======  CОБЫТИЯ которые реагируют на пользователя и меняют данные  ========= */
/* 
👉 Здесь меняются данные, потом вызывается render
*/

// IMPORT данных
import { tasks, setFormOpen } from "./state.js";

// IMPORT рендеров
import { renderForm, renderTasks } from "./render.js";

// IMPORT DOM elements
import { tasksContainer, formContainer, addBtn, clearBtn } from "./dom.js";

/* =========   HANDLERS   =========*/

// сохраняем массив задач в LocalStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// меняем состояние формы и рендерим
function handleOpenForm() {
  setFormOpen(true);
  renderForm();
}

// меняем данные массив - теперь они 0
function handleClearTasks() {
  tasks.length = 0;
  saveTasks(); // сохраняем пустой массив
  renderTasks();
}

function handleSubmit(e) {
  // early return
  if (e.target.id !== "form") return;

  // сабмит не перегружает браузер
  e.preventDefault();

  // выводим значение input через таргет события
  const input = e.target.querySelector("#input");
  // приравниваем его к свойству обьекта задачи
  const text = input.value.trim();
  // early return
  if (!text) return;

  // обьект задачи
  const task = {
    id: crypto.randomUUID(),
    text,
    done: false,
    toggle() {
      this.done = !this.done;
    },
  };

  // пушим обьект задачи в наш массив
  tasks.push(task);
  saveTasks(); // сохраняем после добавления

  // Закрываем форму, рендерим форму и задачу
  setFormOpen(false);
  renderForm();
  renderTasks();
}

// навешиваем событие на кнопку "завершить" внутри taskContainer
function handleToggle(e) {
  if (!e.target.classList.contains("task-done-btn")) return;

  const taskContainer = e.target.closest(".task-container");
  const id = taskContainer.dataset.id;

  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  task.toggle();
  saveTasks(); // сохраняем массив после изменения "done"
  renderTasks();
}

/* ============= INIT HANDLERS  ====== */

// export хендлера событий
export function initHandlers() {
  formContainer.addEventListener("submit", handleSubmit);

  tasksContainer.addEventListener("click", handleToggle);

  addBtn.addEventListener("click", handleOpenForm);

  clearBtn.addEventListener("click", handleClearTasks);
}

// каждый handler — это ровно тот код, который раньше был внутри addEventListener
