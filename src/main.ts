import "./style.css";

const appContainer = document.getElementById("app");
if (!appContainer) {
  throw new Error("App container not found");
}

const titulo: string = "Campus Virtual - Frontend";
const descripcion: string = "Proyecto base configurado con TypeScript y Vite.";

appContainer.innerHTML = `
    <main class="container">
      <h1>${titulo}</h1>
      <p>${descripcion}</p>
    </main>
  `;
