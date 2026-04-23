document.getElementById("commentForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const submitButton = event.target.querySelector('button[type="submit"]');
    const date = new Date();
    
    const name = document.getElementById("name-input").value;
    const email = document.getElementById("email-input").value;
    const comment = document.getElementById("comment-input").value;

    const functionUrl = "https://xbnnj7cd3hy6w3rxkh7zxb24n40vjcyi.lambda-url.ap-southeast-2.on.aws/";

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
        if (!response.ok) throw new Error('サーバーエラーが発生しました');
        return response.json();
    })
    .then(data => {
        console.log("Success:", data);
        
        // 画面にコメントを表示
        // Lambdaから返ってきたIDや、入力した値を使って表示させます
        renderComment(name, email, comment, date); 

        // フォームをリセット
        document.getElementById("commentForm").reset();

        // 成功メッセージ（アラートを出したい場合）
        alert("投稿に成功しました！");
    })
    .catch(error => {
        console.error("詳細エラー:", error);
        // ここに余分な「.」があったのを削除しました
        alert("エラーが発生しました。詳細はF12のコンソールを見てください。");
    }) 
    .finally(() => {
        if (submitButton) submitButton.disabled = false;
    });
});

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