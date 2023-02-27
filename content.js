window.onload = () => {
  document.getElementById('calculate').addEventListener('click', () => {
    const data = document.getElementById('input').value;
    fetchData(data);
  });

  document.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', (event) => {
      event.preventDefault();
      window.open(a.href, '_blank');
    });
  });

  document.getElementById('input').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      const data = document.getElementById('input').value;
      fetchData(data);
    }
  });
};

async function fetchData(data) {
  // Send a message to the background script
  chrome.runtime.sendMessage({ action: 'api_call', data: data }, (response) => {
    document.getElementById('result').innerHTML = response.data;
  });
}
