'use strict'

let data
let isActual // true or false
let jsonError
const req = new XMLHttpRequest()
const link = "scripts/json.json"
//const link = "https://api.sunrise-sunset.org/json?lat=52.406341&lng=16.932882&formatted=0"

// utli ()
const clockDisplayer = () => {
  document.querySelector(".clock-container").innerHTML = ""
  let clock = new ElementNew("clock", moment().format("HH:mm:ss"))
  let date = new ElementNew("date", moment().format("DD/MM/YYYY"))

  let newDiv2 = document.createElement("div")
  newDiv2.setAttribute("class", "time-stamp")
  newDiv2.appendChild(clock.make())
  newDiv2.appendChild(date.make())
  document.querySelector(".clock-container").appendChild(newDiv2)
}

const ElementNew = function(id, content = "", addtext = "") {
  this.id = id
  this.content = content
  this.addtext = addtext
}

ElementNew.prototype.make = function() {
  let pnew = document.createElement("p")
  pnew.setAttribute("id", this.id)
  pnew.textContent = this.addtext + this.content
  return pnew
}

const dayRemain = function(x, y) {
  let seconds = (x - y).toFixed(0);
  let minutes = Math.floor(seconds / 60);
  let hours = "";
  if (minutes > 59) {
    hours = Math.floor(minutes / 60);
    hours = (hours >= 10) ? hours : "0" + hours;
    minutes = minutes - (hours * 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
    if (hours != "") {
        return hours + ":" + minutes;
    }
  } else if (minutes <= 59 && minutes > 0) {
    return minutes + " m"
  } else if (seconds <= 0) {
    return 1
  } else {
    return 0
  }
}

const dayDuration = function(x) {
  let seconds = x.toFixed(0)
  let minutes = Math.floor(seconds / 60)
  let hours = ""
  if (minutes > 59) {
      hours = Math.floor(minutes / 60)
      hours = (hours >= 10) ? hours : "0" + hours
      minutes = minutes - (hours * 60)
      minutes = (minutes >= 10) ? minutes : "0" + minutes
      if (hours != "") {
          return hours + ":" + minutes
      }
    return minutes
  } else if (x < 0) {
    return 1
  } else {
    return 0
  }
}

// vital ()

const getData = () => {
  let controlData = moment().format("DD")
  req.addEventListener("readystatechange", (e) => {
    if (req.readyState === 4 && req.status === 200) {
      let dayData = e.target.responseText
      localStorage.setItem("dayData", dayData)
      localStorage.setItem("errorMSG", 0)
    } else if (req.readyState === 4 && req.status !== 200) {
      clockDisplayer()
      localStorage.setItem("errorMSG", 1)
    }
  })
  req.open("GET", link)
  req.send()
  const errorMSG = () => jsonError = JSON.parse(localStorage.getItem("errorMSG"))
  const printLocal = () => data = JSON.parse(localStorage.getItem("dayData"))
  errorMSG()
  printLocal()
  isActual = controlData === moment(data.results.sunrise).format("DD")
  console.log(`(getdata.js) actual data: ${isActual}`)
}
getData()


const staticDataDisplayer = () => {
  document.querySelector(".info-container").innerHTML = ""
  let overAll = new ElementNew("over-all", "OVERALL-STATUS-DISPLAY")
  let status = new ElementNew("status", moment(data.results.sunrise).format("DD-MM-YYYY"), "status-for_")
  let dayDur = new ElementNew("day-long", dayDuration(data.results.day_length), "day-duration_")
  let civilRise = new ElementNew("civil-rise", moment(data.results.civil_twilight_begin).format("HH:mm:ss"), "civil-sunrise_")
  let sunrise = new ElementNew("sunrise", moment(data.results.sunrise).format("HH:mm:ss"), "sunrise_")
  let sunset = new ElementNew("sunset", moment(data.results.sunset).format("HH:mm:ss"), "sunset_")
  let civilSet = new ElementNew("civil-set", moment(data.results.civil_twilight_end).format("HH:mm:ss"), "civil-sunset_")
  let dayRem = null

  // check whether display sunlight time remain or information about night
  if (dayRemain(moment(data.results.sunset).unix(), moment().unix()) !== 1){
    dayRem = new ElementNew("day-remain", dayRemain(moment(data.results.sunset).unix(), moment().unix()), "sun-remain_")
  } else {
    dayRem = new ElementNew("day-remain", "is-night_1")
  }

  let newDiv1 = document.createElement("div")
  newDiv1.setAttribute("class", "info")
  newDiv1.appendChild(overAll.make())
  newDiv1.appendChild(status.make())
  newDiv1.appendChild(dayDur.make())
  newDiv1.appendChild(dayRem.make())
  newDiv1.appendChild(civilRise.make())
  newDiv1.appendChild(sunrise.make())
  newDiv1.appendChild(sunset.make())
  newDiv1.appendChild(civilSet.make())
  document.querySelector(".info-container").appendChild(newDiv1)
}
staticDataDisplayer()
clockDisplayer()

const underClockDisplayer = () => {
  document.querySelector(".message-container").innerHTML = ""
  let newDiv3 = document.createElement("div")
  newDiv3.setAttribute("class", "show-info")
  if (jsonError === 0) {
    if (moment(data.results.sunrise) > moment()) {
      if (moment().format("DD") % 2 == 0){
        let showInfo = new ElementNew("showInfo", "Get up early, huh?")
        newDiv3.appendChild(showInfo.make())
      } else {
        let showInfo = new ElementNew("showInfo", "Get up early, huh?")
        newDiv3.appendChild(showInfo.make())
      }
    } else if (moment(data.results.sunrise) < moment() && moment(data.results.sunset) > moment()) {
      if (moment().format("DD") % 2  == 0){
        let showInfo = new ElementNew("showInfo", "Today is workout day!")
        newDiv3.appendChild(showInfo.make())
      } else {
        let showInfo = new ElementNew("showInfo", "Movin, movin, movin...!")
        newDiv3.appendChild(showInfo.make())
      }
    } else if (moment(data.results.sunset) < moment()) {

      if (moment().format("DD") % 2 === 0){
        let showInfo = new ElementNew("showInfo", "Workout done?")
        newDiv3.appendChild(showInfo.make())
      } else {
        let showInfo = new ElementNew("showInfo", "Why not chilling?")
        newDiv3.appendChild(showInfo.make())
      }
    } else {
      console.log(`(getdata.js) JSON error ${jsonError} but somenthing went wrong`)
    }
    document.querySelector(".message-container").appendChild(newDiv3)
  } else if (jsonError === 1) {
    let newDiv3 = document.createElement("div")
    newDiv3.setAttribute("class", "show-info")
    let showInfo = new ElementNew("showInfo", "Better check internet connection")
    console.log("(getdata.js) if internet connection is ok, check JSON file")
    newDiv3.appendChild(showInfo.make())
    document.querySelector(".message-container").appendChild(newDiv3)
  } else {
    console.log(`(getdata.js) JSON error ${jsonError} and somenthing went wrong`)
  }

}
underClockDisplayer()

const checkGet = () => {
  if (isActual === false || moment(data.results.sunrise).format("DD") !== moment().format("DD") ) {
    getData()
    console.log(`(getdata.js) actual: ${isActual} - updated ${moment().format("DD/MM HH:mm:ss")}`)
  } else {
    console.log(`(getdata.js) no need to sync data`)
  }
}

let onScreenStatus = new ElementNew("onscreenstatus", isActual, "Actual: ")
document.querySelector("footer").appendChild(onScreenStatus.make())

const ineter0 = setInterval(checkGet, 60000)
const inter1 = setInterval(staticDataDisplayer, 60000)
const inter2 = setInterval(clockDisplayer, 1000)
const inter3 = setInterval(underClockDisplayer, 60000)
