document.getElementById("commentForm").addEventListener("submit", function(event) {
    // 1. デフォルトの送信動作をキャンセル
    event.preventDefault();
    
    const submitButton = event.target.querySelector('button[type="submit"]');
    const date = new Date();
    
    // 2. 入力値を取得
    const name = document.getElementById("name-input").value;
    const email = document.getElementById("email-input").value;
    const comment = document.getElementById("comment-input").value;

    // --- AWS Lambdaへの送信処理 ---
    const functionUrl = "ここに発行された関数URLを貼り付け"; // ← 重要：発行されたURLに書き換えてください

    const payload = {
        name: name,
        email: email,
        comment: comment,
        timestamp: date.toISOString()
    };

    // 二重送信防止のためにボタンを無効化
    if (submitButton) submitButton.disabled = true;

    fetch(functionUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (!response.ok) throw new Error('サーバーエラーが発生しました');
        return response.json();
    })
    .then(data => {
        console.log("Success:", data);
        
        // 3. 画面にコメントを表示（送信に成功したときのみ実行）
        renderComment(name, email, comment, date);

        // 4. フォームをリセット
        document.getElementById("commentForm").reset();
    })
    .catch(error => {
        console.error("Error:", error);
        alert("保存に失敗しました。時間をおいて再度お試しください。");
    })
    .finally(() => {
        // ボタンを元に戻す
        if (submitButton) submitButton.disabled = false;
    });
});

/**
 * 画面に新しいコメントを追加する関数
 */
function renderComment(name, email, comment, date) {
    let newComment = document.createElement("div");
    newComment.classList.add("comment");

    let timelParagraph = document.createElement("hr");
    timelParagraph.innerText = date.toLocaleString();

    let nameHeader = document.createElement("h4");
    nameHeader.innerText = name + " (" + email + ")";

    let commentParagraph = document.createElement("p");
    commentParagraph.innerText = comment;

    newComment.appendChild(timelParagraph);
    newComment.appendChild(nameHeader);
    newComment.appendChild(commentParagraph);

    document.getElementById("comments-container").appendChild(newComment);
}