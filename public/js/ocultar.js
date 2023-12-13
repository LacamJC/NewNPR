const passwordInput = document.getElementById("FloatingPassword");
const confirmPassword = document.getElementById("FloatingConfirmPassword");
const ocultarSenha = document.getElementById("ocultarSenha");

ocultarSenha.addEventListener("change", function() {
    if (this.checked) {
        passwordInput.type = "text";
        confirmPassword.type = "text";
        console.log("Mostrar senha")
    }  else {
        passwordInput.type = "password";
        confirmPassword.type = "password";
        console.log("Ocultar senha")
    }
})