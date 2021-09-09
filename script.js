"use strict";

const signUpBtn = document.getElementById("sign-up");
const signInBtn = document.getElementById("sign-in");
const userList = document.getElementById("user-list");

class AppData {
    constructor() {
        this.users = [];
        if (localStorage.getItem("users") !== null) {
            this.users = JSON.parse(localStorage.getItem("users"));
            this.getDataStorage(this.users);
        }
    }

    displayUser(user) {
        const li = document.createElement("li");
        li.setAttribute("data-key", user.key);
        li.innerHTML = `first name: ${user.firstName}, last name: ${user.lastName}, registered: ${user.regDate} <button class="delete-user">-</button>`;
        userList.appendChild(li);
    }

    getDataStorage(users) {
        users.forEach((item) => {
            const li = document.createElement("li");
            li.setAttribute("data-key", item.key);
            li.innerHTML = `first name: ${item.firstName}, last name: ${item.lastName}, registered: ${item.regDate} <button class="delete-user"></button>`;
            userList.appendChild(li);
        });
    }

    startSignUp() {
        let name = [];
        class User {
            constructor(firstName, lastName, login, password, date) {
                this.firstName = firstName;
                this.lastName = lastName;
                this.login = login;
                this.password = password;
                this.regDate = date;
                this.key = key;
            }
        }

        try {
            do {
                name = prompt("Enter your first and last name").split(" ");
            } while (name.length !== 2);
        } catch {
            console.log("Registration was canceled");
            return;
        }

        const firstName = name[0];
        const lastName = name[1];
        const login = prompt("Enter your login");
        const password = prompt("Enter your password");
        const regDate = new Date().toLocaleString("ru", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        });
        const key = Math.random().toString(36).substring(2, 15);

        const user = new User(firstName, lastName, login, password, regDate);
        this.users.push(user);

        this.displayUser(user);

        const json = JSON.stringify(this.users);
        localStorage.setItem("users", json);
    }

    startSignIn() {
        const userLogin = prompt("Enter your login");
        const userPassword = prompt("Enter your password");
        const result = this.users.filter((elem) => {
            if (elem.login === userLogin && elem.password === userPassword) {
                return elem;
            } else {
                return false;
            }
        });
        if (result.length === 0) {
            alert("No user with such data was found!");
        } else {
            const welcomeMess = document.querySelector(".welcome-message");
            welcomeMess.textContent = `Hello, ${result[0].firstName}!`;
        }
    }

    deleteUser(e) {
        let target = e.target;
        if (target.matches(".delete-user")) {
            const li = target.closest("li");
            const dataKey = li.getAttribute("data-key");
            this.users.filter((item, index) => {
                if (item.key == dataKey) {
                    this.users.splice(index, 1);
                }
            });
            const json = JSON.stringify(this.users);
            localStorage.setItem("users", json);
            li.remove();
        }
    }

    eventListeners() {
        signUpBtn.addEventListener("click", this.startSignUp.bind(this));
        signInBtn.addEventListener("click", this.startSignIn.bind(this));
        userList.addEventListener("click", this.deleteUser.bind(this));
    }
}

const appData = new AppData();

appData.eventListeners();
