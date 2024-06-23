const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const scrollButton = document.getElementById("scroll-to-top");
const clickSound = document.getElementById("click-sound");
const clickSound2 = new Audio("assets/sound/scrolltransition.mp3");

let userMessage = null; // Variable pentru salvarea user mesaj
const API_KEY = "";

const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  let chatContent =
    className === "outgoing"
      ? `<p></p>`
      : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi; // return chat <li> element
};

//Această funcție trimite mesajul utilizatorului la API-ul OpenAI și setează răspunsul primit în elementul de chat
const generateResponse = (chatElement) => {
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const messageElement = chatElement.querySelector("p");

  // Define the properties and message for the API request
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    }),
  };

  // Send POST request to API, get response and set the reponse as paragraph text
  fetch(API_URL, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      messageElement.textContent = data.choices[0].message.content.trim();
    })
    .catch(() => {
      messageElement.classList.add("error");
      messageElement.textContent =
        "Oops! Something went wrong. Please try again.";
    })
    .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
};

// Această funcție preia mesajul utilizatorului, îl adaugă în chat și apoi afișează un mesaj de "Thinking..." până când se primește răspunsul de la API.
const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;

  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
};

//Ajustează înălțimea elementului de input pe baza conținutului.
chatInput.addEventListener("input", () => {
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

//Trimite mesajul la apăsarea tastei Enter, dacă nu este apăsată tasta Shift și lățimea ferestrei este mai mare de 800px.
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});
//Trimite mesajul la apăsarea butonului de trimitere.
sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () =>
  document.body.classList.remove("show-chatbot")
);
chatbotToggler.addEventListener("click", () =>
  document.body.classList.toggle("show-chatbot")
);

chatbotToggler.addEventListener("click", function () {
  // controleaza daca chat bot este deschis
  const isChatbotOpen = document.body.classList.contains("show-chatbot");

  // daca chatbot este deschis dispare scroll to top
  if (isChatbotOpen) {
    scrollButton.style.display = "none";
  } else {
    scrollButton.style.display = "block";
  }
});

closeBtn.addEventListener("click", () => {
  document.body.classList.remove("show-chatbot");

  // afiseaza scroll to top cand este inchis chatbot
  scrollButton.style.display = "block";
});

// Event listener pentru sound click
clickSound.volume = 0.01;
chatbotToggler.addEventListener("click", () => {
  clickSound.play();
});
clickSound.volume = 0.01;

scrollButton.addEventListener("click", () => {
  clickSound2.play();
});
clickSound2.volume = 0.01;
