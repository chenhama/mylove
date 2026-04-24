// counter.js

document.addEventListener('DOMContentLoaded', function() {
    const counterElement = document.getElementById('count-number');
    if (!counterElement) return;

    const pageName = counterElement.dataset.pageName; // ページ識別子
    const lambdaUrl = "https://nmstvhbcku6y5v7umf2biyjioy0gahef.lambda-url.ap-southeast-2.on.aws/?page=" + pageName;

    fetch(lambdaUrl)
            .then(response => response.json())
            .then(data => {
                const countString = String(data.count).padStart(6, '0'); // 6桁にする
                container.innerHTML = ''; // "..." を消す

                for (let char of countString) {
                    const digitDiv = document.createElement('div');
                    digitDiv.className = `digit num-${char}`; // クラス名を付ける
                    container.appendChild(digitDiv);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                container.innerText = "Error";
            });
    });