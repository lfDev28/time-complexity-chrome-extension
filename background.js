// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, response) => {
  if (message.action === 'api_call') {
    console.log(JSON.stringify(message.data));
    // Make the API call
    fetch('https://h6fgptwzm0.execute-api.ap-southeast-2.amazonaws.com/Dev', {
      method: 'POST',
      body: JSON.stringify({ prompt: message.data }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        response({ action: 'api_call_response', data: cleanString(data) });
      })
      .catch((error) => {
        console.error(error);
        response({ action: 'api_call_response', error });
      });

    // Return true to keep the message channel open until sendResponse is called
    return true;
  }
});

const cleanString = (str) => {
  if (str.length === 0) return str;
  if (str[0] === 'O' && str[str.length - 1] === ')') {
    return str;
  } else {
    return str.substring(str.indexOf('O'), str.indexOf(')') + 1);
  }
};
