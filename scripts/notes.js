'use strict'

let hold = []

// add time of creation to note object
const setDate = () => moment()
//change ms into readable timestamp
const born = (ms) => moment(ms).format("D/MM, HH:mm")

const saveNote = (noteName) => {
  try {
    localStorage.setItem("notes", JSON.stringify(noteName))
    console.log("notes-app-LOG: note saved")
  } catch (e) {
    console.log("notes-app-LOG: error occured in saveNote()")
    console.log(e)
  }
}

const removeNote = (id) => {
  try {
    const rmN = hold.findIndex((element) => element.id === id)
    if (rmN > -1) {
      console.log(`backupLog: deleted item content: ${hold[rmN].text}`)
      hold.splice(rmN, 1)
      console.log(`notes-app-LOG: item with index ${rmN} was deleted`)
      saveNote(hold)
      displayNote(hold)
    }
  } catch (e) {
    console.log("notes-app-LOG: error occured in removeNote()")
    console.log(e)
  }
}

const getNote = () => {
  try {
    if (localStorage.getItem("notes") !== null) {
      hold = JSON.parse(localStorage.getItem("notes"))
      console.log("notes-app-LOG: saved notes parsed and ready to load")
    } else {
      hold = []
      console.log("notes-app-LOG: no file with notes found")
    }
  } catch(e){
    console.log("notes-app-LOG: error occured in getNote()")
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
      console.log(`notes-app-LOG: note ${impN} has been marked as important`)
    } else {
      hold[impN].imp = false
      saveNote(hold)
      displayNote(hold)
      console.log(`notes-app-LOG: note ${impN} has been marked as standard`)
    }
  } catch (e) {
    console.log("notes-app-LOG: error occured in noteImp()")
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
      noteSpan.setAttribute("style", "font-weight: 700; color: black")
      console.log("notes-app-LOG: style changed to bold")
    } else {
      noteSpan.setAttribute("style", "font-weight: normal; color: #647cff")
      console.log("notes-app-LOG: style changed to standard")
    }
    document.querySelector(".note-display").appendChild(containerDiv)
  })
}

document.querySelector(".note-taker").addEventListener("submit", (e) => {
  e.preventDefault()
  let c = e.target.elements.content.value
  if (c.length < 1) {
    console.log("notes-app-LOG: no character was writen into text area")
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
