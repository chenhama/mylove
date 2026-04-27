document.addEventListener('DOMContentLoaded', function() {
    // 1. 表示場所を取得 (ここでの変数名を 'target' に固定します)
    const target = document.getElementById('counter-images');
    
    if (!target) {
        console.error('HTMLの中に id="counter-images" が見つかりません');
        return;
    }

    const pageName = target.dataset.pageName || 'default';
    const lambdaUrl = `https://2444m63jltrinl2w72egnvhcga0vtein.lambda-url.ap-northeast-1.on.aws/?page=${pageName}`;

    fetch(lambdaUrl)
        .then(response => response.json())
        .then(data => {
            const countString = String(data.count).padStart(6, '0'); // 6桁にする
            target.innerHTML = ''; // "..." を消す

            for (let char of countString) {
                const digitDiv = document.createElement('div');
                // CSSで設定した .digit と .num-X クラスを付ける
                digitDiv.className = `digit num-${char}`;
                target.appendChild(digitDiv); // ここで 'target' を使う
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            target.innerText = "Error";
        });
});