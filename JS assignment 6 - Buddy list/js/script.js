let statusMap = {
    1: "one",
    2: "two",
    3: "three",
    4: "four",
};

let users_json = [
    {
        "userId": "USR00001",
        "name": "Andrew Grudde",
        "profilePicture": "https://t4.ftcdn.net/jpg/03/45/99/21/360_F_345992128_YCnKz143e50LF06g75hFeYPHJRCks9qg.jpg",
        "statusMessage": "We become what we think about!",
        "presence": 1
    },
    {
        "userId": "USR00002",
        "name": "Steve Hughes",
        "profilePicture": "https://t4.ftcdn.net/jpg/03/45/99/21/360_F_345992128_YCnKz143e50LF06g75hFeYPHJRCks9qg.jpg",
        "statusMessage": "A positive mindset brings positive things.",
        "presence": 2
    },
    {
        "userId": "USR00003",
        "name": "Kathy Smiley",
        "profilePicture": "https://t4.ftcdn.net/jpg/03/45/99/21/360_F_345992128_YCnKz143e50LF06g75hFeYPHJRCks9qg.jpg",
        "statusMessage": "One small positive thought can change your whole day.",
        "presence": 3
    },
    {
        "userId": "USR00004",
        "name": "Steve Dunks",
        "profilePicture": "https://t4.ftcdn.net/jpg/03/45/99/21/360_F_345992128_YCnKz143e50LF06g75hFeYPHJRCks9qg.jpg",
        "statusMessage": "I am a rock star.",
        "presence": 1
    },
    {
        "userId": "USR00005",
        "name": "Maria Dropola",
        "profilePicture": "https://t4.ftcdn.net/jpg/03/45/99/21/360_F_345992128_YCnKz143e50LF06g75hFeYPHJRCks9qg.jpg",
        "statusMessage": "I am using Gradious messenger.",
        "presence": 4
    }
];

function display() {
    const root = document.getElementById('root');
    root.innerHTML = ''; 

    for (let user of users_json) {
        let userDiv = document.createElement('div');
        userDiv.classList.add('user');

        let imgContainer = document.createElement("div");
        imgContainer.classList.add("img-container");
        let userImage = document.createElement("img");
        userImage.src = user.profilePicture;
        userImage.alt = "User Image";
        userImage.classList.add('user-image', statusMap[user.presence]);

        imgContainer.appendChild(userImage);

        let userDetail = document.createElement('div');
        userDetail.classList.add('user-detail');
        let userName = document.createElement('p');
        userName.classList.add('user-name');
        userName.textContent = user.name;
        let userMessage = document.createElement('p');
        userMessage.classList.add('user-message');
        userMessage.textContent = user.statusMessage;

        userDetail.appendChild(userName);
        userDetail.appendChild(userMessage);

        let threeBtn = document.createElement("div");
        threeBtn.classList.add('three-btn');

        let dropdown = document.createElement("div");
        dropdown.classList.add('dropdown');

        let threeDotsButton = document.createElement('a');
        threeDotsButton.href = "#";
        threeDotsButton.setAttribute("role", "button");
        threeDotsButton.setAttribute("data-bs-toggle", "dropdown");
        threeDotsButton.setAttribute("aria-expanded", "false");
        threeDotsButton.innerHTML = '<i class="bi bi-three-dots-vertical"></i>';

        let dropdownMenu = document.createElement("ul");
        dropdownMenu.classList.add('dropdown-menu');

        let deleteButton = document.createElement('li');
        deleteButton.innerHTML = `<button id="delete-${user.userId}" onclick='deleteItem("${user.userId}")' class="dropdown-item">Delete</button>`;

        let updateButton = document.createElement('li');
        updateButton.innerHTML = `<button id="update-${user.userId}" onclick='updateItem("${user.userId}")' class="dropdown-item">Update</button>`;

        dropdownMenu.appendChild(deleteButton);
        dropdownMenu.appendChild(updateButton);

        dropdown.appendChild(threeDotsButton);
        dropdown.appendChild(dropdownMenu);

        threeBtn.appendChild(dropdown);

        userDiv.appendChild(imgContainer);
        userDiv.appendChild(userDetail);
        userDiv.appendChild(threeBtn);

        root.appendChild(userDiv);
    }
}

function addUser() {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const statusMessage = document.getElementById("statusMessage").value;
    const profilePicLink = document.getElementById("profilePicLink").value;
    const presence = document.getElementById("presence").value;


    const newUser = {
        "userId": "USR00001",
        "name": name,
        "profilePicture": profilePicLink,
        "statusMessage": statusMessage,
        "presence": parseInt(presence)
    };

 
    users_json.unshift(newUser);
    for (let i = 1; i < users_json.length; i++) {
        users_json[i].userId = "USR0000" + (i + 1);
    }

    display();
}


function deleteItem(userId) {
    event.preventDefault();
    
    const index = parseInt(userId.match(/\d+$/)[0]) - 1;

    users_json.splice(index, 1);

    for (let i=0; i<users_json.length; i++) 
        users_json[i].userId = "USR0000" + (i + 1);
    

    display();
}



function updateItem(userId) {
    event.preventDefault();

    const btn = document.querySelector(".btn");
    btn.innerText = "Update User";
    
    const index = parseInt(userId.match(/\d+$/)[0]) - 1;

    document.getElementById("name").value = users_json[index].name;
    document.getElementById("statusMessage").value = users_json[index].statusMessage;
    document.getElementById("profilePicLink").value = users_json[index].profilePicture; 
    document.getElementById("presence").value = users_json[index].presence;

    btn.onclick = function() {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const statusMessage = document.getElementById("statusMessage").value;
        const profilePicLink = document.getElementById("profilePicLink").value;
        const presence = document.getElementById("presence").value;

        users_json[index].name = name;
        users_json[index].profilePicture = profilePicLink;
        users_json[index].statusMessage = statusMessage;
        users_json[index].presence = parseInt(presence);

        document.getElementById("name").value = "";
        document.getElementById("statusMessage").value = "";
        document.getElementById("profilePicLink").value = "";
        document.getElementById("presence").value = "1";

        btn.innerText = "Add User";
        btn.onclick = addUser;

        display(); 
    };
}




window.onload = function() {
    display();
};
