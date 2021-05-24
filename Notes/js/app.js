showNote();

// If user adds a note, add it to the localStorage

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let title = document.getElementById("title");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }
    let myObj = {
        title: title.value,
        text: addTxt.value
    }
    noteObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(noteObj));
    addTxt.value = "";
    title.value = "";
    // console.log(noteObj);
    showNote();
});

// Function to show elements from localStorage
function showNote() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }
    let html = "";
    noteObj.forEach(function (element, index) {
        html += `
        <div class="noteCard card my-2 mx-2" style="width: 18rem;">
                    <div class="card-body">
                         <h5 class="card-title"> ${index + 1} . ${element.title}</h5>
                         <p class="card-text"> ${element.text}</p>
                        <button id="${index}" onclick ="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
        </div> `;

    });
    let noteElm = document.getElementById("notes");
    if (noteObj != 0) {
        noteElm.innerHTML = html;
    }
    else {
        noteElm.innerHTML = `No Notes`
    }
}

// Function to delete a note
function deleteNote(index) {
    //   console.log("I am deleting", index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }
    noteObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(noteObj));
    showNote();
}

// Function to  Search a Note
let searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener("input", function () {
    let inputVal = searchTxt.value.toLowerCase();
    // console.log('input fired', inputVal);
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("h5")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        //  console.log(cardTxt);
    })
})