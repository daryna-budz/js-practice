const showForm = document.getElementById("show-form");
const addingForm = document.querySelector(".adding-form");
const cancelComment = document.getElementById("cancelComment");
const commentsItems = document.querySelector(".comments-items");
const addCommentButton = document.getElementById("addComment");

let isReplying = false; 
let replyToComment = null;

showForm.addEventListener("click",function(){
    addingForm.style.display = "block";
    isReplying = false; 
    replyToComment = null;
});

cancelComment.addEventListener("click",function(){
    addingForm.style.display = "none";
    isReplying = false;
    replyToComment = null;
});

addCommentButton.addEventListener("click", function(){
    const enteredComment = document.getElementById("comment");
    const enteredName = document.getElementById("username");


    if (!enteredComment.value.trim() || !enteredName.value.trim()) {
        alert("Please enter both your name and a comment.");
        return;
    }

    
    const commentItem = document.createElement('div');
    commentItem.classList.add('comment-item');

    const commentIcon = document.createElement('img');
    commentIcon.classList.add('comment-icon');
    commentIcon.src = "../dom-3/images/contact-icon.svg";
    commentIcon.alt = "comment icon";

    const commentContent = document.createElement('div');
    commentContent.classList.add('comment-content');

    const commentText = document.createElement('p');
    commentText.textContent = enteredComment.value;

    const commentName = document.createElement('p');
    commentName.textContent = enteredName.value;

    const commentTime = document.createElement('p');
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleString(); 
    commentTime.textContent = `Posted on: ${formattedTime}`;
    commentTime.style.fontSize = "12px"; 
    
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList = "buttons-container";

    const replyButton = document.createElement("button");
    replyButton.id = "replyButton";
    replyButton.textContent = "Reply"

    const deleteButton = document.createElement("button");
    deleteButton.id = "deleteButton";
    deleteButton.textContent = "Delete"
    deleteButton.addEventListener("click", function() {
        commentItem.remove();  
    });

    buttonsContainer.appendChild(replyButton);
    buttonsContainer.appendChild(deleteButton);

    commentContent.appendChild(commentName);
    commentContent.appendChild(commentText);
    commentContent.appendChild(commentTime); 
    commentContent.appendChild(buttonsContainer);


    commentItem.appendChild(commentIcon);
    commentItem.appendChild(commentContent);

    commentsItems.appendChild(commentItem);


    enteredComment.value = '';
    enteredName.value = '';

    addingForm.style.display = "none";
});




