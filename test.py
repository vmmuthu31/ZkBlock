import requests
import json

# The API URL
url = 'https://free-frindly-chat-bot.vercel.app/chat-with-bot/'  # Update the URL if running on a different port or server

# The data to send with the request
data = {
    'user_query': 'What should I do if I have a headache?',
    'language': 'english'  # You can change this to any other language supported by the API
}

# Convert the data to JSON format
json_data = json.dumps(data)

# Send the POST request
response = requests.post(url, data=json_data, headers={'Content-Type': 'application/json'})

# Print the response from the API
if response.status_code == 200:
    print("AI Response:", response.json().get('ai_response', 'No response from AI'))
else:
    print(f"Error: {response.status_code}, {response.text}")





    #   {gameOver && (
    #     <div style={{
    #         display: 'flex',
    #         flexDirection: 'row',
    #         justifyContent: 'space-between',
    #         gap: '16px'
    #       }}>
    #         <button id="restart-button" onClick={restartGame}>
    #           Play Again
    #         </button>
    #         <a href="/lobby">
    #             <button id="restart-button" onClick={restartGame}
    #             >
    #                 back
    #             </button> 
    #         </a>
    #     </div>
    #   )}