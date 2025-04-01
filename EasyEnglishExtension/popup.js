document.addEventListener("DOMContentLoaded", () => {
  const textInput = document.getElementById("textInput");
  const button = document.getElementById("button");
  const response = document.getElementById("response");

  async function translate() {
    const texto = textInput.value.trim();

    if (texto === "") {
      response.textContent = "Please enter some text to translate.";
      return;
    }

    const url = `https://lingva.ml/api/v1/pt/en/${encodeURIComponent(texto)}`;

    // Adiciona estado de carregamento
    button.textContent = "Translating...";
    button.disabled = true;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data = await res.json();
      response.textContent = "Translation: " + data.translation;
    } catch (error) {
      response.textContent = "Error: " + error.message;
      console.error(error);
    } finally {
      // Remove estado de carregamento
      button.textContent = "Translate";
      button.disabled = false;
    }
  }

  button.addEventListener("click", translate);
});
