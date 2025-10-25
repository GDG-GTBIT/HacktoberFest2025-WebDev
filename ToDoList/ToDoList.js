function init() {
    const savedList = localStorage.getItem('List') ? JSON.parse(localStorage.getItem("List")) : [];
    const ul = document.getElementById("myUL");

   
    savedList.forEach(itemText => {
        const li = createListItem(itemText);
        ul.appendChild(li);
    });
}


function createListItem(text) {
    const li = document.createElement("li");
    li.textContent = text;

    const span = document.createElement("SPAN");
    span.className = "close";
    span.textContent = "\u00D7";
    li.appendChild(span);

    return li;
}


function newElement() {
    const input = document.getElementById("myInput");
    const inputValue = input.value.trim();

    if (inputValue === "") {
        alert("You must write something!");
        return;
    }

    const ul = document.getElementById("myUL");
    const li = createListItem(inputValue);
    ul.appendChild(li);

    input.value = "";

    updateLocalStorage();
}


function updateLocalStorage() {
    const listItems = document.querySelectorAll("#myUL li");
    const items = [];

    listItems.forEach(li => {
    
        if (!li.classList.contains("dummy") && li.style.display !== "none") {
            items.push(li.firstChild.textContent);
        }
    });

    localStorage.setItem("List", JSON.stringify(items));
}


document.getElementById("myUL").addEventListener("click", function (ev) {
    const target = ev.target;

    if (target.tagName === "LI") {
        target.classList.toggle("checked");
        updateLocalStorage();
    } else if (target.classList.contains("close")) {
        const li = target.parentElement;
        li.style.display = "none";
        updateLocalStorage();
    }
});
document.querySelectorAll("#myUL li").forEach(li => li.classList.add("dummy"));
init();
