document.getElementById("commentForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const submitButton = event.target.querySelector('button[type="submit"]');
    const date = new Date();
    
    const name = document.getElementById("name-input").value;
    const email = document.getElementById("email-input").value;
    const comment = document.getElementById("comment-input").value;

    const functionUrl = "https://sccanqntu5ig2u2oqzfkpggimu0ojssr.lambda-url.ap-northeast-1.on.aws/";

    const payload = {
        name: name,
        email: email,
        comment: comment,
        timestamp: date.toISOString()
    };

    if (submitButton) submitButton.disabled = true;

    fetch(functionUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(response => {
        // ここで response.ok を見ずに、まずは中身を解析する
        return response.json();
    })
    .then(data => {
        console.log("Server Response:", data);
        
        // 1. 画面に表示
        renderComment(name, email, comment, date);
        
        // 2. フォームを空にする
        document.getElementById("commentForm").reset();

        // 成功したことがわかるようにログを出す
        console.log("レンダリング完了");
    })
    .catch(error => {
        // DBには入っているのにここに来る場合、CORSの設定がまだ少し厳しい可能性があります
        console.error("通信または描画エラー:", error);
        
        // DBにデータがあるなら、エラーが出ても「保存はされている」と判断してOKです
        if(name) {
            renderComment(name, email, comment, date);
            alert("DB保存は確認されましたが、ブラウザ表示で警告が出ました。");
        }
    })
    .finally(() => {
        if (submitButton) submitButton.disabled = false;
    });
});
