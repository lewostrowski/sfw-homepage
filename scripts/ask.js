document.querySelector("#ask-input").value = ""

document.querySelector(".ask-taker").addEventListener("submit", (e) => {
  e.preventDefault()
  let c = e.target.elements.askcontent.value
  if (c.length < 0) {
    console.log("(ask.js) text area can't be empty")
  } else {
    let cont = document.querySelector(".ask-container")
    cont.innerHTML = ""
    let answer = document.createElement("p")
    answer.setAttribute("id", "answer")
    answer.textContent = c
    cont.appendChild(answer)
    console.log(`(ask.js) ${c}`)
  }
})
