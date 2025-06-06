const noteContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function showNote() {
  noteContainer.innerHTML = localStorage.getItem("notes");
}
showNote();

function updateStorage() {
  localStorage.setItem("notes", noteContainer.innerHTML);
}

const deleteAllBtn = document.querySelector(".delete-all");

deleteAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all notes?")) {
    noteContainer.innerHTML = "";
    updateStorage();
  }
});


createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  let img = document.createElement("img");

  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  img.src = "delete-removebg-preview.png";
  inputBox.appendChild(img);
  noteContainer.appendChild(inputBox);

  updateTypingEvent(inputBox); // نربطه بالتخزين
  updateStorage(); // نحفظ النوت الجديدة مباشرة
});

noteContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    if (confirm("Are you sure you want to delete this note?")) {
      e.target.parentElement.remove();
      updateStorage();
    }
  } else if (e.target.classList.contains("input-box")) {
    updateTypingEvent(e.target);
  }
});


function updateTypingEvent(note) {
  note.onkeyup = function () {
    updateStorage();
  };

  note.onkeydown = function (event) {
    if (event.key === "Enter") {
      document.execCommand("insertLineBreak");
      event.preventDefault();
    }
  };
}
