window.onload = () => {
    const loginButton = document.querySelector("button");
    loginButton.onclick = login;
};

function login() {    // function register gets the values entered by the user that is stored in local storage and validates the user.
    const name = document.querySelector("#NameInput").value;
    const password = document.querySelector("#PasswordInput").value;
    const feedback = document.querySelector("#Feedback");

    feedback.innerHTML = "";


    // Check if the user exists.
    if (localStorage.getItem(name) !== null) {
        const user = JSON.parse(localStorage.getItem(name));

        // Validate correct password.
        if (user.password === password) {
            feedback.innerHTML = "Login Successful";
            sessionStorage.setItem("loggedInUser", name);
            window.location.href = "game.html"
        } else (user.password != password)
        feedback.innerHTML = "Password incorrect.";

    } else {
        feedback.innerHTML = "User not found. Please make sure to register.";
    }
}
