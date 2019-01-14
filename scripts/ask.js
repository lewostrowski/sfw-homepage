document.querySelector("#ask-input").value = ""

document.querySelector(".ask-taker").addEventListener("submit", (e) => {
  e.preventDefault()
  let c = e.target.elements.askcontent.value
  if (c.length < 0) {
    console.log("ask-app-LOG: no character was writen into text area")
  } else {
    let cont = document.querySelector(".ask-container")
    cont.innerHTML = ""
    let answer = document.createElement("p")
    answer.setAttribute("id", "answer")
    answer.textContent = c
    cont.appendChild(answer)
  }
})
