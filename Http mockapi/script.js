let eventData = [];

function updateEvent() {
  var eventId = document.getElementById("updateEventId").value;
  var eventName = document.getElementById("eventName").value;
  var eventDate = document.getElementById("eventDate").value;
  var eventLocation = document.getElementById("eventLocation").value;
  var eventOrganizer = document.getElementById("eventOrganizer").value;

  var http = new XMLHttpRequest();
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML = "Event updated successfully.";
      fetchUsers();
    }
  };

  var url = "https://665036cfec9b4a4a6031238c.mockapi.io/EventName/" + eventId;
  http.open("PUT", url, true);
  http.setRequestHeader("Content-type", "application/json");

  var data = JSON.stringify({
    EventName: eventName,
    Date: eventDate,
    Location: eventLocation,
    Organizer: eventOrganizer
  });

  http.send(data);
}

function deleteUser() {
  var userId = document.getElementById("deleteUserId").value;
  var http = new XMLHttpRequest();
  http.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        document.getElementById("demo").innerHTML = "User deleted successfully.";
        fetchUsers();
      } else {
        document.getElementById("demo").innerHTML = "Error deleting user.";
      }
    }
  };
  http.open("DELETE", "https://665036cfec9b4a4a6031238c.mockapi.io/EventName/" + userId, true);
  http.send();
}

function addUser() {
  var eventName_add = document.getElementById("eventName_add").value;
  var eventDate_add = document.getElementById("eventDate_add").value;
  var eventLocation_add = document.getElementById("eventLocation_add").value;
  var eventOrganizer_add = document.getElementById("eventOrganizer_add").value;

  var http = new XMLHttpRequest();
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {
      document.getElementById("demo").innerHTML = "User added successfully.";
      fetchUsers();
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

// Function to load data into the table
function loadData() {
  const tableContainer = document.querySelector('.table_ctn');
  
  // Clear previous rows except the header
  while (tableContainer.children.length > 1) {
    tableContainer.removeChild(tableContainer.lastChild);
  }
  
  let temp = 1;

  eventData.forEach(event => {
    const rowContainer = document.createElement('div');
    rowContainer.className = 'row_container';

    const idDiv = document.createElement('div');
    const eventNameDiv = document.createElement('div');
    const dateDiv = document.createElement('div');
    const locationDiv = document.createElement('div');
    const organizerDiv = document.createElement('div');

    idDiv.className = eventNameDiv.className = dateDiv.className = locationDiv.className = organizerDiv.className = 'rows';

    idDiv.innerHTML = `<span>${event.id}</span>`;
    rowContainer.appendChild(idDiv);

    eventNameDiv.innerHTML = `<span>${event.EventName}</span>`;
    rowContainer.appendChild(eventNameDiv);

    dateDiv.innerHTML = `<span>${event.Date}</span>`;
    rowContainer.appendChild(dateDiv);

    locationDiv.innerHTML = `<span>${event.Location}</span>`;
    rowContainer.appendChild(locationDiv);

    organizerDiv.innerHTML = `<span>${event.Organizer}</span>`;
    rowContainer.appendChild(organizerDiv);

    if (temp % 2 === 0) {
      rowContainer.classList.add('alternate_row');
    }
    temp++;

    tableContainer.appendChild(rowContainer);
  });
}
