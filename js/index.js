function updateDateTime() {
  const now = new Date();
  const hour = ("0" + now.getHours()).slice(-2);
  const minute = ("0" + now.getMinutes()).slice(-2);
  const second = ("0" + now.getSeconds()).slice(-2);

  const dateTimeHTML = `
      <span id="currentDateTime" class="date">
          <b>${now.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</b>
      </span>
      <span id="currentTime" class="time">
          <b>${hour}:${minute}:${second}</b>
      </span>
  `;

  // Update the entire date-time-container div
  document.getElementById("date-time-container").innerHTML = dateTimeHTML;
}

// Initial call to display the date and time immediately
updateDateTime();

// Update the date and time every second
setInterval(updateDateTime, 1000);

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    const dashboard = document.getElementById("dashboard");
    dashboard.classList.add("active");
  }, 2);
});

let config = {};
let passwordhvac = {};
let UnitID = {};
// Function to fetch configuration
function getConfig() {
  // Replace 'config.json' with the path to your configuration file
  const response = fetch("../config.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.serverIP);
      config = data.serverIP;
      passwordhvac = data.password;
      // unitID = data.unitID;
      document.getElementById("OutdoorUnitz").textContent = data.unitID;
      console.log(data.unitID);
    })
    .catch((error) => {
      console.error("Error fetching configuration:", error);
      return {}; // Return an empty object if there's an error
    });

  return response;
}

// console.log(config);
// [[[[[[[[[FUNCTION TO GET DATA]]]]]]]]]]]
let GV_automanual

function updateInfoValue() {
  fetch("http://" + config + ":1880/getInfoData")
    .then((response) => response.json())
    .then((data) => {
      const modeValue = data[0].Mode;
      document.getElementById("modeValue").textContent = modeValue;
      const turboValue = data[0].Turbo;
      document.getElementById("turboValue").textContent = turboValue;
      const swingValue = data[0].Swing;
      document.getElementById("swingValue").textContent = swingValue;
      const quietValue = data[0].Quiet;
      document.getElementById("quietValue").textContent = quietValue;
      const sleepValue = data[0].Sleep;
      document.getElementById("sleepValue").textContent = sleepValue;
      const timeron1Value = data[0].TimerON1;
      document.getElementById("timeron1Value").textContent = timeron1Value;
      const timeron2Value = data[0].TimerON2;
      document.getElementById("timeron2Value").textContent = timeron2Value;
      const timeroff1Value = data[0].TimerOFF1;
      document.getElementById("timeroff1Value").textContent = timeroff1Value;
      const timeroff2Value = data[0].TimerOFF2;
      document.getElementById("timeroff2Value").textContent = timeroff2Value;
      const delayValue = data[0].DelayTimer;
      document.getElementById("delayValue").textContent = delayValue;
      const fanValue = data[0].Fan;
      document.getElementById("fanValue").textContent = fanValue;
      const unitstatValue = data[0].UnitStatus;
      document.getElementById("unitstatValue").textContent = unitstatValue;
      if (unitstatValue === "ON") {
        document.getElementById("btn_ON").style.backgroundColor = "#76e810";
        document.getElementById("btn_OFF").style.backgroundColor = "gray";
      } else {
        document.getElementById("btn_ON").style.backgroundColor = "gray";
        document.getElementById("btn_OFF").style.backgroundColor = "orangered";
      }

      const automanual = data[0].AutoManual;
      GV_automanual = data[0].AutoManual;
      console.log("Test Global " + GV_automanual)
      if (automanual === 1) {
        document.getElementById("bgstatAM").style.backgroundColor =
          "rgb(77, 12, 182)";
        document.getElementById("statusAM").textContent = "AUTO";
      } else {
        document.getElementById("bgstatAM").style.backgroundColor = "orangered";
        document.getElementById("statusAM").textContent = "MANUAL";
        document.getElementById("statusAM").style.fontSize = "2vh";
      }
    });
}
updateInfoValue();
getConfig();
setInterval(getConfig, 1000);
setInterval(updateInfoValue, 5000); // Refresh every 5 seconds (adjust as needed)

// INFORMATION

let tempcathlab1;

// Fetch data from Node-RED server and update JustGage value
function updateGaugeValue() {
  fetch("http://" + config + ":1880/getData")
    .then((response) => response.json())
    .then((data) => {
      // Parse the Temp_Cathlab value as a float
      const tempCathlab = parseFloat(data[0].Temp_Cathlab);
      const tempMachine = parseFloat(data[0].Temp_Machine);
      const rhCathlab = parseFloat(data[0].RH_Cathlab);
      const rhMachine = parseFloat(data[0].RH_Machine);
      const preFilter = parseFloat(data[0].Pre_Filter);
      const hepaFilter = parseFloat(data[0].HEPA_Filter);
      const outdoorUnit = parseFloat(data[0].Outdoor_Unit);
      const ahuStatus = parseFloat(data[0].AHU_Status);
      const bFan = parseFloat(data[0].Booster_Fan);
      const eFan = parseFloat(data[0].Exhaust_Fan);
      const heat1 = parseFloat(data[0].Heater_1);
      const heat2 = parseFloat(data[0].Heater_2);
      console.log(data[0]); // Log the data object to inspect its structure

      // Update the value parameter of the JustGage instance
      chartraw.refresh(tempCathlab);
      chartraw1.refresh(tempMachine);
      chartraww.refresh(rhCathlab);
      chartraww2.refresh(rhMachine);
      chartfm1.refresh(preFilter);
      if (preFilter >= 180) {
        document.getElementById("prefil").style.background = "orangered";
        document.getElementById("prefil").textContent = "Warning";
        document.getElementById("prefil").style.color = "yellow";
      } else {
        document.getElementById("prefil").style.backgroundColor = "";
        document.getElementById("prefil").textContent = "Good";
        document.getElementById("prefil").style.color = "darkgreen";
      }
      chartfm3.refresh(hepaFilter);
      if (hepaFilter >= 180) {
        document.getElementById("hepafil").style.backgroundColor = "blue";
        document.getElementById("hepafil").textContent = "Warning";
        document.getElementById("hepafil").style.color = "blue";
      } else {
        document.getElementById("hepafil").style.backgroundColor = " ";
        document.getElementById("hepafil").textContent = "Good";
        document.getElementById("hepafil").style.color = "darkgreen";
      }
      document.getElementById("tempCat").textContent = tempCathlab + " °C";
      tempcathlab1 = tempCathlab;
      document.getElementById("tempMac").textContent = tempMachine + " °C";
      document.getElementById("rhCath").textContent = rhCathlab + " %";
      document.getElementById("rhMac").textContent = rhMachine + " %";
      // document.getElementById("prefil").textContent = preFilter + " Pa";
      // document.getElementById("hepafil").textContent = hepaFilter + " Pa";

      const outdoorUnitElement = document.getElementById("OutdoorUnit");
      const outdoorIcon = document.getElementById("outdooricon");
      if (outdoorUnit === 1) {
        outdoorUnitElement.textContent = "ON";
        outdoorUnitElement.style.color = "#0085cb";
        outdoorIcon.classList.add("bx-flashing");
        outdoorIcon.style.color = "";
      } else {
        outdoorUnitElement.textContent = "OFF";
        outdoorUnitElement.style.color = "red";
        outdoorIcon.classList.remove("bx-flashing");
        outdoorIcon.style.color = "red";
      }
      const AHUElement = document.getElementById("AHU");
      const ahuIcon = document.getElementById("ahuicon");
      if (ahuStatus === 1) {
        AHUElement.textContent = "ON";
        AHUElement.style.color = "#0085cb";
        ahuIcon.classList.add("bx-flashing");
        ahuIcon.style.color = "";
      } else {
        AHUElement.textContent = "OFF";
        AHUElement.style.color = "red";
        ahuIcon.classList.remove("bx-flashing");
        ahuIcon.style.color = "red";
      }
      const BFElement = document.getElementById("Booster");
      const BFIcon = document.getElementById("boostericon");
      if (bFan === 1) {
        BFElement.textContent = "ON";
        BFElement.style.color = "#0085cb";
        BFIcon.classList.add("bx-spin");
        BFIcon.style.color = "";
      } else {
        BFElement.textContent = "OFF";
        BFElement.style.color = "red";
        BFIcon.classList.remove("bx-spin");
        BFIcon.style.color = "red";
      }
      const EFElement = document.getElementById("Exhaust");
      const EFIcon = document.getElementById("exhausticon");
      if (eFan === 1) {
        EFElement.textContent = "ON";
        EFElement.style.color = "#0085cb";
        EFIcon.classList.add("bx-spin");
        EFIcon.style.color = "";
      } else {
        EFElement.textContent = "OFF";
        EFElement.style.color = "red";
        EFIcon.classList.remove("bx-spin");
        EFIcon.style.color = "red";
      }
      const Heat1Element = document.getElementById("Heat1");
      const Heat1Icon = document.getElementById("heat1icon");
      if (heat1 === 1) {
        Heat1Element.textContent = "ON";
        Heat1Element.style.color = "#0085cb";
        Heat1Icon.classList.add("bx-spin");
        Heat1Icon.style.color = "";
      } else {
        Heat1Element.textContent = "OFF";
        Heat1Element.style.color = "red";
        Heat1Icon.classList.remove("bx-spin");
        Heat1Icon.style.color = "red";
      }
      const Heat2Element = document.getElementById("Heat2");
      const Heat2Icon = document.getElementById("heat2icon");
      if (heat2 === 1) {
        Heat2Element.textContent = "ON";
        Heat2Element.style.color = "#0085cb";
        Heat2Icon.classList.add("bx-spin");
        Heat2Icon.style.color = "";
      } else {
        Heat2Element.textContent = "OFF";
        Heat2Element.style.color = "red";
        Heat2Icon.classList.remove("bx-spin");
        Heat2Icon.style.color = "red";
      }
      removeNotification();
    })
    .catch((error) => {
      console.error("Error:", error);
      console.error("Error:", error);
      // Show notification for connection error
      showNotification("Connecting...");
    });
}

// Function to show notification
function showNotification(message) {
  let notificationElement = document.querySelector(".notification");

  // If notification already exists, update its content
  if (notificationElement) {
    notificationElement.textContent = message;
  } else {
    // Create new notification div
    notificationElement = document.createElement("div");
    notificationElement.textContent = message;
    notificationElement.classList.add("notification");

    // Create refresh button
    const refreshButton = document.createElement("button");
    refreshButton.textContent = "Refresh";
    refreshButton.classList.add("refresh-button");

    // Add click event listener to refresh button
    refreshButton.addEventListener("click", function () {
      // Refresh the page
      window.location.reload();
    });

    // Append refresh button to notification div
    notificationElement.appendChild(refreshButton);

    // Append notification div to body
    document.body.appendChild(notificationElement);
  }
}

// Function to remove notification
function removeNotification() {
  const notificationElement = document.querySelector(".notification");
  if (notificationElement) {
    notificationElement.remove();
  }
}

// Call the function to update the gauge value initially and periodically
updateGaugeValue();
setInterval(updateGaugeValue, 5000); // Refresh every 5 seconds (adjust as needed)

// [[[[[[[[[[END OF FUNCTION GET DATA]]]]]]]]]]

let chartraw = new JustGage({
  id: "gauRaw",
  value: 0,
  valueFontColor: "#003b7d",
  min: 0,
  max: 50,
  hideMinMax: true,
  title: "Temperature",
  titleFontColor: "#003b7d",
  label: "°C",
  labelFontColor: "#003b7d",
  levelColors: [
    "#00B6D4", // Blue (low)
    "#00FF50", // Green (medium)
    "#FF0000", // Red (high)
  ],
  gaugeWidthScale: 0.6, // Set to 1 for a full circle
  gaugeColor: "rgba(115, 255, 202, 1)", // Adjust the alpha value for transparency
  counter: true,
  pointer: true,
  pointerOptions: {
    toplength: 0,
    bottomlength: 10,
    bottomwidth: 0,
    color: "#ffffff",
    stroke: "#64748b",
    stroke_width: 3,
    stroke_linecap: "round",
  },
  donut: true,
  donutStartAngle: -30,
  shadowSize: 2,
  shadowVerticalOffset: 7,
  relativeGaugeSize: true,
  showInnerShadow: true,
  shadowOpacity: 0.5,
  customSectors: [
    {
      color: "#2b59fb", // Light blue
      lo: 0,
      hi: 20,
    },
    {
      color: "#40bb45", // Lime green
      lo: 20,
      hi: 23,
    },
    {
      color: "#FFFF00", // Yellow
      lo: 23,
      hi: 26,
    },
    {
      color: "#FF0000", // Red
      lo: 27,
      hi: 40,
    },
  ],
  levelColorsGradient: true,
});

let chartraww = new JustGage({
  id: "gauRaww",
  value: 0,
  valueFontColor: "#003b7d",
  min: 0,
  max: 100,
  hideMinMax: true,
  title: "Relative Humidity",
  titleFontColor: "#003b7d",
  label: "%",
  labelFontColor: "#003b7d",
  levelColors: [
    "#00B6D4", // Blue (low)
    "#00FF50", // Green (medium)
    "#FF0000", // Red (high)
  ],
  gaugeWidthScale: 0.6, // Set to 1 for a full circle
  gaugeColor: "rgba(115, 255, 202, 1)", // Adjust the alpha value for transparency
  counter: true,
  pointer: true,
  pointerOptions: {
    toplength: 0,
    bottomlength: 10,
    bottomwidth: 0,
    color: "#ffffff",
    stroke: "#64748b",
    stroke_width: 3,
    stroke_linecap: "round",
  },
  donut: true,
  donutStartAngle: -30,
  shadowSize: 2,
  shadowVerticalOffset: 7,
  relativeGaugeSize: true,
  showInnerShadow: true,
  shadowOpacity: 0.5,
  customSectors: [
    {
      color: "#2b59fb", // Light blue
      lo: 50,
      hi: 60,
    },
    {
      color: "#bf8c11", // Lime green
      lo: 60,
      hi: 65,
    },
    {
      color: "#FFFF00", // Yellow
      lo: 65,
      hi: 70,
    },
    {
      color: "#FF0000", // Red
      lo: 71,
      hi: 85,
    },
  ],
  levelColorsGradient: true,
});

let chartraw1 = new JustGage({
  id: "gauRaw1",
  value: 0,
  valueFontColor: "#003b7d",
  min: 0,
  max: 50,
  hideMinMax: true,
  title: "Temperature",
  titleFontColor: "#003b7d",
  label: "°C",
  labelFontColor: "#003b7d",
  levelColors: [
    "#00B6D4", // Blue (low)
    "#00FF50", // Green (medium)
    "#FF0000", // Red (high)
  ],
  gaugeWidthScale: 0.6, // Set to 1 for a full circle
  gaugeColor: "rgba(115, 255, 202, 1)", // Adjust the alpha value for transparency
  counter: true,
  pointer: true,
  pointerOptions: {
    toplength: 0,
    bottomlength: 10,
    bottomwidth: 0,
    color: "#ffffff",
    stroke: "#64748b",
    stroke_width: 3,
    stroke_linecap: "round",
  },
  donut: true,
  donutStartAngle: -30,
  shadowSize: 2,
  shadowVerticalOffset: 7,
  relativeGaugeSize: true,
  showInnerShadow: true,
  shadowOpacity: 0.5,
  customSectors: [
    {
      color: "#2b59fb", // Light blue
      lo: 0,
      hi: 20,
    },
    {
      color: "#40bb45", // Lime green
      lo: 20,
      hi: 23,
    },
    {
      color: "#FFFF00", // Yellow
      lo: 23,
      hi: 26,
    },
    {
      color: "#FF0000", // Red
      lo: 27,
      hi: 40,
    },
  ],
  levelColorsGradient: true,
});

// Function to add shadow to label, value, and title

let chartraww2 = new JustGage({
  id: "gauRaww2",
  value: 0,
  valueFontColor: "#003b7d",
  min: 0,
  max: 100,
  hideMinMax: true,
  title: "Relative Humidity",
  titleFontColor: "#003b7d",
  label: "%",
  labelFontColor: "#003b7d",
  levelColors: [
    "#00B6D4", // Blue (low)
    "#00FF50", // Green (medium)
    "#FF0000", // Red (high)
  ],
  gaugeWidthScale: 0.6, // Set to 1 for a full circle
  gaugeColor: "rgba(115, 255, 202, 1)", // Adjust the alpha value for transparency
  counter: true,
  pointer: true,
  pointerOptions: {
    toplength: 0,
    bottomlength: 10,
    bottomwidth: 0,
    color: "#ffffff",
    stroke: "#64748b",
    stroke_width: 3,
    stroke_linecap: "round",
  },
  donut: true,
  donutStartAngle: -30,
  shadowSize: 2,
  shadowVerticalOffset: 7,
  relativeGaugeSize: true,
  showInnerShadow: true,
  shadowOpacity: 0.5,
  customSectors: [
    {
      color: "#2b59fb", // Light blue
      lo: 50,
      hi: 60,
    },
    {
      color: "#bf8c11", // Lime green
      lo: 60,
      hi: 65,
    },
    {
      color: "#FFFF00", // Yellow
      lo: 65,
      hi: 70,
    },
    {
      color: "#FF0000", // Red
      lo: 71,
      hi: 85,
    },
  ],
  levelColorsGradient: true,
});

let chartfm1 = new JustGage({
  id: "gaufm1",
  value: 0,
  valueFontColor: "#003b7d",
  min: 0,
  max: 500,
  hideMinMax: true,
  title: "Pre & Medium Filter",
  titleFontColor: "#003b7d",
  label: "Pa",
  labelFontColor: "#003b7d",
  levelColors: [
    "#00B6D4", // Blue (low)
    "#00FF50", // Green (medium)
    "#FF0000", // Red (high)
  ],
  gaugeWidthScale: 0.6, // Set to 1 for a full circle
  gaugeColor: "rgba(115, 255, 202, 1)", // Adjust the alpha value for transparency
  counter: true,
  pointer: true,
  pointerOptions: {
    toplength: 0,
    bottomlength: 10,
    bottomwidth: 0,
    color: "#ffffff",
    stroke: "#64748b",
    stroke_width: 3,
    stroke_linecap: "round",
  },
  // donut: true,
  // donutStartAngle: -90,
  shadowSize: 2,
  shadowVerticalOffset: 7,
  // relativeGaugeSize: true,
  showInnerShadow: true,
  shadowOpacity: 0.5,
  customSectors: [
    {
      color: "#00B6D4", // Light blue
      lo: 0,
      hi: 100,
    },
    {
      color: "#00FF50", // Lime green
      lo: 100,
      hi: 180,
    },
    {
      color: "#FFFF00", // Yellow
      lo: 180,
      hi: 250,
    },
    {
      color: "#FF0000", // Red
      lo: 250,
      hi: 500,
    },
  ],
  levelColorsGradient: true,
});

let chartfm2 = new JustGage({
  id: "gaufm2",
  value: 0,
  valueFontColor: "#003b7d",
  min: 0,
  max: 500,
  hideMinMax: true,
  titleFontColor: "#64748b",
  label: "Pa",
  levelColors: [
    "#00B6D4", // Blue (low)
    "#00FF50", // Green (medium)
    "#FF0000", // Red (high)
  ],
  gaugeWidthScale: 0.6, // Set to 1 for a full circle
  gaugeColor: "rgba(115, 255, 202, 1)", // Adjust the alpha value for transparency
  counter: true,
  pointer: true,
  pointerOptions: {
    toplength: 0,
    bottomlength: 10,
    bottomwidth: 0,
    color: "#ffffff",
    stroke: "#64748b",
    stroke_width: 3,
    stroke_linecap: "round",
  },
  // donut: true,
  // donutStartAngle: -90,
  shadowSize: 2,
  shadowVerticalOffset: 7,
  // relativeGaugeSize: true,
  showInnerShadow: true,
  shadowOpacity: 0.5,
  customSectors: [
    {
      color: "#00B6D4", // Light blue
      lo: 0,
      hi: 100,
    },
    {
      color: "#00FF50", // Lime green
      lo: 100,
      hi: 180,
    },
    {
      color: "#FFFF00", // Yellow
      lo: 180,
      hi: 250,
    },
    {
      color: "#FF0000", // Red
      lo: 250,
      hi: 500,
    },
  ],
  levelColorsGradient: true,
});

let chartfm3 = new JustGage({
  id: "gaufm3",
  value: 0,
  valueFontColor: "#003b7d",
  min: 0,
  max: 500,
  hideMinMax: true,
  title: "HEPA Filter",
  titleFontColor: "#003b7d",
  label: "Pa",
  labelFontColor: "#003b7d", // Set the color of the label
  labelFontSize: 148, // Set the font size of the label
  levelColors: [
    "#00B6D4", // Blue (low)
    "#00FF50", // Green (medium)
    "#FF0000", // Red (high)
  ],
  gaugeWidthScale: 0.6, // Set to 1 for a full circle
  gaugeColor: "rgba(115, 255, 202, 1)", // Adjust the alpha value for transparency
  counter: true,
  pointer: true,
  pointerOptions: {
    toplength: 0,
    bottomlength: 10,
    bottomwidth: 0,
    color: "#ffffff",
    stroke: "#64748b",
    stroke_width: 3,
    stroke_linecap: "round",
  },
  // donut: true,
  // donutStartAngle: -90,
  shadowSize: 2,
  shadowVerticalOffset: 7,
  // relativeGaugeSize: true,
  showInnerShadow: true,
  shadowOpacity: 0.5,
  customSectors: [
    {
      color: "#00B6D4", // Light blue
      lo: 0,
      hi: 100,
    },
    {
      color: "#00FF50", // Lime green
      lo: 100,
      hi: 180,
    },
    {
      color: "#FFFF00", // Yellow
      lo: 180,
      hi: 250,
    },
    {
      color: "#FF0000", // Red
      lo: 250,
      hi: 500,
    },
  ],
  levelColorsGradient: true,
});

function addSeparator(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Get the modal
const modal = document.getElementById("myModal");
// Get the elements inside the modal
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const passwordInput = document.getElementById("passwordInput");
const modalActionButton = document.getElementById("modalActionButton");
let modalstatus = "";
// Function to open the modal
function openModal(data) {
  modal.style.display = "block";
  console.log(data);
  modalstatus = data;
}
function openModalinfo() {
  var modal = document.getElementById("infoModal");
  modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
  modal.style.display = "none";
}

function closeModalinfo() {
  var modal = document.getElementById("infoModal");
  modal.style.display = "none";
}

// Function to handle modal action (password verification or close)
function verifyPassword() {
  const passwordInput = document.getElementById("passwordInput").value;
  // Replace 'your-password' with the actual password
  if (passwordInput === passwordhvac) {
    alert(
      "Password is correct. Proceed with " + modalstatus + " functionality."
    );
    closeModal(); // Close the modal if password is correct
    document.getElementById("passwordInput").value = ""; // Reset password input
    let stat = 0;
    if (modalstatus === "ON") {
      stat = 1;
    } else {
      stat = 0;
    }
    if (GV_automanual === 0) {
      console.error("Manual Mode Still Active, Switch to AUTO on the Panel to  Gain Remote Access")
      alert("Manual Mode Still Active, Switch to AUTO on the Panel to  Gain Remote Access")
    }
    else {
      fetch(`http://` + config + `:1880/setUnitStat?value=${stat}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(" updated successfully:", data);
      })
      .catch((error) => {
        console.error("There was a problem updating :", error);
      });
    }
    
  } else {
    alert("Incorrect password. Please try again.");
    document.getElementById("passwordInput").value = ""; // Reset password input
    closeModal(); // Close the modal if password is correct
  }
}

var options = {
  series: [20],
  chart: {
    height: 350,
    type: "radialBar",
    toolbar: {
      show: false,
    },
    events: {
      rendered: function (chartContext, config) {
        // Update the custom label with the initial value
        document.getElementById("chart-value").innerText = options.series[0];
      },
      dataPointSelection: function (event, chartContext, config) {
        // Update the custom label when the data point is selected
        var value = config.w.globals.series[config.dataPointIndex];
        document.getElementById("chart-value").innerText = value;
      },
    },
  },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 225,
      hollow: {
        margin: 0,
        size: "70%",
        background: "#bdffc2",
        dropShadow: {
          enabled: true,
          top: 3,
          left: 0,
          blur: 4,
          opacity: 0.24,
        },
      },
      track: {
        background: "#407a45",
        strokeWidth: "67%",
        margin: 0,
        dropShadow: {
          enabled: true,
          top: -3,
          left: 0,
          blur: 4,
          opacity: 0.35,
        },
      },
      dataLabels: {
        show: true,
        name: {
          offsetY: -10,
          show: true,
          color: "#888",
          fontSize: "17px",
        },
        value: {
          formatter: function (val) {
            return parseInt(val);
          },
          color: "#111",
          fontSize: "30px",
          show: true,
          offsetY: 0,
          offsetX: -20, // Adjust this to move the value to the left
        },
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "horizontal",
      shadeIntensity: 0.5,
      gradientToColors: ["#00FF50", "#FFFF00", "#FF0000"], // End colors of the gradient
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 33, 66, 100], // Define the stops for the gradient
    },
  },
  stroke: {
    lineCap: "round",
  },
  labels: [" "],
  colors: ["#00B6D4"], // Starting color of the gradient
};

var chart = new ApexCharts(document.querySelector("#chart_sssss"), options);
chart.render();
