console.log("Welcome")

//Initial
const API = "888efef1bb6f4d008f4384e500862101";
const URL = "https://newsapi.org/v2/everything?q=";

//1st time load News 
window.addEventListener("load",()=>{
    fetchNews("USA");
})

// Fetching the news through the API
async function fetchNews(query){
    const res = await fetch(`${URL}${query}&apiKey=${API}`);
    const data = await res.json();
    bindData(data.articles);
 }

 //Making of Cards dynamically
 function bindData(articles){
    const cardContainer = document.querySelector(".card-container");
    const newsTemplate = document.querySelector("#card")
    cardContainer.innerHTML = "";
    
    articles.forEach((article) => {
      if(article.urlToImage==null) return;
      const cardClone = newsTemplate.content.cloneNode(true); 
      fillDataInCard(cardClone,article)
      cardContainer.appendChild(cardClone);     
    });
 }

 //Filing the data in cards
 function fillDataInCard(cardClone ,article){

    const newsImg = cardClone.querySelector(".card-header");
    newsImg.innerHTML = `<img src="${article.urlToImage}" >`;

    const newsTitle = cardClone.querySelector(".Title");
    newsTitle.innerText = article.title;

    const newsContent = cardClone.querySelector(".news-content");
    newsContent.innerText = article.description;

    const newsDate = cardClone.querySelector(".date");
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });
    newsDate.innerHTML = `${article.source.name} · ${date}`;

    // Redirecting to the News
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    })
 }

//  Searching for the news
function searchNews(){
    document.querySelector(".search-button").addEventListener("click",()=>{
        const searchInput = document.querySelector(".news-input");
        if(searchInput.value == "") return;
        fetchNews(searchInput.value)
    })
}

// Displaying news of the nav Items
function navNews(id){
    fetchNews(id);    
    const searchinput = document.querySelector(".news-input");
    searchinput.value = "";
}

// Reloading the new/Home Page
function load(){
    window.location.reload();
}
searchNews();
