const apiKey = '46bd5b69f4d5d3e94650575edc297167';  // Replace with your actual gnews.io API key
const newsContainer = document.getElementById('news-container');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentPage = 1;
let searchQuery = '';

async function fetchNews(page = 1) {
  const url = searchQuery 
    ? `https://gnews.io/api/v4/search?q=${searchQuery}&token=${apiKey}&page=${page}&max=10`
    : `https://gnews.io/api/v4/top-headlines?token=${apiKey}&page=${page}&max=10`;
  
  const res = await fetch(url);
  const data = await res.json();
  
  displayNews(data.articles);
}

function displayNews(articles) {
  newsContainer.innerHTML = '';  // Clear previous results

  if (articles.length === 0) {
    newsContainer.innerHTML = '<p>No news found. Try a different search.</p>';
    return;
  }

  articles.forEach(article => {
    const newsItem = document.createElement('div');
    newsItem.classList.add('news-item');
    
    newsItem.innerHTML = `
      <img src="${article.image}" alt="News Image">
      <h3>${article.title}</h3>
      <p>${article.description || 'No description available.'}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;

    newsContainer.appendChild(newsItem);
  });
}

// Handle Search Form Submission
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchQuery = searchInput.value;
  currentPage = 1;  // Reset to first page on new search
  fetchNews();
});

// Handle Pagination
prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchNews(currentPage);
  }
});

nextBtn.addEventListener('click', () => {
  currentPage++;
  fetchNews(currentPage);
});

// Fetch initial top headlines on page load
fetchNews();
