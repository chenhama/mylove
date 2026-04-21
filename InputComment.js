// JavaScript Document
// Add a submit event listener to the form
document.getElementById("commentForm").addEventListener("submit", function(event) {
	  // Prevent the default form submission
	  event.preventDefault();
	  let date = new Date();
	  
	  // Get the values of the name, email, and comment inputs
	  let name = document.getElementById("name-input").value;
	  let email = document.getElementById("email-input").value;
	  let comment = document.getElementById("comment-input").value;

	  // Create a new div to hold the comment
	  let newComment = document.createElement("div");
	  newComment.classList.add("comment");

	  // Create a time
	  let timelParagraph = document.createElement("hr");
	  timelParagraph.innerText = date.toLocaleString();

	  // Create a new h4 to hold the name&email
	  let nameHeader = document.createElement("h4");
	  nameHeader.innerText = name + "(" + email + ")";

	  // Create a new p to hold the comment
	  let commentParagraph = document.createElement("p");
	  commentParagraph.innerText = comment;

	  // Append the name, email, and comment to the comment div
	  newComment.appendChild(timelParagraph);
	  newComment.appendChild(nameHeader);
	  newComment.appendChild(commentParagraph);

	  // Append the comment div to the comments container
	  document.getElementById("comments-container").appendChild(newComment);

	  // Clear the form inputs
	  document.getElementById("commentForm").reset();
});