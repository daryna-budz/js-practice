const showForm = document.getElementById("show-form");
const addingForm = document.querySelector(".adding-form");
const cancelComment = document.getElementById("cancelComment");
const commentsItems = document.querySelector(".comments-items");
const addCommentButton = document.getElementById("addComment");

let isReplying = false; 
let replyToComment = null;
let commentsData = JSON.parse(localStorage.getItem("comments")) || [];

function saveCommentsToLocalStorage() {
    localStorage.setItem("comments", JSON.stringify(commentsData));
}

function loadComments() {
    commentsItems.innerHTML = "";
    commentsData.forEach(comment => {
        displayComment(comment);
    });
}


showForm.addEventListener("click",function(){
    addingForm.style.display = "block";
    isReplying = false; 
    replyToComment = null; //показуємо форму для коментаря
});

cancelComment.addEventListener("click",function(){
    addingForm.style.display = "none";
    isReplying = false;
    replyToComment = null; //закриваємо форму
});

function displayComment(comment, parentElement = null) {
    const commentItem = document.createElement("div");
    commentItem.classList.add(parentElement ? "reply-item" : "comment-item");

    const commentIcon = document.createElement("img");
    commentIcon.classList.add("comment-icon");
    commentIcon.src = "../dom-3/images/contact-icon.svg";
    commentIcon.alt = "comment icon";

    const commentContent = document.createElement("div");
    commentContent.classList.add("comment-content");

    const commentNameElement = document.createElement("p");
    commentNameElement.textContent = comment.name;

    const commentTextElement = document.createElement("p");
    commentTextElement.textContent = comment.text;

    const commentTime = document.createElement("p");
    commentTime.textContent = `Posted on: ${comment.time}`;
    commentTime.style.fontSize = "12px";

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");

    const replyButton = document.createElement("button");
    replyButton.id = "replyButton";
    replyButton.textContent = "Reply";

    const deleteButton = document.createElement("button");
    deleteButton.id = "deleteButton";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
        if (parentElement) {
            parentElement.removeChild(commentItem);
            const parentComment = commentsData.find(c => c.id === parentElement.dataset.id);
            parentComment.replies = parentComment.replies.filter(r => r.id !== comment.id);
        } else {
            commentsItems.removeChild(commentItem);
            commentsData = commentsData.filter(c => c.id !== comment.id);
        }
        saveCommentsToLocalStorage();
    });

    replyButton.addEventListener("click", function () {
        addingForm.style.display = "block";
        isReplying = true;
        replyToComment = commentItem;
    });

    buttonsContainer.appendChild(replyButton);
    buttonsContainer.appendChild(deleteButton);

    commentContent.appendChild(commentNameElement);
    commentContent.appendChild(commentTextElement);
    commentContent.appendChild(commentTime);
    commentContent.appendChild(buttonsContainer);

    commentItem.appendChild(commentIcon);
    commentItem.appendChild(commentContent);
    commentItem.dataset.id = comment.id;

    if (parentElement) {
        parentElement.appendChild(commentItem);
    } else {
        commentsItems.appendChild(commentItem);
    }

    
    if (comment.replies) {
        comment.replies.forEach(reply => displayComment(reply, commentItem));
    }
}

addCommentButton.addEventListener("click", function () {
    const enteredComment = document.getElementById("comment");
    const enteredName = document.getElementById("username");

    if (!enteredComment.value.trim() || !enteredName.value.trim()) {
        alert("Please enter both your name and a comment");
        return;
    }

    const newComment = {
        id: Date.now().toString(),
        name: enteredName.value,
        text: enteredComment.value,
        time: new Date().toLocaleString(),
        replies: [],
    };

    if (isReplying && replyToComment) {
        const parentComment = commentsData.find(c => c.id === replyToComment.dataset.id);
        parentComment.replies.push(newComment);
    } else {
        commentsData.push(newComment);
    }


  /*addCommentButton.addEventListener("click", function () {
    const enteredComment = document.getElementById("comment"); 
    const enteredName = document.getElementById("username");

    //перевірка чи ввели коментар і ім'я
    if (!enteredComment.value.trim() || !enteredName.value.trim()) {
        alert("Please enter both your name and a comment");
        return;
    }

    const commentText = enteredComment.value;
    const commentName = enteredName.value;

    if (isReplying && replyToComment) {
        // добавляємо відповідь на комент
        const replyItem = document.createElement("div");
        replyItem.classList.add("reply-item");

        const commentIcon = document.createElement("img");
        commentIcon.classList.add("comment-icon");
        commentIcon.src = "../dom-3/images/contact-icon.svg";
        commentIcon.alt = "comment icon";

        const replyContainer = document.createElement("div");


        const replyName = document.createElement("p");
        replyName.textContent = commentName;

        const replyContent = document.createElement("p");
        replyContent.textContent = commentText;

        const deleteButton = document.createElement("button");
        deleteButton.id = "deleteButton";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            replyItem.remove();
        });

        const commentTime = document.createElement('p'); 
        const currentTime = new Date(); //час додавання коментаря
        const formattedTime = currentTime.toLocaleString(); 
        commentTime.textContent = `Posted on: ${formattedTime}`;
        commentTime.style.fontSize = "12px"; 

        replyContainer.appendChild(replyName);
        replyContainer.appendChild(replyContent);
        replyContainer.appendChild(commentTime);
        replyContainer.appendChild(deleteButton);


        replyItem.appendChild(commentIcon);
        replyItem.appendChild(replyContainer);


        replyToComment.appendChild(replyItem);
    } else {
        // добавляємо новий коментар
        const commentItem = document.createElement("div");
        commentItem.classList.add("comment-item");

        const commentIcon = document.createElement("img");
        commentIcon.classList.add("comment-icon");
        commentIcon.src = "../dom-3/images/contact-icon.svg";
        commentIcon.alt = "comment icon";

        const commentContent = document.createElement("div");
        commentContent.classList.add("comment-content");

        const commentNameElement = document.createElement("p");
        commentNameElement.textContent = commentName;

        const commentTextElement = document.createElement("p");
        commentTextElement.textContent = commentText;

        const commentTime = document.createElement('p'); //час додавання коментаря
        const currentTime = new Date(); 
        const formattedTime = currentTime.toLocaleString(); 
        commentTime.textContent = `Posted on: ${formattedTime}`;
        commentTime.style.fontSize = "12px";

        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("buttons-container");

        const replyButton = document.createElement("button");
        replyButton.id = "replyButton";
        replyButton.textContent = "Reply";

        const deleteButton = document.createElement("button");
        deleteButton.id = "deleteButton";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            commentItem.remove();
        });

        buttonsContainer.appendChild(replyButton);
        buttonsContainer.appendChild(deleteButton);

        commentContent.appendChild(commentNameElement);
        commentContent.appendChild(commentTextElement);
        commentContent.appendChild(commentTime); 
        commentContent.appendChild(buttonsContainer);

        commentItem.appendChild(commentIcon);
        commentItem.appendChild(commentContent);

        commentsItems.appendChild(commentItem);

        // відповідь на коментар
        replyButton.addEventListener("click", function () {
            addingForm.style.display = "block";
            isReplying = true;
            replyToComment = commentItem; 
        });
    }*/

    saveCommentsToLocalStorage();
    loadComments();

    
    enteredComment.value = "";
    enteredName.value = "";
    addingForm.style.display = "none";
    isReplying = false;
    replyToComment = null;
});

document.addEventListener("DOMContentLoaded", loadComments);

