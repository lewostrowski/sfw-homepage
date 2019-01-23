let styleMode

const checkData = () => {
  if (localStorage.getItem("styleMode") !== null) {
    styleMode = JSON.parse(localStorage.getItem("styleMode"))
  } else {
    styleMode = 0
  }
}

const saveData = (x) => {
  localStorage.setItem("styleMode", JSON.stringify(x))
}

checkData()
if (styleMode === 1 && document.querySelector("#master-css")) {
  let masterPlain = document.querySelector("#master-css")
  masterPlain.setAttribute("href", "css/master-image.css")
  masterPlain.setAttribute("id", "master-css-image")
  let elementPlain = document.querySelector("#element-css")
  elementPlain.setAttribute("href", "css/element-image.css")
  elementPlain.setAttribute("id", "element-css-image")
} else if (styleMode === 0 && document.querySelector("#master-css-image")){
  let masterPlain = document.querySelector("#master-css-image")
  masterPlain.setAttribute("href", "css/master.css")
  masterPlain.setAttribute("id", "master-css")
  let elementPlain = document.querySelector("#element-css-image")
  elementPlain.setAttribute("href", "css/element.css")
  elementPlain.setAttribute("id", "element-css")
} else if ((styleMode === 0 && document.querySelector("#master-css")) || (styleMode === 1 && document.querySelector("#master-css-image"))) {
  console.log("(stylechange.js) correct display of style")
}

document.querySelector("#btn-style").addEventListener("click", (e) => {
  if (document.querySelector("#master-css")) {
    let masterPlain = document.querySelector("#master-css")
    masterPlain.setAttribute("href", "css/master-image.css")
    masterPlain.setAttribute("id", "master-css-image")
    let elementPlain = document.querySelector("#element-css")
    elementPlain.setAttribute("href", "css/element-image.css")
    elementPlain.setAttribute("id", "element-css-image")
    console.log("(stylechange.js) image-mode on")
    styleMode = 1
    saveData(styleMode)
  } else if (document.querySelector("#master-css-image")) {
    let masterPlain = document.querySelector("#master-css-image")
    masterPlain.setAttribute("href", "css/master.css")
    masterPlain.setAttribute("id", "master-css")
    let elementPlain = document.querySelector("#element-css-image")
    elementPlain.setAttribute("href", "css/element.css")
    elementPlain.setAttribute("id", "element-css")
    console.log("(stylechange.js) pattern-mode on")
    styleMode = 0
    saveData(styleMode)
  }
})
