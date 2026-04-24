document.addEventListener('DOMContentLoaded', function() {
    // 1. HTMLの要素を取得（ここが重要！）
    const counterDisplay = document.getElementById('counter-images');
    
    // 要素が見つからない場合はエラーにならないように終了する
    if (!counterDisplay) {
        console.error('HTMLの中に id="counter-images" が見つかりません');
        return;
    }

    const pageName = counterDisplay.dataset.pageName || 'default';
    const lambdaUrl = `https://nmstvhbcku6y5v7umf2biyjioy0gahef.lambda-url.ap-southeast-2.on.aws/?page=${pageName}`;

    fetch(lambdaUrl)
            .then(response => response.json())
            .then(data => {
                const countString = String(data.count).padStart(6, '0'); // 6桁
                displayArea.innerHTML = ''; // "..." を消す

                for (let char of countString) {
                    const div = document.createElement('div');
                    // digit クラスと num-X クラスの両方を付与
                    div.className = `digit num-${char}`;
                    displayArea.appendChild(div);
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                displayArea.innerText = "Error";
            });
    });