/* ====== RENDER TASKS & FORMS ====*/
/* 👉 Никаких addEventListener
   👉 Никаких tasks.push
*/

// --- импорт данных ---
import { tasks, isFormOpen } from "./state.js";
// --- импорт DOM контейнеров ---
import { formContainer, tasksContainer } from "./dom.js";

// --- EXPORT renderForm
export function renderForm() {
  // если форма открыта контейнер формы следующий:
  if (!isFormOpen) {
    formContainer.innerHTML = "";
    return;
  }

  formContainer.innerHTML = `
    <form id="form">
      <div class="input-area">
        <label for="input">Добавить задачу</label>
        <input id="input" type="text" placeholder="Введите задачу" />
        
      <div class="form-btn-area">
        <button type="submit" class="save-form-btn">Сохранить</button>
        <button type="button" class="form-done-btn">Завершить</button>
      </div>
      </div>
    </form>
  `;
}

// ---EXPORT renderTasks
export function renderTasks() {
  // очищаем контейнер для очередной задачи
  tasksContainer.innerHTML = "";

  // проходимся по каждой задаче
  tasks.forEach((task) => {
    // создаем контейнер задачи
    const taskContainer = document.createElement("div");
    // id контейнера равен id свойству обьекта задачи -> связка
    taskContainer.dataset.id = task.id;
    taskContainer.classList.add("task-container");

    // рисуем DOM
    const taskText = document.createElement("p");
    taskText.textContent = task.text;
    if (task.done) {
      taskText.style.textDecoration = "line-through";
    }
    const taskToggleBtn = document.createElement("button");
    taskToggleBtn.textContent = "Завершить";
    taskToggleBtn.classList.add("task-done-btn");

    // Вставляем все что создали на страницу
    taskContainer.append(taskText, taskToggleBtn);
    tasksContainer.append(taskContainer);
  });
}
