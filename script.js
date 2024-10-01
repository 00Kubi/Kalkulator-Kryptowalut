document.getElementById('cryptoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Pobierz wartości z formularza
    const crypto = document.getElementById('crypto').value;
    const currency = document.getElementById('currency').value.toUpperCase(); // Zmień na wielkie litery
    const amount = document.getElementById('amount').value;

    // Funkcja do kapitalizacji pierwszej litery
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // URL do API CoinGecko
    const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${currency.toLowerCase()}`;
    
    // Pobierz dane z API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Oblicz wartość
            const rate = data[crypto][currency.toLowerCase()];
            const result = amount * rate;
            
            // Zmień nazwę kryptowaluty na wielką literę
            const cryptoName = capitalizeFirstLetter(crypto);
            
            // Wyświetl wynik z kapitalizacją kryptowaluty i waluty
            const resultDiv = document.getElementById('result');
            resultDiv.innerText = `${amount} ${cryptoName} to ${result.toFixed(2)} ${currency}`;
            resultDiv.classList.add('show');
        })
        .catch(error => {
            document.getElementById('result').innerText = 'Błąd podczas pobierania danych.';
            console.error(error);
        });
});
