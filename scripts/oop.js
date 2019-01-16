'use strict'

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

let req = new XMLHttpRequest()
//const jsonLink = "scripts/json.json" // for test puropse only
const jsonLink = "https://api.sunrise-sunset.org/json?lat=52.406341&lng=16.932882&formatted=0"

if (jsonLink === "scripts/json.json") {
  console.log("Overall-devLOG: testing JSON is loaded. Data on the screen not be correct")
}

const sunInfo = () => {
  req.addEventListener("readystatechange", (e) => {
    if (req.readyState === 4 && req.status === 200) {
      let data = JSON.parse(e.target.responseText)
      console.log("Overall-status-LOG: JSON file status: OK")
      console.log("Overall-status-LOG: JSON parsing: OK") // control message
      data = data.results

      const nonStaticData = () => {
        document.querySelector(".info-container").innerHTML = ""
        let overAll = new ElementNew("over-all", "OVERALL-STATUS-DISPLAY")
        let status = new ElementNew("status", moment(data.sunrise).format("DD-MM-YYYY"), "status-for_")
        let dayDur = new ElementNew("day-long", dayDuration(data.day_length), "day-duration_")
        let civilRise = new ElementNew("civil-rise", moment(data.civil_twilight_begin).format("HH:mm:ss"), "civil-sunrise_")
        let sunrise = new ElementNew("sunrise", moment(data.sunrise).format("HH:mm:ss"), "sunrise_")
        let sunset = new ElementNew("sunset", moment(data.sunset).format("HH:mm:ss"), "sunset_")
        let civilSet = new ElementNew("civil-set", moment(data.civil_twilight_end).format("HH:mm:ss"), "civil-sunset_")
        let dayRem = null

        // check whether display sunlight time remain or information about night
        if (dayRemain(moment(data.sunset).unix(), moment().unix()) !== 1){
          dayRem = new ElementNew("day-remain", dayRemain(moment(data.sunset).unix(), moment().unix()), "sun-remain_")
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
      nonStaticData()
      const inter1 = setInterval(nonStaticData, 60000)

      const clockDisplay = () => {
        document.querySelector(".clock-container").innerHTML = ""
        let clock = new ElementNew("clock", moment().format("HH:mm:ss"))
        let date = new ElementNew("date", moment().format("DD/MM/YYYY"))

        let newDiv2 = document.createElement("div")
        newDiv2.setAttribute("class", "time-stamp")
        newDiv2.appendChild(clock.make())
        newDiv2.appendChild(date.make())
        document.querySelector(".clock-container").appendChild(newDiv2)

        // decide what infor is shown depend on daytime
        let newDiv3 = document.createElement("div")
        newDiv3.setAttribute("class", "show-info")
        if (moment(data.sunrise) > moment()) {
          if (moment().format("DD") % 2 == 0){
            let showInfo = new ElementNew("showInfo", "Get up early, huh?")
            newDiv3.appendChild(showInfo.make())
          } else {
            let showInfo = new ElementNew("showInfo", "Get up early, huh?")
            newDiv3.appendChild(showInfo.make())
          }
        } else if (moment(data.sunrise) < moment() && moment(data.sunset) > moment()) {
          if (moment().format("DD") % 2  == 0){
            let showInfo = new ElementNew("showInfo", "Today is workout day!")
            newDiv3.appendChild(showInfo.make())
          } else {
            let showInfo = new ElementNew("showInfo", "Movin, movin, movin...!")
            newDiv3.appendChild(showInfo.make())
          }
        } else if (moment(data.sunset) < moment()) {

          if (moment().format("DD") % 2 === 0){
            let showInfo = new ElementNew("showInfo", "Workout done?")
            newDiv3.appendChild(showInfo.make())
          } else {
            let showInfo = new ElementNew("showInfo", "Why not chilling?")
            newDiv3.appendChild(showInfo.make())
          }
        } else {
          console.log("Overall-status-LOG: something went wrong with under-clock message script")
        }
        document.querySelector(".clock-container").appendChild(newDiv3)
      }
      clockDisplay()
      const inter2 = setInterval(clockDisplay, 1000)

    } else if (req.readyState === 4) {
      let i = 0
      let newDiv4 = document.createElement("div")
      newDiv4.setAttribute("class", "error-msg")
      for (i=0;i<9;i++) {
        let errorMsg = new ElementNew("error-msq", e.target.status, "error_")
        newDiv4.appendChild(errorMsg.make())
      }
      document.querySelector(".info-container").appendChild(newDiv4)

      const clockDisplay = () => {
        document.querySelector(".clock-container").innerHTML = ""
        let clock = new ElementNew("clock", moment().format("HH:mm:ss"))
        let date = new ElementNew("date", moment().format("DD/MM/YYYY"))

        let newDiv2 = document.createElement("div")
        newDiv2.setAttribute("class", "time-stamp")
        newDiv2.appendChild(clock.make())
        newDiv2.appendChild(date.make())
        document.querySelector(".clock-container").appendChild(newDiv2)

        let newDiv3 = document.createElement("div")
        newDiv3.setAttribute("class", "show-info")
        let showInfo = new ElementNew("showInfo", "Better check internet connection")
        console.log("Overall-status-LOG: If internet connection is ok, check JSON file.")
        newDiv3.appendChild(showInfo.make())
        document.querySelector(".clock-container").appendChild(newDiv3)
      }
      clockDisplay()
      const inter2 = setInterval(clockDisplay, 1000)
    }

  })
  req.open("GET", jsonLink)
  req.send()
  console.log("Overall-status-LOG: JSON note controler. Action taken once at " + moment().format("HH:mm:ss" / "DD/MM"))
}

sunInfo()
const inter = setInterval(sunInfo, 7200000)
