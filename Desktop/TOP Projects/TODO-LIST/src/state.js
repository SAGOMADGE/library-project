/*========  ИСТИНА ПРИЛОЖЕНИЯ =======*/
// Local storage + map => для сохранения метода toggle()
export const tasks = (JSON.parse(localStorage.getItem("tasks")) || []).map(
  (task) => ({
    ...task,
    toggle() {
      this.done = !this.done;
    },
  })
);

export let isFormOpen = false;

export function setFormOpen(value) {
  isFormOpen = value;
}
