'use strict'

let hold = []

// add time of creation to note object
const setDate = () => moment()
//change ms into readable timestamp
const born = (ms) => moment(ms).format("D/MM, HH:mm")

const saveNote = (noteName) => {
  try {
    localStorage.setItem("notes", JSON.stringify(noteName))
    console.log("(notes.js) note saved")
  } catch (e) {
    console.log("(notes.js) error in saveNote()")
    console.log(e)
  }
}

const removeNote = (id) => {
  try {
    const rmN = hold.findIndex((element) => element.id === id)
    if (rmN > -1) {
      console.log(`(notes.js) deleted: "${hold[rmN].text}"`)
      hold.splice(rmN, 1)
      console.log(`(notes.js) item with index ${rmN} deleted`)
      saveNote(hold)
      displayNote(hold)
    }
  } catch (e) {
    console.log("(notes.js) error in removeNote()")
    console.log(e)
  }
}

const getNote = () => {
  try {
    if (localStorage.getItem("notes") !== null) {
      hold = JSON.parse(localStorage.getItem("notes"))
      console.log(`(notes.js) notes parsed ${hold !== null}`)
    } else {
      hold = []
      console.log("(notes.js) nothing to parse yet")
    }
  } catch(e){
    console.log("(notes.js) error in getNote()")
    console.log(e)
  }
}

const noteImp = (imp, id) => {
  const impN = hold.findIndex((element) => element.id === id)
  try {
    if (imp === false) {
      hold[impN].imp = true
      saveNote(hold)
      displayNote(hold)
      console.log(`(notes.js) "${impN}" marked as important`)
    } else {
      hold[impN].imp = false
      saveNote(hold)
      displayNote(hold)
      console.log(`(notes.js) "${impN}" marked as standard`)
    }
  } catch (e) {
    console.log("(notes.js) error in noteImp()")
    console.log(e)
  }
}

const displayNote = (noteName) => {
  document.querySelector(".note-display").innerHTML = ""
  const everyNote = noteName.forEach((noteElement) => {

    //create container for each note
    let containerDiv = document.createElement("div")
    containerDiv.setAttribute("class", "note-line")

    //create timestamp
    let creationTime = document.createElement("span")
    creationTime.setAttribute("id", "note-time")
    creationTime.textContent = born(noteElement.time)

    //create note itself
    let noteSpan = document.createElement("span")
    noteSpan.setAttribute("id", "note-text")
    noteSpan.textContent = noteElement.text

    //create remove button
    let removeBtn = document.createElement("button")
    removeBtn.setAttribute("id", "remove-btn")
    removeBtn.textContent = "X"
    removeBtn.addEventListener("click", (e) => {
      removeNote(noteElement.id)
    })

    //create ![important] button
    let impBtn = document.createElement("button")
    impBtn.setAttribute("id", "imp-btn")
    impBtn.textContent = "!"
    impBtn.addEventListener("click", (e) => {
      noteImp(noteElement.imp, noteElement.id)
    })

    containerDiv.appendChild(creationTime)
    containerDiv.appendChild(noteSpan)
    containerDiv.appendChild(removeBtn)
    containerDiv.appendChild(impBtn)
    if (noteElement.imp) {
      noteSpan.setAttribute("id", "note-text-imp")
    } else {
      noteSpan.setAttribute("id", "note-text")
    }
    document.querySelector(".note-display").appendChild(containerDiv)
  })
}

document.querySelector("#note-input").value = ""

document.querySelector(".note-taker").addEventListener("submit", (e) => {
  e.preventDefault()
  let c = e.target.elements.content.value
  if (c.length < 1) {
    console.log("(notes.js) text area can't be empty")
  } else {
    hold.push({
      id: uuidv4(),
      text: c,
      time: setDate(),
      imp: false,
    })
    saveNote(hold)
  }

  e.target.elements.content.value = ""
  displayNote(hold)
})

// run things
getNote()
displayNote(hold)
