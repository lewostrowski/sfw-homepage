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
    return "Night"
  } else {
    return "Error"
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
    return "Night"
  } else {
    return "Error"
  }
}

let req = new XMLHttpRequest()
const jsonLink = "scripts/json.json"

const sunInfo = () => {
  req.addEventListener("readystatechange", (e) => {
    if (req.readyState === 4 && req.status === 200) {
      let data = JSON.parse(e.target.responseText)
      console.log("Data taken and parsed") // controla message
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
        if (dayRemain(moment(data.sunset).unix(), moment().unix()) !== "Night"){
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
          let showInfo = new ElementNew("showInfo", "Sun is close")
          newDiv3.appendChild(showInfo.make())
        } else if (moment(data.sunrise) < moment() && moment(data.sunset) > moment()) {
          let showInfo = new ElementNew("showInfo", "Live is on")
          newDiv3.appendChild(showInfo.make())
        } else if (moment(data.sunset) < moment()) {
          let showInfo = new ElementNew("showInfo", "Time to say goodnight")
          newDiv3.appendChild(showInfo.make())
        } else {
          console.log("error")
        }
        document.querySelector(".clock-container").appendChild(newDiv3)
      }
      clockDisplay()
      const inter2 = setInterval(clockDisplay, 1000)

    } else if (req.readyState === 4) {
      let newDiv = document.createElement("div")
      let errorMsg = document.createElement("p")
      errorMsg.setAttribute("id", "civil-set")
      errorMsg.textContent = "Error: " + e.target.status
      newDiv.appendChild(errorMsg)
      document.querySelector(".info-container").appendChild(newDiv)
    }

  })
  req.open("GET", jsonLink)
  req.send()
}

sunInfo()
const inter = setInterval(sunInfo, 7200000)