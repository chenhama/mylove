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
            // 数字を6桁の文字列にする (例: "000044")
            const countString = String(data.count).padStart(6, '0');
            
            // 中身を空にする
            counterDisplay.innerHTML = '';

            // 1文字ずつdivを作成して追加
            for (let char of countString) {
                const digitDiv = document.createElement('div');
                digitDiv.className = `digit num-${char}`;
                counterDisplay.appendChild(digitDiv); // ここで変数名を合わせる
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            counterDisplay.innerText = "Error";
        });
});