showTodo();

let todoTitle = document.getElementById("todoTitle");
let enterDiscription = document.getElementById("enterDiscription");
let addTodo = document.getElementById("addTodo");
let updateBtn = document.getElementById("updateTodo");
let search = document.getElementById("search");
let select_UL = document.querySelector(".allList");
let all_li = select_UL.querySelectorAll("li");
addTodo.addEventListener("click", addTodoFun);

function addTodoFun() {
  let titleVal = todoTitle.value.trim();
  let discriptionVal = enterDiscription.value.trim();
  if (!titleVal && !discriptionVal) return;
  let todoFromLocal = localStorage.getItem("todo");
  if (todoFromLocal == null) {
    todoObj = [];
  } else {
    todoObj = JSON.parse(todoFromLocal);
  }
  todoObj.push({
    id: Math.random() + 1,
    title: titleVal,
    discription: discriptionVal,
  });

  localStorage.setItem("todo", JSON.stringify(todoObj));
  todoTitle.value = "";
  enterDiscription.value = "";
  showTodo();
}

function showTodo() {
  let todoFromLocal = localStorage.getItem("todo");
  if (todoFromLocal == null) {
    todoObj = [];
  } else {
    todoObj = JSON.parse(todoFromLocal);
  }
  let html = "";
  let select_UL = document.querySelector(".allList");

  todoObj.forEach((each, index) => {
    html += `
      <li>
      <div class="headingDiscription">
          <i class="fa fa-comments"  style="font-size:30px; margin-right: 10px;
          background: #0bddb4;
          border-radius: 50%;
          height: 50px;
          width: 50px;
          align-items: center;
          display: flex;
          justify-content: center;"></i>    
                    <div>
          <h3>${each.title}</h3>
          <p>${each.discription}</p>
        </div>
      </div>
        <div class="editDeleteContainer">
          <button onClick = "editTodo(${each.id})">Edit</button>
          <button onClick = "deleteTodo(${each.id})">Delete</button>
        </div>
    

    </li>
      `;
  });
  select_UL.innerHTML = html;
}

///delete function

function deleteTodo(passId) {
  let todoFromLocal = localStorage.getItem("todo");
  todoObj = JSON.parse(todoFromLocal);
  let filteredTodo = todoObj.filter((each) => each.id !== passId);
  localStorage.setItem("todo", JSON.stringify(filteredTodo));
  showTodo();
}

let currentIndex;
function editTodo(passId) {
  let todoFromLocal = JSON.parse(localStorage.getItem("todo"));
  let indexOfElemToBeEdit = todoFromLocal.findIndex((each) => {
    return each.id === passId;
  });
  currentIndex = indexOfElemToBeEdit;

  todoTitle.value = todoFromLocal[indexOfElemToBeEdit].title;
  enterDiscription.value = todoFromLocal[indexOfElemToBeEdit].discription;
  addTodo.style.display = "none";
  updateBtn.classList.remove("hide");
}

updateBtn.addEventListener("click", updateCurrentOne);

function updateCurrentOne() {
  let todoFromLocal = JSON.parse(localStorage.getItem("todo"));

  todoFromLocal[currentIndex].title = todoTitle.value;
  todoFromLocal[currentIndex].discription = enterDiscription.value;

  localStorage.setItem("todo", JSON.stringify(todoFromLocal));
  addTodo.style.display = "block";
  updateBtn.classList.add("hide");
  todoTitle.value = "";
  enterDiscription.value = "";
  showTodo();
}

//////search

search.addEventListener("keyup", searchFun);

function searchFun(e) {
  let searchVal = e.target.value.trim().toLowerCase();

  Array.from(all_li).forEach((each) => {
    let searchText = each.querySelector(".headingDiscription");
    let searchText_heading = searchText
      .querySelector("h3")
      .innerHTML.trim()
      .toLocaleLowerCase();
    let searchText_description = searchText
      .querySelector("p")
      .innerHTML.trim()
      .toLocaleLowerCase();
    if (
      searchText_heading.includes(searchVal) ||
      searchText_description.includes(searchVal)
    ) {
      each.style.display = "block";
    } else {
      each.style.display = "none";
    }
  });
}
