const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box"); //it will select all the notes 

function showNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes");
}

showNotes();

function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}


createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  let img = document.createElement("img");
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  img.src = "images/delete.png";
  notesContainer.appendChild(inputBox).appendChild(img);
  updateStorage();
})

// Ajoute un écouteur d'événements à l'élément `notesContainer`.
// L'écouteur détecte les clics (événements "click") sur cet élément.
notesContainer.addEventListener("click", function(e) {

  // Vérifie si l'élément cliqué (`e.target`) est une balise <img>.
  // `e.target.tagName` retourne le nom de la balise en lettres majuscules.
  // Par exemple, si on clique sur une image, `e.target.tagName` sera "IMG".
  if (e.target.tagName === "IMG") {

    // Si c'est une balise <img>, alors on accède à son élément parent
    // et on le supprime du DOM en appelant `.remove()`.
    // Cela signifie que tout le conteneur parent de l'image sera supprimé.
    e.target.parentElement.remove();

    updateStorage();
  }
  else if (e.target.tagName === "P") {
  
    // Sélectionne tous les éléments avec la classe "input-box" et les stocke dans la variable `notes`.
    notes = document.querySelectorAll(".input-box");
  
    // Utilise la méthode `forEach` pour parcourir chaque élément de la collection `notes`.
    notes.forEach(nt => {
      
      // Assigne un gestionnaire d'événement `onKeyup` à chaque élément `nt`.
      // Cela signifie que chaque fois que l'utilisateur relâche une touche
      // après avoir tapé dans cet élément, la fonction sera exécutée.
      nt.onKeyup = function() {
        
        // Appelle la fonction `updateStorage()` pour sauvegarder les modifications
        // dans le `localStorage`. Cela permet de garder les données à jour.
        updateStorage();
      }
    })
  }
  
})

document.addEventListener("keydown" , event => {
  if(event.key === "Enter") {
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
})


