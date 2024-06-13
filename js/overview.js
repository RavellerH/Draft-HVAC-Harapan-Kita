function hidebtn(){
  document.getElementById("btntempup").style.display = "none";
  document.getElementById("btnrhup").style.display = "none";
  document.getElementById("btntempdown").style.display = "none";
  document.getElementById("btnrhdown").style.display = "none";
  document.getElementById("btndone").style.display = "none";
  document.getElementById("btnset").style.display = "block";
}
 hidebtn()
 setInterval(updateValue, 5000);

 function showbtn(){
  document.getElementById("btntempup").style.display = "block";
  document.getElementById("btnrhup").style.display = "block";
  document.getElementById("btntempdown").style.display = "block";
  document.getElementById("btnrhdown").style.display = "block";
  document.getElementById("btndone").style.display = "block";
  document.getElementById("btnset").style.display = "none";
}

let config = {};
getConfig();
setInterval(getConfig, 1000);
// Function to fetch configuration
function getConfig() {
  // Replace 'config.json' with the path to your configuration file
  const response = fetch("../config.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.serverIP);
      config = data.serverIP;
    })
    .catch((error) => {
      console.error("Error fetching configuration:", error);
      return {}; // Return an empty object if there's an error
    });

  return response;
}

function updateValue() {
  fetch("http://" + config + ":1880/getData")
    .then((response) => response.json())
    .then((data) => {
      const preFilter = parseFloat(data[0].Pre_Filter);
      const hepaFilter = parseFloat(data[0].HEPA_Filter);
      const outdoorUnit = parseFloat(data[0].Outdoor_Unit);
      const ahuStatus = parseFloat(data[0].AHU_Status);
      const bFan = parseFloat(data[0].Booster_Fan);
      const eFan = parseFloat(data[0].Exhaust_Fan);
      const heat1 = parseFloat(data[0].Heater_1);
      const heat2 = parseFloat(data[0].Heater_2);

      const exhaustStatusElement = document.getElementById("Exhaust_status");
      const outdoorStatusElement = document.getElementById("Outdoor_status");
      const heat1StatusElement = document.getElementById("Heater1_status");
      const heat2StatusElement = document.getElementById("Heater2_status");
      const boosterStatusElement = document.getElementById("Booster_status");
      const filterStatusElement = document.getElementById("Filter_status");
      const hepaStatusElement = document.getElementById("HEPA_status");
      const ahuStatusElement = document.getElementById("AHU_status");

      if (ahuStatus === 1) {
        ahuStatusElement.style.backgroundColor =
        ahuStatusElement.style.backgroundColor === "lime"
            ? "#CCFF99"
            : "lime";
            ahuStatusElement.style.color = "white"; // Text color
            ahuStatusElement.textContent = "Running";
      } else {
        ahuStatusElement.style.backgroundColor = "red";
        ahuStatusElement.style.color = "white"; // Text color
        ahuStatusElement.textContent = "Stopped";
      }
      if (eFan === 1) {
        exhaustStatusElement.style.backgroundColor =
          exhaustStatusElement.style.backgroundColor === "lime"
            ? "#CCFF99"
            : "lime";
        exhaustStatusElement.style.color = "white"; // Text color
        exhaustStatusElement.textContent = "Running";
      } else {
        exhaustStatusElement.style.backgroundColor = "red";
        exhaustStatusElement.style.color = "white"; // Text color
        exhaustStatusElement.textContent = "Stopped";
      }
      if (outdoorUnit === 1) {
        outdoorStatusElement.style.backgroundColor =
          outdoorStatusElement.style.backgroundColor === "lime"
            ? "#CCFF99"
            : "lime";
        outdoorStatusElement.style.color = "white"; // Text color
        outdoorStatusElement.textContent = "Running";
      } else {
        outdoorStatusElement.style.backgroundColor = "red";
        outdoorStatusElement.style.color = "white"; // Text color
        outdoorStatusElement.textContent = "Stopped";
      }
      if (heat1 === 1) {
        heat1StatusElement.style.backgroundColor =
          heat1StatusElement.style.backgroundColor === "lime"
            ? "#CCFF99"
            : "lime";
        heat1StatusElement.style.color = "white"; // Text color
        heat1StatusElement.textContent = "Running";
      } else {
        heat1StatusElement.style.backgroundColor = "red";
        heat1StatusElement.style.color = "white"; // Text color
        heat1StatusElement.textContent = "Stopped";
      }
      if (heat2 === 1) {
        heat2StatusElement.style.backgroundColor =
          heat2StatusElement.style.backgroundColor === "lime"
            ? "#CCFF99"
            : "lime";
        heat2StatusElement.style.color = "white"; // Text color
        heat2StatusElement.textContent = "Running";
      } else {
        heat2StatusElement.style.backgroundColor = "red";
        heat2StatusElement.style.color = "white"; // Text color
        heat2StatusElement.textContent = "Stopped";
      }
      if (bFan === 1) {
        boosterStatusElement.style.backgroundColor =
          boosterStatusElement.style.backgroundColor === "lime"
            ? "#CCFF99"
            : "lime";
        boosterStatusElement.style.color = "white"; // Text color
        boosterStatusElement.textContent = "Running";
      } else {
        boosterStatusElement.style.backgroundColor = "red";
        boosterStatusElement.style.color = "white"; // Text color
        boosterStatusElement.textContent = "Stopped";
      }
      

      const tempCathlab = parseFloat(data[0].Temp_Cathlab);
      const rhCathlab = parseFloat(data[0].RH_Cathlab);

      const TempElement = document.getElementById("TBDSAa");
      TempElement.textContent = tempCathlab + "°C";
      const RHElement = document.getElementById("TBDSBb");
      RHElement.textContent = rhCathlab + "%";
      removeNotification();
    })
    .catch((error) => {
      console.error("Error:", error);
      // Show notification for connection error
      showNotification("Connecting...");
    });
  fetch("http://" + config + ":1880/getDataSetting")
    .then((response) => response.json())
    .then((data) => {
      const currentTemperature = parseFloat(data[0].TempCathlab);
      const TBDSAElement = document.getElementById("TBDSA");
      TBDSAElement.textContent = currentTemperature + "°C";
      const currentRH = parseFloat(data[0].RHCathlab);
      const TBDSBRHElement = document.getElementById("TBDSBRH");
      TBDSBRHElement.textContent = currentRH + "%";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
// Function to show notification
function showNotification(message) {
  const notificationElement = document.createElement("div");
  notificationElement.textContent = message;
  notificationElement.classList.add("notification");
  document.body.appendChild(notificationElement);
}

// Function to remove notification
function removeNotification() {
  const notificationElement = document.querySelector(".notification");
  if (notificationElement) {
    notificationElement.remove();
  }
}
updateValue();
setInterval(updateValue, 1000);

function changeTemperature(delta) {
  const TBDSAElement = document.getElementById("TBDSA");
  let currentTemperature = parseInt(TBDSAElement.textContent); // Get current temperature as an integer
  // currentTemperature += delta; // Increment or decrement the temperature based on the delta
  const newTemperature = currentTemperature + delta;
  // Check if the new temperature is within the acceptable range (18 to 26 degrees Celsius)
  if (newTemperature < 18 || newTemperature > 26) {
    console.log(
      "Temperature is outside the acceptable range (18 to 26 degrees Celsius). Skipping update."
    );
    return; // Exit the function without updating the temperature
  }

  TBDSAElement.textContent = newTemperature + "°C"; // Update the temperature value in the HTML

  // Send the updated temperature value to the server via HTTP GET request
  fetch(`http://` + config + `:1880/setDataTempM?value=${newTemperature}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Temperature updated successfully:", data);
    })
    .catch((error) => {
      console.error("There was a problem updating the temperature:", error);
    });
}
function changeRH(delta) {
  const TBDSBRHElement = document.getElementById("TBDSBRH");
  let currentRH = parseInt(TBDSBRHElement.textContent); // Get current temperature as an integer
  // currentRH += delta; // Increment or decrement the temperature based on the delta
  const newRH = currentRH + delta;
  // Check if the new temperature is within the acceptable range (18 to 26 degrees Celsius)
  if (newRH < 50 || newRH > 60) {
    console.log(
      "RH is outside the acceptable range (50 to 60). Skipping update."
    );
    return; // Exit the function without updating the temperature
  }

  TBDSBRHElement.textContent = newRH + "%"; // Update the temperature value in the HTML

  // Send the updated temperature value to the server via HTTP GET request
  fetch(`http://` + config + `:1880/setDataRHM?value=${newRH}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Temperature updated successfully:", data);
    })
    .catch((error) => {
      console.error("There was a problem updating the temperature:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    const overview = document.getElementById("overview");
    overview.classList.add("active");
  }, 2);
});

let totalizerData = [
  {
    diffElementId: "diffTRW",
    elementId: "Totalizer_Raw_Water",
    dataKey: "Totalizer_Raw",
    unit: " m<sup>3</sup>",
  },
  {
    diffElementId: "diffTPW0",
    elementId: "Totalizer_Product_Water0",
    dataKey: "Totalizer_Product",
    unit: " m<sup>3</sup>",
  },
  {
    diffElementId: "diffTPW1",
    elementId: "Totalizer_Product_Water1",
    dataKey: "TOTALIZER_PRODUCT_1",
    unit: " m<sup>3</sup>",
  },
  {
    diffElementId: "diffTPW2",
    elementId: "Totalizer_Product_Water2",
    dataKey: "TOTALIZER_PRODUCT_2",
    unit: " m<sup>3</sup>",
  },
  {
    diffElementId: "diffTBW",
    elementId: "Totalizer_Backwash_Water",
    dataKey: "TOTALIZER_TBW",
    unit: " m<sup>3</sup>",
  },
  {
    diffElementId: "diffreservoir",
    elementId: "Reservoir_Volume",
    dataKey: "Reservoir_Volume",
    unit: " m<sup>3</sup>",
  },
];

let elementsToUpdate = [
  { id: "tbdraw", key: "Turbidity_Raw", unit: " NTU" },
  { id: "phraw", key: "pH_Raw", unit: "" },
  { id: "tbdproduct", key: "Turbidity_Product", unit: " NTU" },
  { id: "phproduct", key: "pH_Product", unit: "" },
  { id: "TBDSA", key: "Turbidity_Sedimentation_A", unit: " NTU" },
  { id: "TBDSB", key: "Turbidity_Sedimentation_B", unit: " NTU" },
  { id: "Chlorine", key: "Chlorine_Product", unit: " ppm" },
  { id: "Flow_Rate_Raw", key: "Flow_Rate_Raw", unit: " LPS" },
  { id: "Totalizer_Raw_Water", key: "Totalizer_Raw", unit: " m<sup>3</sup>" },
  { id: "Flow_Rate_Product", key: "Flow_Rate_Product", unit: " LPS" },
  {
    id: "Totalizer_Product_Water",
    key: "Totalizer_Product",
    unit: " m<sup>3</sup>",
  },
  { id: "Reservoir_Volume", key: "Reservoir_Volume", unit: " m<sup>3</sup>" },
  { id: "Reservoir", key: "Reservoir_Level", unit: " cm" },
  { id: "Flow_Rate_Product1", key: "FLOWRATE_PRODUCT_1", unit: " LPS" },
  {
    id: "Totalizer_Product_Water1",
    key: "TOTALIZER_PRODUCT_1",
    unit: " m<sup>3</sup>",
  },
  { id: "Flow_Rate_Product2", key: "FLOWRATE_PRODUCT_2", unit: " LPS" },
  {
    id: "Totalizer_Product_Water2",
    key: "TOTALIZER_PRODUCT_2",
    unit: " m<sup>3</sup>",
  },
];

function addSeparator(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function updateDiffElement(diffElement, diffValue) {
  let diffplusmin = diffValue < 0 ? "-" : "+";
  let formattedDiff = addSeparator(Math.abs(diffValue).toFixed(2));
  diffElement.classList.add(diffValue < 0 ? "text-danger" : "text-success");
  diffElement.innerHTML = `${diffplusmin}${formattedDiff}`;
}

function updateElementValues(data) {
  let lastData = data[data.length - 1];

  for (let i = 0; i < elementsToUpdate.length; i++) {
    let elementInfo = elementsToUpdate[i];
    let value = lastData[elementInfo.key];
    let formattedValue = `${addSeparator(value)}${elementInfo.unit}`;
    document.getElementById(elementInfo.id).innerHTML = formattedValue;
  }
}

function processData(data, dataIndex) {
  let totalizer = totalizerData[dataIndex];
  let diffElement = document.getElementById(totalizer.diffElementId);
  totalizer.data = data.map((item) => item[totalizer.dataKey]);
  let diffPercent =
    totalizer.data[totalizer.data.length - 1] - totalizer.data[0];
  document.getElementById(totalizer.elementId).innerHTML = addSeparator(
    totalizer.data[totalizer.data.length - 1]
  );

  updateDiffElement(diffElement, diffPercent);
}

function start() {
  let http = new XMLHttpRequest();
  http.open("GET", "http://127.0.0.1:1887/GetCurrent", true);
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText);

      updateElementValues(data);
      for (let i = 0; i < totalizerData.length; i++) {
        processData(data, i);
      }
      setTimeout(start, 1000);
    }
  };
}

setTimeout(start, 500);






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
  if (passwordInput === "hvac5") {
    alert(
      "Password is correct. Proceed with " + modalstatus + " functionality."
    );
    closeModal(); // Close the modal if password is correct
    document.getElementById("passwordInput").value = ""; // Reset password input
    let stat = 0;
    if (modalstatus === "SET") {
      
      showbtn()
      
    } if (modalstatus === "DOWN") {
     
    }
    
      
  } else {
    alert("Incorrect password. Please try again.");
    document.getElementById("passwordInput").value = ""; // Reset password input
    closeModal(); // Close the modal if password is correct
  }
}