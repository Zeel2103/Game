window.onload = () => {
    const passwordInput = document.querySelector("#PasswordInput");
    passwordInput.oninput = () => {
        checkPasswordStrength(passwordInput.value);
    }; // Checks how strong the password is when the window loads and the user inputs the password.
    const password = document.querySelector("#PasswordInput");
    password.onkeydown = event => {
        console.log(event);
    }
}

function register() {     // function register checks the values entered by the user and validates user accounts.
    const name = document.querySelector("#NameInput").value;
    const password = document.querySelector("#PasswordInput").value;
    const age = document.querySelector("#AgeInput").value;
    const email = document.querySelector("#EmailInput").value;
    const feedback = document.querySelector("#Feedback");

    feedback.innerHTML = "";


    const nameRegex = /^[a-zA-Z]+$/;    //Name regualar expression checks that there are no numbers or special characters in the name.

    // Validate name input by checking its not empty or that it already exists
    if ((name === "" || name === "number")) {
        feedback.innerHTML = "Error! Name field should not be empty";
        return;
    }

    if (!nameRegex.test(name)) {
        feedback.innerHTML = "Error! Name should contain only letters (no numbers or special characters)";
        return;
    }

    if (localStorage.getItem(name) !== null) {
        feedback.innerHTML = "Error! User already exists.";
        return;
    }

    if (age === "" || age < 7 || age > 100) { // checks age is above 10 and less than 100 
        feedback.innerHTML = "Error! Age field should not be empty. User has to be above 10.";
        return;
    } else if (isNaN(age)) {
        feedback.innerHTML = "Error! Age must be a number.";
        return;
    }

    // Email regular expression checks that the email has an @ sysmbol and the email format follows a simple email address
    const emailRegex= /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (email === "") {
        feedback.innerHTML = "Error! Email address should not be empty.";
        return
    } else if (!emailRegex.test(email)) {
        feedback.innerHTML = "Error! Email is not valid.";
        return;
    }

    // Create user object where registration details are stored.
    const user = {
        name: name,
        password: password,
        age: age,
        email: email,
        topscore: 0
    };

    console.log("User Registered: ", user);

    // Store the user object in localStorage.
    localStorage.setItem(name, JSON.stringify(user));
    feedback.innerHTML = "Registration successful!";  // lets user know that registration was successful.
    localStorage.setItem("topscore", user.topscore); // user topscore is set to 0 and stored for each user.

}

// Validate password checks that the password has one capital letter and special character.
function checkPasswordStrength(password) {
    const passwordStrength = document.querySelector("#passwordStrength");

    // Regular expression to check password strength
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    const feedback = document.querySelector("#Feedback");
    feedback.innerHTML = ""; // feedback lets the user know as they are typing the password whether it is strong enough or not.

    if (strongRegex.test(password)) {
        feedback.innerHTML = "Password is strong";
    } else if (password.length >= 6) {
        feedback.innerHTML = "Please enter at least 8 characters. Please have at least one capital letter and a special character.";
    } else {
        feedback.innerHTML = "Password is not strong enough";
    }
}
