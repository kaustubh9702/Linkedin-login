pass=getSessionID();
redirectURI="https%3A%2F%2Fkaustubh9702.github.io%2FLinkedin-login%2Fredirect.html";
function windowOpen(){
    OGURL="https://www.linkedin.com/oauth/v2/authorization?response_type=code&scope=r_liteprofile%20r_emailaddress&client_id=776gr7yjy7wd82&redirect_uri=https%3A%2F%2Fkaustubh9702.github.io%2FLinkedin-login%2Fredirect.html";
    window.open(OGURL, "Log Into Facebook","width=500, height=500, left=200, top=50");
}


function getUserID(acc_token){
    goToURL="https://api.linkedin.com/v2/people/(id:" + acc_token+ ")";
    const userID=new XMLHttpRequest();
    userID.open("GET", goToURL);
    userID.send();

    userID.onload=function(){
        if(userID.status===200){
            USERObj=JSON.parse(userID.responseText);
            UserID=USERObj.id;
            sessionStorage.setItem("UserID",UserID);
            console.log("User ID:"+sessionStorage.getItem("UserID"));    
        }
        else if(userID.status===404){
            console.log("No Records Found");
        }
    }
}

//This function needs to be in the server side code
function getAccessToken(){
    notCode=window.location.href;
    code=notCode.slice(65);
    console.log(code);
    secret="mIuZNcY4NZ5sY4OZ";
    goTo = "https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code="+ code +"&redirect_uri=https%3A%2F%2Fkaustubh9702.github.io%2FLinkedin-login%2Fredirect.html&client_id=776gr7yjy7wd82&client_secret=" + secret;
    // window.open(goTo);
    const token=new XMLHttpRequest();
    token.open("GET", goTo);
    token.send();
    token.onload=function(){
        if(token.status===200){
            AccessObj=JSON.parse(token.responseText);
            AccessToken=AccessObj["access_token"];
            sessionStorage.setItem("access_token",AccessToken);
            console.log("Access Token:"+sessionStorage.getItem("access_token"));
            getUserID(sessionStorage.getItem("access_token"));
            console.log("User ID: "+sessionStorage.getItem("UserID")); 
        }
        else if(token.status===404){
            console.log("No Records Found");
        }
    } 

    // goTo="https://www.linkedin.com/oauth/v2/accessToken";
    // token.onreadystatechange = function () {
    //     if (token.readyState === 4){
    //         console.log(token.responseText);
    //     }};
    // let data = `{
    //         "Content-type": "application/x-www-form-urlencoded",
    //         "grant_type": "authorization_code",
    //         "redirect_uri": "https://kaustubh9702.github.io/Linkedin-login/redirect.html",
    //         "client_id": "776gr7yjy7wd82",
    //         "client_secret": "mIuZNcY4NZ5sY4OZ"
    //       }`;

    
   
}

function hashing(string) {
    //set variable hash as 0
    var hash = 0;
    // if the length of the string is 0, return 0
    if (string.length == 0) return hash;
    for (i = 0 ;i<string.length ; i++)
    {
    ch = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + ch;
    hash = hash & hash;
    }
    return hash;
    }


function clickCounter(){
    if(typeof(Storage)!=="undefined"){
        if(sessionStorage.clickcount){
            sessionStorage.clickcount=Number(sessionStorage.clickcount)+1;
        }
        else{
            sessionStorage.clickcount=1;
        }
        document.getElementById("result").innerHTML="You have clicked "+sessionStorage.clickcount+" times in this session.";
    }
    else{
        document.getElementById("result").innerHTML="You dont have session storage";
    }
}
function getSessionID(){
    var chars = "VTBLRXpCS05Jallib0ZwV2VSNVM6MTpjaQ";
    var passwordLength = 12;
    var password = "";

 for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber +1);
   }

   return password;
}

// https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=987654321&scope=r_liteprofile&client_id=776gr7yjy7wd82&redirect_uri=https%3A%2F%2Fkaustubh9702.github.io%2FLinkedin-login%2Fredirect.html
// https://www.linkedin.com/oauth/v2/accessToken?client_id=776gr7yjy7wd82&redirect_uri="+redirectURI+"&client_secret="+secret+"&grant_type="+code+"&scope=r_liteprofile%20r_emailaddress
//"https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code="+ code +"&redirect_uri=https%3A%2F%2Fkaustubh9702.github.io%2FLinkedin-login%2Fredirect.html&client_id=776gr7yjy7wd82&client_secret=" + secret