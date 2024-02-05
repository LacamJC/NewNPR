  // Recuperar dados do localStorage ao carregar a página
  console.log("ESTA FICNNIAONDN")
  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("cadastroForm");
    
    // Recuperar e preencher os campos do formulário
    form.nomeUsuario.value = localStorage.getItem("nomeUsuario") || "";
    form.emailUsuario.value = localStorage.getItem("emailUsuario") || "";
    form.telefoneUsuario.value = localStorage.getItem("telefoneUsuario") || "";
    // Adicione outros campos conforme necessário
  });

  // Armazenar dados no localStorage quando houver uma alteração
  document.addEventListener("change", function () {
    var form = document.getElementById("cadastroForm");
    
    // Armazenar os valores no localStorage
    localStorage.setItem("nomeUsuario", form.nomeUsuario.value);
    localStorage.setItem("emailUsuario", form.emailUsuario.value);
    localStorage.setItem("telefoneUsuario", form.telefoneUsuario.value);
    // Adicione outros campos conforme necessário
  });