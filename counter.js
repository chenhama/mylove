// counter.js

document.addEventListener('DOMContentLoaded', function() {
    const counterElement = document.getElementById('count-number');
    if (!counterElement) return;

    const pageName = counterElement.dataset.pageName; // ページ識別子
    const lambdaUrl = "https://nmstvhbcku6y5v7umf2biyjioy0gahef.lambda-url.ap-southeast-2.on.aws/?page=" + pageName;

    fetch(lambdaUrl)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            counterElement.innerText = data.count;
        })
        .catch(error => {
            console.error('Error:', error);
            counterElement.innerText = "Error";
        });
});