let conversationHistory = [
  {
    role: "system",
    content:
      "You are a helpful, friendly, and knowledgeable AI assistant. Respond in a conversational and engaging manner. Keep track of the conversation context and refer back to previous topics when relevant.",
  },
];

let messageCount = 1; // Starting with system message
let isTyping = false;

// Auto-resize textarea
document.getElementById("chatInput").addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = Math.min(this.scrollHeight, 100) + "px";
});

// Send message on Enter (but allow Shift+Enter for new lines)
document.getElementById("chatInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Set quick prompt
function setQuickPrompt(text) {
  document.getElementById("chatInput").value = text;
  document.getElementById("chatInput").focus();
}

// Send message function
async function sendMessage() {
  const apiKey = document.getElementById("apiKey").value.trim();
  const input = document.getElementById("chatInput");
  const message = input.value.trim();
  const model = document.getElementById("chatModel").value;

  // Validation
  if (!apiKey) {
    showError("Please enter your OpenAI API Key");
    return;
  }

  if (!message) {
    showError("Please enter a message");
    return;
  }

  if (isTyping) {
    return; // Prevent multiple simultaneous requests
  }

  // Clear input and error
  input.value = "";
  input.style.height = "auto";
  hideError();

  // Add user message to chat
  addMessage(message, "user");
  conversationHistory.push({ role: "user", content: message });

  // Show typing indicator
  showTyping(true);
  isTyping = true;

  try {
    // Call OpenAI API
    const response = await callOpenAI(apiKey, model);

    // Add assistant response
    addMessage(response, "assistant");
    conversationHistory.push({ role: "assistant", content: response });
  } catch (error) {
    console.error("Error:", error);
    showError("Failed to get response: " + error.message);
    addMessage("Sorry, I encountered an error. Please try again.", "assistant");
  } finally {
    showTyping(false);
    isTyping = false;
    updateStats();
  }
}

// Call OpenAI API
async function callOpenAI(apiKey, model) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: model,
      messages: conversationHistory,
      max_tokens: 500,
      temperature: 0.7,
      stream: false,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "API request failed");
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

// Add message to chat
function addMessage(content, sender) {
  const messagesContainer = document.getElementById("chatMessages");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;
  messageDiv.textContent = content;

  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  messageCount++;
}

// Show/hide typing indicator
function showTyping(show) {
  const typingIndicator = document.getElementById("typingIndicator");
  const messagesContainer = document.getElementById("chatMessages");
  const sendBtn = document.getElementById("sendBtn");

  if (show) {
    typingIndicator.style.display = "block";
    messagesContainer.appendChild(typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    sendBtn.disabled = true;
  } else {
    typingIndicator.style.display = "none";
    sendBtn.disabled = false;
  }
}

// Show error message
function showError(message) {
  const errorDiv = document.getElementById("errorMessage");
  errorDiv.textContent = message;
  errorDiv.style.display = "block";
  setTimeout(() => {
    errorDiv.style.display = "none";
  }, 5000);
}

// Hide error message
function hideError() {
  document.getElementById("errorMessage").style.display = "none";
}

// Clear chat
function clearChat() {
  // Reset conversation history to just system message
  conversationHistory = [
    {
      role: "system",
      content:
        "You are a helpful, friendly, and knowledgeable AI assistant. Respond in a conversational and engaging manner. Keep track of the conversation context and refer back to previous topics when relevant.",
    },
  ];

  // Clear messages display
  const messagesContainer = document.getElementById("chatMessages");
  messagesContainer.innerHTML = `
                <div class="message system">
                    👋 Hello! I'm your AI assistant. How can I help you today?
                </div>
            `;

  messageCount = 1;
  updateStats();
}

// Update chat statistics
function updateStats() {
  document.getElementById("messageCount").textContent =
    `Messages: ${messageCount}`;

  // Rough token estimation (very approximate)
  const totalContent = conversationHistory.map((msg) => msg.content).join(" ");
  const estimatedTokens = Math.ceil(totalContent.length / 4);
  document.getElementById("tokenEstimate").textContent =
    `Estimated tokens: ~${estimatedTokens}`;
}

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  updateStats();
  document.getElementById("chatInput").focus();
});
