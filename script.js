document.getElementById('send-btn').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    if (userInput) {
        const chatBox = document.getElementById('chat-box');
        chatBox.innerHTML += `<div class="user-message">${userInput}</div>`;
        document.getElementById('user-input').value = '';

        fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer your-openai-api-key'
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { "role": "system", "content": "You are a helpful assistant." },
                    { "role": "user", "content": userInput }
                ]
            })
        })
        .then(response => response.json())
        .then(data => {
            const botResponse = data.choices[0].message['content'].trim();
            chatBox.innerHTML += `<div class="bot-message">${botResponse}</div>`;
        });
    }
});
