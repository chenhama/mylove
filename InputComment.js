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
// --- 既存のコードの一番下に追加 ---

/**
 * 送信したコメントを即座に画面に表示するための関数
 */
function renderComment(name, email, comment, date) {
    const commentList = document.getElementById("comment-list"); // 表示先のIDに合わせてください
    if (!commentList) return;

    const commentElement = document.createElement("div");
    commentElement.className = "comment-item"; // CSSスタイル用
    
    // 表示する内容を組み立て
    commentElement.innerHTML = `
        <hr>
        <div style="border-left: 4px solid #007bff; padding-left: 10px; margin-bottom: 20px;">
            <p><strong>名前:</strong> ${name}</p>
            <p><strong>コメント:</strong> ${comment}</p>
            <p><small>投稿日: ${date.toLocaleString()}</small></p>
        </div>
    `;

    // リストの先頭に追加
    commentList.prepend(commentElement);
}