browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        // Calculate CO2 emissions here
        calculateCO2Emissions(tab.url)
            .then(co2Emissions => {
                browser.storage.local.set({ [tabId]: co2Emissions })
                    .then(() => {
                        console.log('Rating de la web actual:', co2Emissions);
                    })
                    .catch(error => {
                        console.error('Error al guardar el rating de la web:', error);
                    });
            })
            .catch(error => {
                console.error('Error calculating CO2 emissions:', error);
            });
    }
});

async function calculateCO2Emissions(url) {
    try {
        // Llamar a la api webcarbon
        let response = await fetch(`https://api.websitecarbon.com/site?url=${url}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let data = await response.json();
        console.log(data);
        return data.rating;
    } catch (error) {
        console.error('Error fetching CO2 emissions:', error);
        return null; // or handle the error in an appropriate way
    }
}
