function init() {

  const form = document.querySelector('.form');
  const search = document.querySelector('.search');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const apiEndPoint = 'https://en.wikipedia.org/w/api.php?';
    const queryString = '&origin=*&action=query&format=json&prop=description|pageimages&meta=&generator=search&piprop=name|thumbnail&gsrsearch=';
    let searchValue = search.value;

    getWikiPages(apiEndPoint, queryString, searchValue)
      .then(response => response.json())
      .then(json => displayWikiPagesDesription(json))
      .catch(error => console.error(error.message));

    searchValue = '';
  });
  
  function getWikiPages(apiEndPoint, queryString, searchValue = '') {
    const url = apiEndPoint + queryString + searchValue;
    return fetch(url);
  }

  function displayWikiPagesDesription(json) {
    let items = '';
    let pages = json.query.pages;
    const content = document.querySelector('.content');
    content.innerHTML = '';
    for (let page in pages) {
      items += createPageDescription(pages[page]);
    }
    content.innerHTML += items;
  }

  function createPageDescription(page) {
    let href = 'https://en.wikipedia.org/?curid=' + page.pageid;
    return `<div class ='item'>
              <a class='item__link' href='${href}' target='_blank'>
                <h2 class='item__title'>${page.title}</h2>
                <p class='item__description'>${(page.description || page.title)}</p>
              </a>
            </div>`;
  }

  let randomBtn = document.querySelector('.random-btn');
  randomBtn.addEventListener('click', getRandomWikiPage);

  function getRandomWikiPage() {
    let url = 'https://en.wikipedia.org/wiki/Special:Random';
    window.open(url, "_blank");
  }

}

window.onload = init;