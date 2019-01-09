let req = new XMLHttpRequest()
const jsonLink = "scripts/json.json"
// src https://api.sunrise-sunset.org/json?lat=52.406341&lng=16.932882&formatted=0

const longCalc = function(x, y) {
  let longC = x - y
  longC = longC / 60000
  if (longC >= 60) {
    return longC / 60
  } else if (longC < 60 && longC <= 0){
    return longC
  } else {
    return "Night"
  }
}

const sunInfo = () => {
  req.addEventListener("readystatechange", (e) => {
    if (req.readyState === 4 && req.status === 200) {
      let data = JSON.parse(e.target.responseText)
      console.log("Data taken and parsed") // control message
      data = data.results

      let newDiv = document.createElement("div")

      let status = document.createElement("p")
      status.setAttribute("id", "status")
      status.textContent = "Status for: " + moment(data.sunrise).format("DD-MM-YYYY")
      newDiv.appendChild(status)

      let dayLong = document.createElement("p")
      dayLong.setAttribute("id", "day-long")
      let dl = data.day_length / 60 / 60
      dayLong.textContent = "Day length: " + dl.toFixed(2)
      newDiv.appendChild(dayLong)

      let dayLast = document.createElement("p")
      dayLast.setAttribute("id", "day-last")
      dayLast.textContent = "Day last: " + longCalc(moment(data.sunset).unix(), moment(data.sunrise).unix())
      newDiv.appendChild(dayLast)

      let civilRise = document.createElement("p")
      civilRise.setAttribute("id", "civil-rise")
      civilRise.textContent = "Civil sunrise: " + moment(data.civil_twilight_begin).format("HH:mm:ss")
      newDiv.appendChild(civilRise)

      let sunrise = document.createElement("p")
      sunrise.setAttribute("id", "sunrise")
      sunrise.textContent = "Sunrise: " + moment(data.sunrise).format("HH:mm:ss")
      newDiv.appendChild(sunrise)

      let sunset = document.createElement("p")
      sunset.setAttribute("id", "sunset")
      sunset.textContent = "Sunset: " + moment(data.sunset).format("HH:mm:ss")
      newDiv.appendChild(sunset)

      let civilSet = document.createElement("p")
      civilSet.setAttribute("id", "civil-set")
      civilSet.textContent = "Civil sunset: " + moment(data.civil_twilight_end).format("HH:mm:ss")
      newDiv.appendChild(civilSet)

      document.querySelector(".info-container").appendChild(newDiv)

      const clockDate = () => {
        document.querySelector(".clock-container").innerHTML = ""
        // tworzy zegar z podpisem
        const nowC = moment().format("HH:mm:ss")
        const sunriseC = moment(data.sunrise).format("HH:mm:ss")
        const sunsetC = moment(data.sunset).format("HH:mm:ss")
        let newDiv1 = document.createElement("div")

        let time = document.createElement("p")
        time.setAttribute("id", "time")
        time.textContent = moment().format("HH:mm:ss")

        newDiv1.appendChild(time)

        let date = document.createElement("p")
        date.setAttribute("id", "date")
        date.textContent = moment().format("DD/MM/YYYY")

        newDiv1.appendChild(date)
        document.querySelector(".clock-container").appendChild(newDiv1)

          if (sunriseC > nowC) {
            let beforeSun = document.createElement("p")
            beforeSun.setAttribute("class", "before-sun")
            beforeSun.textContent = "Czas wstawać"

            newDiv1.appendChild(beforeSun)
            document.querySelector(".clock-container").appendChild(newDiv1)

          } else if (sunriseC < nowC && sunsetC > nowC) {
            let daySun = document.createElement("p")
            daySun.setAttribute("class", "day-sun")
            daySun.textContent = "Czas żyć"

            newDiv1.appendChild(daySun)
            document.querySelector(".clock-container").appendChild(newDiv1)

          } else if (sunset < nowC){
            let postSun = document.createElement("p")
            postSun.setAttribute("class", "post-sun")
            postSun.textContent = "Czas żyć"

            newDiv1.appendChild(postSun)
            document.querySelector(".clock-container").appendChild(newDiv1)
          } else {
            console.log("Errors")
          }

      }
      clockDate()
    //  const inter2 = setInterval(clockDate, 1000)

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
  console.log("JSON get note controler. Action taken once at " + moment().format("HH:mm:ss"))
}

sunInfo()
const inter = setInterval(sunInfo, 21600000)
