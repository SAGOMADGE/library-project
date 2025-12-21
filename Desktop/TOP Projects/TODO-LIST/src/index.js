import "./style.css";

// импортируем состояние и функции работы с DOM
import { renderTasks, renderForm } from "./render.js";
import { initHandlers } from "./handlers.js";

// стартовый рендер
renderForm();
renderTasks();

// навешиваем события одной функцией
initHandlers();
