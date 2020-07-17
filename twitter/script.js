const textArea = document.getElementById('tweetArea');

const textCount = document.getElementById('textCount');

const limitReachText = document.getElementById('limitReachText');

const tweetArea = document.getElementById('contentArea');

const tweets_amt = document.querySelector('.tweets_amount');

const TWEET_LIMIT = 140;

let listOfTweets = [];

let idCounter = 1;

let countLettersRemaining = () => count = TWEET_LIMIT - textArea.value.length;

function getHeight(){
    $("#dummy").val( $("#tweetArea").val() );
    return $("#dummy").prop("scrollHeight");
}

$('#tweetArea').keyup(function(event){
    while ( getHeight() > $(this).height()) {
        $(this).css('font-size', '-=1');
        $("#dummy").css('font-size', '-=1');
    }
    if (event.keyCode == 8 || event.keyCode == 46) {
        while ( getHeight() <= $(this).height() && $(this).css('font-size') <= "25px") {
            $(this).css('font-size', '+=1');
            $("#dummy").css('font-size', '+=1');
        }
            $(this).css('font-size', '-=1');
            $("#dummy").css('font-size', '-=1');
    }
});

let displayLetterCount = count => {
    textCount.innerHTML = `${count}`;
    if (count < 0) {
        textCount.style = `color:red`;
    } else {
        limitReachText.innerHTML = '';
        textCount.style = `color:black`;
    }
};

let updateCountDisplay = () => displayLetterCount(countLettersRemaining());

textArea.addEventListener('input', updateCountDisplay);

function renderHashtag(array) {
    let result = array.slice(0).reverse().map((item, index) => {

        let isLikedVar; item.liked === true ? isLikedVar = 'isLiked' : isLikedVar = '';

        let content = item.content.replace(/#(\w+)/g, (match) => `<a href="#" class="hashtags" onclick="filterHashtags('${match}')">${match}</a>`);

        content = content.replace(/@(\w+)/g, '<span class="mentions">@$1</span>');
        let imgLink;
        let arrayOfURLs = returnURL(item.content);
        if (arrayOfURLs !== null) {
            arrayOfURLs.find((match) => {
                if (match.match(/\.(jpeg|jpg|gif|png)/) !== null) {
                    let post = match.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+\.(png|jpg|jpeg|gif)/g)[0];
                    imgLink = `<img class="img-fluid" src="${post}">`;
                    return true;
                }
            });
        }
        arrayOfURLs !== null ? imageSection = `<div class="">${imgLink}</div>` : imageSection = '';
        if (isLikedVar == 'isLiked'){
        return `<div id="tweet" class="d-flex border border-dark">
                    <div class="bg-transparent p-3" style="margin-top: 7px;">
                        <img src="img/profile-pic.jpg" height="50" class="rounded">
                    </div>
                    <div class="flex-grow-1 bg-lightskyblue" style="width: 300px; padding-top: 20px; padding-right: 10px">
                        <div class="wrapword bg-transparent text-monospace">${content}</div>
                        ${imageSection}
                        <div class="d-flex tweetButtonsSection" style="margin-top: 10px;">
                            <button class="btn ${isLikedVar} tweetBtnn mx-2" onClick="tweetLiked(this.id)" id="${item.id}"><i class="fa fa-heart"></i></button>
                            <button class="btn tweetBtnn mx-2" onClick="retweet(this.value)" value="${item.id}"><i class="fa fa-bars"></i></button>
                            <button class="btn tweetBtnn mx-2" onClick="tweetDelete(${item.id})"><i class="fa fa-trash"></i></button>
                            <button class="btn tweetBtnn mx-2"><i class="fa fa-close"></i></button>
                        </div>
                    </div>
                </div>`;
    }else if (isLikedVar == ''){
        return `<div id="tweet" class="d-flex border border-dark">
                    <div class="bg-transparent p-3" style="margin-top: 7px;">
                        <img class="profile-image" src="img/profile-pic.jpg" height="50" class="rounded">
                    </div>
                    <div class="flex-grow-1 bg-lightskyblue" style="width: 300px; padding-top: 20px; padding-right: 10px">
                        <div class="wrapword bg-transparent text-monospace">${content}</div>
                        ${imageSection}
                        <div class="d-flex tweetButtonsSection" style="margin-top: 10px;">
                            <button class="btn ${isLikedVar} tweetBtnn mx-2" onClick="tweetLiked(this.id)" id="${item.id}"><i class="fa fa-heart-o"></i></button>
                            <button class="btn tweetBtnn mx-2" onClick="retweet(this.value)" value="${item.id}"><i class="fa fa-bars"></i></button>
                            <button class="btn tweetBtnn mx-2" onClick="tweetDelete(${item.id})"><i class="fa fa-trash"></i></button>
                            <button class="btn tweetBtnn mx-2"><i class="fa fa-close"></i></button>
                        </div>
                    </div>
                </div>`;
    }}).join('');
    tweetArea.innerHTML = result;
}

function render() {
    let result = listOfTweets.slice(0).reverse().map((item, index) => {

        let isLikedVar; item.liked === true ? isLikedVar = 'isLiked' : isLikedVar = '';

        let content = item.content.replace(/#(\w+)/g, (match) => `<a href="#" class="hashtags" onclick="filterHashtags('${match}')">${match}</a>`);

        content = content.replace(/@(\w+)/g, '<span class="mentions">@$1</span>');
        let imgLink;
        let arrayOfURLs = returnURL(item.content);
        if (arrayOfURLs !== null) {
            arrayOfURLs.find((match) => {
                if (match.match(/\.(jpeg|jpg|gif|png)/) !== null) {
                    let post = match.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+\.(png|jpg|jpeg|gif)/g)[0];
                    imgLink = `<img class="img-fluid" src="${post}">`;
                    return true;
                }
            });
        }
        arrayOfURLs !== null ? imageSection = `<div class="">${imgLink}</div>` : imageSection = '';
        if (isLikedVar == 'isLiked'){
        return `<div id="tweet" class="d-flex border border-dark">
                    <div class="bg-transparent p-3" style="margin-top: 7px;">
                        <img src="img/profile-pic.jpg" height="50" class="rounded">
                    </div>
                    <div class="flex-grow-1 bg-lightskyblue" style="width: 300px; padding-top: 20px; padding-right: 10px">
                        <div class="wrapword bg-transparent text-monospace">${content}</div>
                        ${imageSection}
                        <div class="d-flex tweetButtonsSection" style="margin-top: 10px;">
                            <button class="btn ${isLikedVar} tweetBtnn mx-2" onClick="tweetLiked(this.id)" id="${item.id}"><i class="fa fa-heart"></i></button>
                            <button class="btn tweetBtnn mx-2" onClick="retweet(this.value)" value="${item.id}"><i class="fa fa-bars"></i></button>
                            <button class="btn tweetBtnn mx-2" onClick="tweetDelete(${item.id})"><i class="fa fa-trash"></i></button>
                            <button class="btn tweetBtnn mx-2"><i class="fa fa-close"></i></button>
                        </div>
                    </div>
                </div>`;
    }else if (isLikedVar == ''){
        return `<div id="tweet" class="d-flex border border-dark">
                    <div class="bg-transparent p-3" style="margin-top: 7px;">
                        <img class="profile-image" src="img/profile-pic.jpg" height="50" class="rounded">
                    </div>
                    <div class="flex-grow-1 bg-lightskyblue" style="width: 300px; padding-top: 20px; padding-right: 10px">
                        <div class="wrapword bg-transparent text-monospace">${content}</div>
                        ${imageSection}
                        <div class="d-flex tweetButtonsSection" style="margin-top: 10px;">
                            <button class="btn ${isLikedVar} tweetBtnn mx-2" onClick="tweetLiked(this.id)" id="${item.id}"><i class="fa fa-heart-o"></i></button>
                            <button class="btn tweetBtnn mx-2" onClick="retweet(this.value)" value="${item.id}"><i class="fa fa-bars"></i></button>
                            <button class="btn tweetBtnn mx-2" onClick="tweetDelete(${item.id})"><i class="fa fa-trash"></i></button>
                            <button class="btn tweetBtnn mx-2"><i class="fa fa-close"></i></button>
                        </div>
                    </div>
                </div>`;
    }}).join('');
    tweetArea.innerHTML = result;

}


function post() {
    if (countLettersRemaining() < 0) {
       textCount.innerHTML = 'Over Limit!';

    } else {

        let newTweet = {
            id: idCounter,
            content: textArea.value,
            hashtags: [],
            originTweetId: null,
            liked: false
        }
        textArea.value.replace(/#(\w+)/g, (match) => {
            if (!newTweet.hashtags.includes(match))
                newTweet.hashtags.push(match)
        });

        idCounter++;

        listOfTweets.push(newTweet);

        render(listOfTweets);
        limitReachText.innerHTML = '';

        textArea.value = ``;

        updateCountDisplay();
    }
}

function tweetLiked(id) {
    let indexOfTweet;

    listOfTweets.map((item, index) => {
        if (item.id == id) {
            indexOfTweet = index;
        }
    });

    listOfTweets[indexOfTweet].liked = !listOfTweets[indexOfTweet].liked;

    let element = document.getElementById(id + '');

    element.classList.toggle('isLiked');
    render(listOfTweets)
};

function tweetDelete(id) {
    listOfTweets = listOfTweets.filter(item => item.id != id & item.originTweetId != id);

    render(listOfTweets);
};

function retweet(id) {
    //find tweet
    let originTweet = listOfTweets.find(item => item.id == id); 

    let originIndex = listOfTweets.indexOf(originTweet);
    let newRetweet = {
        id: idCounter,
        content: "retweet: " + originTweet.content,
        hashtags: originTweet.hashtags,
        originTweetId: originTweet.id,
        liked: false
    }

    idCounter++;
    listOfTweets.splice(originIndex + 1, 0, newRetweet);

    render();
}

function returnURL(string) {
    return string.match(/(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/ig);
}

function filterHashtags(tag) {
    let array = listOfTweets.filter(item => {
        for (x in item.hashtags) {
            if (item.hashtags[x] == tag)
                return true;
        }
    });
    renderHashtag(array);
}

const buttons = document.querySelectorAll('.tweetbtn');
buttons.forEach(btn =>{
    btn.addEventListener('click',function(e){
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clienty - e.target.offsetTop;

        let ripples = document.createElement('waves');
        ripples.classList.add('waves')
        ripples.style.left = x + 'px';
        ripples.style.top = y + 'px';
        this.appendChild(ripples);

        setTimeout(() =>{
            ripples.remove()
        },1000);
        
})
})

const buttons2 = document.querySelectorAll('.tweetbtn2');
buttons2.forEach(btn =>{
    btn.addEventListener('click',function(e){
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clienty - e.target.offsetTop;

        let ripples = document.createElement('wavess');
        ripples.classList.add('wavess')
        ripples.style.left = x + 'px';
        ripples.style.top = y + 'px';
        this.appendChild(ripples);

        setTimeout(() =>{
            ripples.remove()
        },1000);
        
})
})