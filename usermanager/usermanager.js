let userLogin = JSON.parse(localStorage.getItem("userLogin"));

function logout() {
    localStorage.removeItem("userLogin");
    window.location.href = '/authen'
}

function renderHeader() {
    document.querySelector("header").innerHTML = `
        <span onclick="window.location.href='/'">Rikkei Academy</span>
        <div class="user_box">
            <span>Hi, ${userLogin.userName}!</span>
            <button onclick="logout()" class="btn btn-danger">logout</button>
        </div>
    `
}

renderHeader()

function renderData() {
    let userList = JSON.parse(localStorage.getItem("userList"));
    let htmlStr = ``;
    for (let i = 0; i < userList.length; i++) {
        htmlStr += `
            <tr>
                <th scope="row">${i + 1}</th>
                <td>${userList[i].userName}</td>
                <td>${userList[i].status ? "bình thường" : "tạm khóa"}</td>
                <td>
                    <button onclick="changeStatusUser(${userList[i].id})">block / unlock</button>
                </td>
               <td>
                    <button onclick="deleteUser(${userList[i].id})" class="btn btn-danger">Delete</button>
                </td>
            </tr>
        `
    }
    document.querySelector("#user_box").innerHTML = htmlStr;
}
renderData()


function changeStatusUser(userId) {
    let userList = JSON.parse(localStorage.getItem("userList"));
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].id == userId) {
            userList[i].status = !userList[i].status;
            break
        }
    }
    localStorage.setItem("userList", JSON.stringify(userList))
    renderData()
}

function addUser() {
    let newUser = {
        id: Date.now(),
        userName: window.prompt("Nhập user name"),
        password: window.prompt("Nhập password"),
        status: true,
    }
    if (newUser.userName.includes(" ")) {
        alert("vui lòng nhập không khoảng cách")
        return
    }

    let userList = JSON.parse(localStorage.getItem("userList"));
    userList.push(newUser)
    localStorage.setItem("userList", JSON.stringify(userList))
    renderData()
}

function deleteUser(userId) {
    console.log("userId", userId);
    let userList = JSON.parse(localStorage.getItem("userList"));
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].id == userId) {
            userList.splice(i, 1)
            break
        }
    }
    renderData(userList);
    localStorage.setItem("userList", JSON.stringify(userList))
}