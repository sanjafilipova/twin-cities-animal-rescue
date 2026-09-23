const interestOptions = document.querySelectorAll('input[name="interest"]');
const interestMessage = document.getElementById("interest-message");

const interestMessages = {
    volunteer: "Thank you for your interest in volunteering! Volunteers help support animals, events, and daily rescue activities.",
    foster: "Thank you for considering fostering! Foster families provide animals with a safe temporary home while they wait for adoption.",
    adoption: "Interested in adopting? We would love to help you learn more about finding the right pet for your family."
};

function showInterestMessage(event) {
    const selectedInterest = event.target.value;
    interestMessage.textContent = interestMessages[selectedInterest];
    localStorage.setItem("selectedInterest", selectedInterest);
    interestError.textContent = "";
}

interestOptions.forEach(function(option) {
    option.addEventListener("change", showInterestMessage);
});

const savedInterest = localStorage.getItem("selectedInterest");

if (savedInterest) {
    const savedOption = document.querySelector(
        `input[name="interest"][value="${savedInterest}"]`
    );

    if (savedOption) {
        savedOption.checked = true;
        interestMessage.textContent = interestMessages[savedInterest];
    }
}

const form = document.querySelector("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const interestError = document.getElementById("interest-error");
const availabilitySelect = document.getElementById("availability");
const availabilityError = document.getElementById("availability-error");
const experienceInput = document.getElementById("experience");
const experienceError = document.getElementById("experience-error");
const messageInput = document.getElementById("message");
const messageError = document.getElementById("message-error");

const validationMessages = {
    nameRequired: "Please enter your name.",
    nameLength: "Your name must be at least 2 characters long.",
    emailRequired: "Please enter your email address.",
    emailInvalid: "Please enter a valid email address."
};

function validateName() {
    const nameValue = nameInput.value.trim();

    if (nameValue == "") {
        nameError.textContent = validationMessages.nameRequired;
        return false;
    }

    if (nameValue.length < 2) {
        nameError.textContent = validationMessages.nameLength;
        return false;
    }

    nameError.textContent = "";
    return true;
}

function validateEmail() {
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue == "") {
        emailError.textContent = validationMessages.emailRequired;
        return false;
    }

    if (!emailPattern.test(emailValue)) {
        emailError.textContent = validationMessages.emailInvalid;
        return false;
    }

    emailError.textContent = "";
    return true;
}

function validateInterest() {
    const selectedInterest = document.querySelector(
        'input[name="interest"]:checked'
    );

    if (!selectedInterest) {
        interestError.textContent = "Please select how you would like to help.";
        return false;
    }

    interestError.textContent = "";
    return true;
}

function validateAvailability() {
    if (availabilitySelect.value === "") {
        availabilityError.textContent = "Please select your availability.";
        return false;
    }

    availabilityError.textContent = "";
    return true;
}

function validateExperience() {
    const experienceValue = experienceInput.value.trim();

    if (experienceValue === "") {
        experienceError.textContent = "Please tell us about your experience with pets.";
        return false;
    }

    experienceError.textContent = "";
    return true;
}

function validateMessage() {
    const messageValue = messageInput.value.trim();

    if (messageValue === "") {
        messageError.textContent = "Please enter a short message.";
        return false;
    }

    messageError.textContent = "";
    return true;
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nameIsValid = validateName();
    const emailIsValid = validateEmail();
    const interestIsValid = validateInterest();
    const availabilityIsValid = validateAvailability();
    const experienceIsValid = validateExperience();
    const messageIsValid = validateMessage();

    if (
        nameIsValid &&
        emailIsValid &&
        interestIsValid &&
        availabilityIsValid &&
        experienceIsValid &&
        messageIsValid
    ) {
        alert("Thank you! Your interest form is ready to be submitted.");
    }
});

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
availabilitySelect.addEventListener("change", validateAvailability);
experienceInput.addEventListener("input", validateExperience);
messageInput.addEventListener("input", validateMessage);

availabilitySelect.addEventListener("change", function() {
    localStorage.setItem("savedAvailability", availabilitySelect.value);
});

const savedAvailability = localStorage.getItem("savedAvailability");

if (savedAvailability) {
    availabilitySelect.value = savedAvailability;
}