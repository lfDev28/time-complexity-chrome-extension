document.getElementById('calculate').addEventListener('click', () => {
  const data = document.getElementById('input').value;
  fetchData(data);
});

async function fetchData(data) {
  // Send a message to the background script
  chrome.runtime.sendMessage({ action: 'api_call', data: data }, (response) => {
    document.getElementById('result').innerHTML = response.data;
  });
}
