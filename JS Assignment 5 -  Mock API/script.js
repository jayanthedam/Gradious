let eventData = [];

function updateEvent(row_id) {
  const rowContainer = document.getElementById('row_' + row_id);
  const eventNameDiv = document.getElementById('eventName_' + row_id);
  const dateDiv = document.getElementById('date_' + row_id);
  const locationDiv = document.getElementById('location_' + row_id);
  const organizerDiv = document.getElementById('organizer_' + row_id);

  const eventName = eventNameDiv.innerText;
  const eventDate = dateDiv.innerText;
  const eventLocation = locationDiv.innerText;
  const eventOrganizer = organizerDiv.innerText;

  eventNameDiv.innerText = "";
  dateDiv.innerText = "";
  locationDiv.innerText = "";
  organizerDiv.innerText = "";

  const eventNameInput = document.createElement('input');
  eventNameInput.value = eventName;
  eventNameDiv.appendChild(eventNameInput);

  const dateInput = document.createElement('input');
  dateInput.value = eventDate;
  dateDiv.appendChild(dateInput);

  const locationInput = document.createElement('input');
  locationInput.value = eventLocation;
  locationDiv.appendChild(locationInput);

  const organizerInput = document.createElement('input');
  organizerInput.value = eventOrganizer;
  organizerDiv.appendChild(organizerInput);

  const saveButton = document.createElement('button');
  saveButton.className = "save_button";
  saveButton.textContent = 'Save';
  saveButton.onclick = function () {
    const updatedEventName = eventNameInput.value;
    const updatedEventDate = dateInput.value;
    const updatedEventLocation = locationInput.value;
    const updatedEventOrganizer = organizerInput.value;

    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("demo").innerHTML = "Event updated successfully.";
        fetchUsers();
      }
    };

    var url = "https://665036cfec9b4a4a6031238c.mockapi.io/EventName/" + row_id;
    http.open("PUT", url, true);
    http.setRequestHeader("Content-type", "application/json");

    var data = JSON.stringify({
      EventName: updatedEventName,
      Date: updatedEventDate,
      Location: updatedEventLocation,
      Organizer: updatedEventOrganizer
    });

    http.send(data);
  };

  const updateDeleteDiv = document.getElementById('updateDelete_' + row_id);
  const updateButton = document.getElementById('updateBtn_' + row_id);
  updateDeleteDiv.replaceChild(saveButton, updateButton);
}

function addUser() {

  const main = document.getElementById("main");
  const add_btn = document.getElementById("addUser_btn");
  const addInput = document.getElementById("add_input");

  var eventName_add = document.getElementById("eventName_add").value;
  var eventDate_add = document.getElementById("eventDate_add").value;
  var eventLocation_add = document.getElementById("eventLocation_add").value;
  var eventOrganizer_add = document.getElementById("eventOrganizer_add").value;

 
  var http = new XMLHttpRequest();
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {
      document.getElementById("demo").innerHTML = "User added successfully.";
      fetchUsers();
      
      main.style.display = "block";
      add_btn.style.display = "block";
      addInput.style.display = "none";

     
      document.getElementById("eventName_add").value = "";
      document.getElementById("eventDate_add").value = "";
      document.getElementById("eventLocation_add").value = "";
      document.getElementById("eventOrganizer_add").value = "";
    }
  };
  http.open("POST", "https://665036cfec9b4a4a6031238c.mockapi.io/EventName", true);
  http.setRequestHeader("Content-type", "application/json");
  http.send(
    JSON.stringify({
      EventName: eventName_add,
      Date: eventDate_add,
      Location: eventLocation_add,
      Organizer: eventOrganizer_add
    })
  );
}

function showAddForm() {
  
  const main = document.getElementById("main");
  const add_btn = document.getElementById("addUser_btn");
  const addInput = document.getElementById("add_input");

  
  main.style.display = "none";
  add_btn.style.display = "none"; 
  addInput.style.display = "flex";
  addInput.style.alignItems = "center";
  addInput.style.flexDirection = "column";
}

function fetchUsers() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var responseObj = JSON.parse(this.responseText);
      eventData = responseObj;
      loadData();
    }
  };
  http.open("GET", "https://665036cfec9b4a4a6031238c.mockapi.io/EventName", true);
  http.send();
}

function loadData() {
  const tableContainer = document.querySelector('.table_ctn');

  while (tableContainer.children.length > 1) 
    tableContainer.removeChild(tableContainer.lastChild);
    
  let temp = 1;

  eventData.forEach(event => {
    const rowContainer = document.createElement('div');
    rowContainer.className = 'row_container';
    rowContainer.id = `row_${event.id}`;

    const idDiv = document.createElement('div');
    const eventNameDiv = document.createElement('div');
    const dateDiv = document.createElement('div');
    const locationDiv = document.createElement('div');
    const organizerDiv = document.createElement('div');
    const updateDelete = document.createElement('div');

    idDiv.className = eventNameDiv.className = dateDiv.className = locationDiv.className = organizerDiv.className = updateDelete.className = 'rows';

    idDiv.id = `id_${event.id}`;
    eventNameDiv.id = `eventName_${event.id}`;
    dateDiv.id = `date_${event.id}`;
    locationDiv.id = `location_${event.id}`;
    organizerDiv.id = `organizer_${event.id}`;
    updateDelete.id = `updateDelete_${event.id}`;

    idDiv.innerHTML = `${event.id}`;
    rowContainer.appendChild(idDiv);

    eventNameDiv.innerHTML = `${event.EventName}`;
    rowContainer.appendChild(eventNameDiv);

    dateDiv.innerHTML = `${event.Date}`;
    rowContainer.appendChild(dateDiv);

    locationDiv.innerHTML = `${event.Location}`;
    rowContainer.appendChild(locationDiv);

    organizerDiv.innerHTML = `${event.Organizer}`;
    rowContainer.appendChild(organizerDiv);


    const updateBtn = document.createElement('button');
    updateBtn.textContent = 'Update';
    updateBtn.className = 'Update_button';
    updateBtn.id = `updateBtn_${event.id}`;
    updateDelete.appendChild(updateBtn);
    updateBtn.addEventListener('click', () => updateEvent(event.id));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'Delete_button';
    deleteBtn.id = `deleteBtn_${event.id}`; 
    updateDelete.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', () => deleteUser(event.id));

    rowContainer.appendChild(updateDelete);

    if (temp % 2 === 1) {
      idDiv.className = eventNameDiv.className = dateDiv.className = locationDiv.className = organizerDiv.className = updateDelete.className = 'alternate_rows rows';
    }
    temp++;

    tableContainer.appendChild(rowContainer);
  });
}

window.onload = function() { fetchUsers(); };

function deleteUser(row_id) {

  var http = new XMLHttpRequest();
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var event = JSON.parse(this.responseText);
      var eventName = event.EventName;

      
      var confirmation = confirm(`Are you sure you want to delete the Event ID: ${row_id}?`);

      if (confirmation) {
       
        var deleteRequest = new XMLHttpRequest();
        deleteRequest.onreadystatechange = function () {
          if (this.readyState == 4) {
            if (this.status == 200) {
              document.getElementById("demo").innerHTML = "User deleted successfully.";
              fetchUsers();
            } else {
              document.getElementById("demo").innerHTML = "Error deleting user.";
            }
          }
        };
        deleteRequest.open("DELETE", "https://665036cfec9b4a4a6031238c.mockapi.io/EventName/" + row_id, true);
        deleteRequest.send();
      }
    }
  };
  http.open("GET", "https://665036cfec9b4a4a6031238c.mockapi.io/EventName/" + row_id, true);
  http.send();
}

