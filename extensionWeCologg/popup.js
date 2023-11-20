browser.tabs.query({ active: true, currentWindow: true })
  .then(tabs => {
    const url = tabs[0].url;
    return fetch(`https://api.websitecarbon.com/site?url=${url}`);
  })
  .then(response => response.json())
  .then(data => {
    const ratingElement = document.getElementById('rating');
    const { rating } = data;
    
    const colorMap = {
      'A': { color: 'navy', backgroundColor: 'limegreen' },
      'B': { color: 'white', backgroundColor: 'dodgerblue' },
      'C': { color: 'white', backgroundColor: 'darkorange' },
      'D': { color: 'white', backgroundColor: 'tomato' },
      'E': { color: 'white', backgroundColor: 'firebrick' },
      default: { color: 'white', backgroundColor: 'black' }
    };

    const { color, backgroundColor } = colorMap[rating] || colorMap.default;

    ratingElement.style.color = color;
    ratingElement.style.backgroundColor = backgroundColor;
    ratingElement.textContent = `Rating de la web actual: ${rating}`;
  })
  .catch(error => {
    console.error('Error:', error);
  });

