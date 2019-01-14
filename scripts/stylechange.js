let savedData = null;

const checkData = () => {
  if (localStorage.getItem("savedData") !== null) {
    savedData = JSON.parse(localStorage.getItem("savedData"))
  } else {
    savedData = 0
  }
}

const saveData = (x) => {
  localStorage.setItem("savedData", JSON.stringify(x))
}

checkData()
if (savedData === 1 && document.querySelector("#master-css")) {
  let masterPlain = document.querySelector("#master-css")
  masterPlain.setAttribute("href", "css/master-image.css")
  masterPlain.setAttribute("id", "master-css-image")
  let elementPlain = document.querySelector("#element-css")
  elementPlain.setAttribute("href", "css/element-image.css")
  elementPlain.setAttribute("id", "element-css-image")
} else if (savedData === 0 && document.querySelector("#master-css-image")){
  let masterPlain = document.querySelector("#master-css-image")
  masterPlain.setAttribute("href", "css/master.css")
  masterPlain.setAttribute("id", "master-css")
  let elementPlain = document.querySelector("#element-css-image")
  elementPlain.setAttribute("href", "css/element.css")
  elementPlain.setAttribute("id", "element-css")
} else {
  console.log("Style-change-LOG: error")
}

document.querySelector("#btn-style").addEventListener("click", (e) => {
  if (document.querySelector("#master-css")) {
    let masterPlain = document.querySelector("#master-css")
    masterPlain.setAttribute("href", "css/master-image.css")
    masterPlain.setAttribute("id", "master-css-image")
    let elementPlain = document.querySelector("#element-css")
    elementPlain.setAttribute("href", "css/element-image.css")
    elementPlain.setAttribute("id", "element-css-image")
    console.log("Style-change-LOG: style change to image-mode")
    savedData = 1
    saveData(savedData)
  } else if (document.querySelector("#master-css-image")) {
    let masterPlain = document.querySelector("#master-css-image")
    masterPlain.setAttribute("href", "css/master.css")
    masterPlain.setAttribute("id", "master-css")
    let elementPlain = document.querySelector("#element-css-image")
    elementPlain.setAttribute("href", "css/element.css")
    elementPlain.setAttribute("id", "element-css")
    console.log("Style-change-LOG: style change to plain-mode")
    savedData = 0
    saveData(savedData)
  }
})
