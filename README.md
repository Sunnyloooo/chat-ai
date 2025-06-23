# AI Chatbot

An intelligent conversational AI with context memory built using vanilla HTML, CSS, and JavaScript. Have natural conversations with AI that remembers your entire chat history.

## Features

- **Context Memory**: AI remembers the entire conversation history
- **Model Selection**: Choose between GPT-3.5-turbo and GPT-4
- **Real-time Chat**: Smooth conversation flow with typing indicators
- **Quick Prompts**: Pre-built conversation starters
- **Auto-resize Input**: Text area adapts to message length
- **Chat Statistics**: Message count and token usage estimation

## Quick Start

1. **Open** `index.html` in your browser
2. **Enter** your OpenAI API Key
3. **Select** AI model (GPT-3.5-turbo recommended)
4. **Start chatting** or use quick prompts
5. **Clear chat** anytime to reset conversation

## Requirements

- OpenAI API Key ([Get one here](https://platform.openai.com/api-keys))
- Modern web browser
- Internet connection

## Interface

### Chat Features
- **User messages**: Appear on the right with warm pink styling
- **AI responses**: Appear on the left with white background
- **System messages**: Centered with light background
- **Typing indicator**: Animated dots when AI is thinking

### Controls
- **Enter**: Send message
- **Shift + Enter**: New line
- **Clear Chat**: Reset conversation history
- **Quick Prompts**: One-click conversation starters

## Model Options

**GPT-3.5-turbo** (Recommended)
- Faster responses
- Lower cost
- Good for general conversation

**GPT-4**
- Higher quality responses
- Better reasoning
- More expensive

## API Configuration

Current settings:
```javascript
max_tokens: 500        // Response length limit
temperature: 0.7       // Creativity level (0-2)
stream: false          // Complete response vs streaming
```

## Example Conversations

**General Chat:**
```
You: Tell me a joke
AI: Why don't scientists trust atoms? Because they make up everything!
You: That's funny! Tell me about atoms
AI: Since we're talking about atoms, they're actually fascinating...
```

**Contextual Memory:**
```
You: I'm planning a trip to Japan
AI: That sounds exciting! What cities are you planning to visit?
You: What should I pack?
AI: For your Japan trip, I'd recommend packing...
```

## Project Structure

```
├── index.html          # Main application
└── README.md           # This file
```

## Technology

- Pure HTML/CSS/JavaScript
- OpenAI Chat Completions API
- No framework dependencies
- Mobile-responsive design

## Cost Estimation

Approximate API costs:
- **GPT-3.5-turbo**: ~$0.002 per 1K tokens
- **GPT-4**: ~$0.03 per 1K tokens
- **Average chat**: 100-500 tokens per response

## Browser Support

- Chrome 80+
- Firefox 80+
- Safari 14+
- Edge 80+

## License

MIT License