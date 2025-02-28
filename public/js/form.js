document.getElementById("togglePassword").addEventListener("click", function () {
    var passwordField = document.getElementById("password");
    var icon = this;

    if (passwordField.type === "password") {
        passwordField.type = "text";
        icon.classList.remove("ri-eye-off-line");
        icon.classList.add("ri-eye-line"); // Open eye icon
    } else {
        passwordField.type = "password";
        icon.classList.remove("ri-eye-line");
        icon.classList.add("ri-eye-off-line"); // Closed eye icon
    }
});