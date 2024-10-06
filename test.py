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
    
# federal favorite visual axis bulb festival health mask future then solution crumble pair library speak sunset citizen exotic what possible upon summer elder session
# dftyq-bmjii-wuuyj-cwoh2-szifq-ifoja-lax7o-zz7te-hovnx-xddqm-4qe
# a94705aed587e814627341d95a8ebfcca6b575bc837c4c0b3f9f57ca066dd82f    

# Sandbox pid 3208 for canister Some(ProcessInfo { canister_id: Some(CanisterId(bnz7o-iuaaa-aaaaa-qaaaa-cai)), panic_on_failure: true }) exited unexpectedly with status Exited(Pid(3208), 127)