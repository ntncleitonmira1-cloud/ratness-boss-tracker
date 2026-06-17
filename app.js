import { db } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const bossListDiv = document.getElementById("bossList");

function calculateRespawn(lastKill, hours) {
  const last = new Date(lastKill);
  return new Date(last.getTime() + hours * 60 * 60 * 1000);
}

function getTimeLeft(respawnTime) {
  const now = new Date();
  const diff = respawnTime - now;

  if (diff <= 0) return "🟢 LIVE";

  const totalSeconds = Math.floor(diff / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  return `🔴 ${h}h ${m}m ${s}s`;
}

let bossesData = [];

// Buscar dados 1 vez
async function loadBosses() {
  const querySnapshot = await getDocs(collection(db, "bosses"));

  bossesData = [];

  querySnapshot.forEach((doc) => {
    bossesData.push(doc.data());
  });
}

// Renderização (atualiza sempre)
function renderBosses() {
  bossListDiv.innerHTML = "";

  bossesData.forEach((boss) => {
    const respawnTime = calculateRespawn(
      boss.lastKill,
      boss.respawnHours
    );

    const div = document.createElement("div");
    div.style.border = "1px solid #333";
    div.style.margin = "10px";
    div.style.padding = "10px";
    div.style.background = "#111";
    div.style.color = "#fff";
    div.style.borderRadius = "8px";

    div.innerHTML = `
      <h3>${boss.name}</h3>
      <p>Respawn: ${getTimeLeft(respawnTime)}</p>
    `;

    bossListDiv.appendChild(div);
  });
}

// Loop do timer (ATUALIZA EM TEMPO REAL)
function startLiveUpdate() {
  setInterval(() => {
    renderBosses();
  }, 1000);
}

// Inicialização
async function init() {
  await loadBosses();
  renderBosses();
  startLiveUpdate();
}

init();
