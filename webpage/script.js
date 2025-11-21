import { setAssetImg } from '../assets/assets-setup-tool-helper.js';

const messagesDiv = document.getElementById("messages");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const loadingGif = document.getElementById("loadingGif");

async function init() {
    // Load assets
    await setAssetImg("logoImg", "logo");
    await setAssetImg("loadingGif", "loading");
}

async function sendMessage() {
    const msg = userInput.value.trim();
    if (!msg) return;

    // Add user message
    messagesDiv.innerHTML += `<div class="user-msg">${msg}</div>`;
    userInput.value = "";
    loadingGif.style.display = "block";

    // Call Astro-bot API (replace with your endpoint)
    try {
        const response = await fetch("https://your-backend-api.com/chat", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ prompt: msg })
        });
        const data = await response.json();
        messagesDiv.innerHTML += `<div class="bot-msg">${data.response}</div>`;
    } catch (err) {
        messagesDiv.innerHTML += `<div class="bot-msg">Error contacting Astro-bot</div>`;
    } finally {
        loadingGif.style.display = "none";
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
});

init();
