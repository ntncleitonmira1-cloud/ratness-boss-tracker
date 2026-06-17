<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Boss Timer MIR4</title>
</head>

<body>
  <h1>Boss Timer MIR4</h1>

  <div id="bossList"></div>

  <!-- Firebase -->
  <script type="module" src="./firebase-config.js"></script>
  <script type="module" src="./app.js"></script>
</body>
</html>import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// SUA CONFIGURAÇÃO DO FIREBASE
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_BUCKET",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Banco de dados
export const db = getFirestore(app);import { db } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const bossListDiv = document.getElementById("bossList");

// Função para buscar bosses no Firestore
async function loadBosses() {
  bossListDiv.innerHTML = "Carregando bosses...";

  const querySnapshot = await getDocs(collection(db, "bosses"));

  bossListDiv.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const boss = doc.data();

    const div = document.createElement("div");
    div.style.border = "1px solid #ccc";
    div.style.margin = "10px";
    div.style.padding = "10px";

    div.innerHTML = `
      <h3>${boss.name}</h3>
      <p>Último kill: ${boss.lastKill}</p>
      <p>Respawn: ${boss.respawnHours} horas</p>
    `;

    bossListDiv.appendChild(div);
  });
}

// Carrega ao abrir o site
loadBosses();
