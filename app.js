import { db } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const bossListDiv = document.getElementById("bossList");

function calculateRespawn(lastKill, hours) {
  const last = new Date(lastKill);
  const respawnTime = new Date(last.getTime() + hours * 60 * 60 * 1000);
  return respawnTime;
}

function formatTime(date) {
  return date.toLocaleString("pt-BR");
}

function getStatus(respawnTime) {
  const now = new Date();
  return now >= respawnTime ? "🟢 LIVE" : "🔴 DEAD";
}

async function loadBosses() {
  bossListDiv.innerHTML = "Carregando bosses...";

  const querySnapshot = await getDocs(collection(db, "bosses"));

  bossListDiv.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const boss = doc.data();

    const respawnTime = calculateRespawn(
      boss.lastKill,
      boss.respawnHours
    );

    const status = getStatus(respawnTime);

    const div = document.createElement("div");
    div.style.border = "1px solid #333";
    div.style.margin = "10px";
    div.style.padding = "10px";
    div.style.background = "#111";
    div.style.color = "#fff";
    div.style.borderRadius = "8px";

    div.innerHTML = `
      <h3>${boss.name}</h3>
      <p>Status: ${status}</p>
      <p>Último kill: ${boss.lastKill}</p>
      <p>Respawn previsto: ${formatTime(respawnTime)}</p>
    `;

    bossListDiv.appendChild(div);
  });
}

loadBosses();
