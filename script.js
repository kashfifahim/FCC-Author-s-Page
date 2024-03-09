const authorContainer = document.getElementById("author-container");
const loadMoreBtn = document.getElementById("load-more-btn");
// Step 7+ Populate the UI
let startingIndex = 0;
let endingIndex = 8;
let authorDataArr = [];

// Make a GET request
fetch("https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json")
.then((res) => res.json())
.then((data) => {
    authorDataArr = data;
    displayAuthors(authorDataArr.slice(startingIndex, endingIndex));
})
.catch((err) => {
    authorContainer.innerHTML = '<p class="error-msg">There was an error loading the authors</p>'; 
    });

// 20: function to fetch more authors
const fetchMoreAuthors = () => {
    startingIndex += 8;
    endingIndex += 8;
    displayAuthors(authorDataArr.slice(startingIndex, endingIndex));
    if (authorDataArr.length <= endingIndex) {
        loadMoreBtn.disabled = true;
        loadMoreBtn.style.cursor = "not-allowed";
        loadMoreBtn.textContent = "No more data to load";
    }
};


// 8: function to populate the UI
const displayAuthors = (authors) => {
    authors.forEach(({author, image, url, bio}, index) => {
        authorContainer.innerHTML += `
            <div class="user-card" id="${index}">
                <h2 class="author-name">${author}</h2>
                <img class="user-img" src="${image}" alt="${author} avatar">
                <div class="purple-divider"> </div>
                <p class="bio">${bio.length > 50 ? bio.slice(0, 50) + "..." : bio}</p>
                <a class="author-link" href="${url}" target="_blank">${author}'s author page</a>
            </div>
        `;
    });
};

loadMoreBtn.addEventListener("click", fetchMoreAuthors);