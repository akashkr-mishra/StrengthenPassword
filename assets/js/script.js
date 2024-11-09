// Toggle Requirements Cloud
function toggleRequirements() {
    document.getElementById("parameters").style.display = "flex";
    document.getElementById("understood").style.display = "block";
}

function understood() {
    document.getElementById("parameters").style.display = "none";
    document.getElementById("understood").style.display = "none";
}

// Function to check if password contains PII
function containsPII(password, pii) {
    return pii.some(info => password.toLowerCase().includes(info.toLowerCase()));
}

// Function to check password strength
function checkPasswordStrength() {
    const password = document.getElementById("passwordInput").value;
    const feedback = document.getElementById("feedback");

    const name = document.getElementById("nameInput").value;
    const dob = document.getElementById("dobInput").value.replace(/-/g, '');
    const place = document.getElementById("placeInput").value;
    
    // Array of PII data
    const pii = [name, dob, place];
    
    // Reset feedback content
    feedback.innerHTML = "";

    // Validation parameters
    const minLength = 8;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const hasAlphaNumeric = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
    const noRepetitions = /^(?!.*(.).*\1)/;
    const noConsecutive = /^(?!.*(\d)\1{2})/ && /^(?!.*(012|123|234|345|456|567|678|789|987|876|765|654|543|432|321|210))/;

    // Check PII
    if (containsPII(password, pii)) {
        feedback.innerHTML += "<p>Don't use your personal information as a password.</p>";
    }

    // Validate password criteria
    if (password.length < minLength) {
        feedback.innerHTML += "<p>Password must be at least 8 characters long.</p>";
    }
    if (!hasAlphaNumeric.test(password)) {
        feedback.innerHTML += "<p>Password must contain both letters and numbers.</p>";
    }
    if (!hasSpecialChar.test(password)) {
        feedback.innerHTML += "<p>Password must include at least one special character.</p>";
    }
    if (!noRepetitions.test(password)) {
        feedback.innerHTML += "<p>Password should not contain repeating characters.</p>";
    }
    if (!noConsecutive.test(password)) {
        feedback.innerHTML += "<p>Password should not contain consecutive or sequential numbers like 123 or 321.</p>";
    }

    // Check if all criteria are met
    if (
        password.length >= minLength &&
        hasAlphaNumeric.test(password) &&
        hasSpecialChar.test(password) &&
        noRepetitions.test(password) &&
        noConsecutive.test(password) &&
        !containsPII(password, pii)
    ) {
        feedback.innerHTML = "<p style='color:green;'>Password is strong!</p>";
    }
}
