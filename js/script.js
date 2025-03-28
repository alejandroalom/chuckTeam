const jokeList = document.getElementById("jokeList");
const fetchJokeBtn = document.getElementById("fetchJoke");

let jokes = JSON.parse(localStorage.getItem("jokes")) || [];
renderJokes();

fetchJokeBtn.addEventListener("click", () => {
  fetch("https://api.chucknorris.io/jokes/random")
    .then(response => response.json())
    .then(data => {
      jokes.push(data.value);
      localStorage.setItem("jokes", JSON.stringify(jokes));
      renderJokes();
    });
});

function renderJokes() {
  jokeList.innerHTML = "";
  jokes.forEach((joke, index) => {
    const li = document.createElement("li");
    li.textContent = joke;
    
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.addEventListener("click", () => {
      jokes.splice(index, 1);
      localStorage.setItem("jokes", JSON.stringify(jokes));
      renderJokes();
    });
    
    li.appendChild(deleteBtn);
    jokeList.appendChild(li);
  });

  if (jokes.length > 0) {
    addClearAllButton();
  }
}

function addClearAllButton() {
  if (!document.getElementById("clearAll")) {
    const clearAllBtn = document.createElement("button");
    clearAllBtn.id = "clearAll";
    clearAllBtn.textContent = "Eliminar todos";
    clearAllBtn.addEventListener("click", () => {
      jokes = [];
      localStorage.removeItem("jokes");
      renderJokes();
    });
    document.body.appendChild(clearAllBtn);
  }
}

