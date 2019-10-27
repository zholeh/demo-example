'use strict';
const data = [
  { text: 'Merriweather project is led by Sorkin Type', header: 'M', color: 'green' },
  { text: "Roboto doesn't compromise allowing letters", header: 'R', color: 'pink' },
  { text: 'Noto Sans cover over 30 scripts', header: 'NS', color: 'blue' }
];

let index = 1;
let leftCol = [],
  rightCol = [];
const arrData = data.reduce((acc, el) => {
  switch (index) {
    case 1:
      acc.push({ leftCol, rightCol });
      leftCol.push(el);
      index++;
      break;
    case 2:
      rightCol.push(el);
      index++;
      break;
    case 3:
      rightCol.push(el);
      index = 1;
      leftCol = [];
      rightCol = [];
      break;
    default:
      break;
  }
  return acc;
}, []);

let pageBuy = true;
let pageIndex = 0;
let arrBoughtFonts = [];

function cardFontOnClick(event, column, index) {
  if (pageBuy) arrBoughtFonts.push(arrData[pageIndex][column][index]);
  else {
    arrBoughtFonts.splice(index, 1);
    render();
  }
}
function render() {
  function cardFontRender(card, column, index) {
    const html = `<div class="card-font" onclick="cardFontOnClick(event, '<%= column%>', <%= index%>);">
          <div class="colored-box">
            <div class="colored-box__inner-box" style="background: <%= card.color; %>">
              <span class="colored-box__letter"><%= card.header; %></span>
            </div>
          </div>
          <div class="card-font__text"><%= card.text; %></div>
        </div>`;
    return ejs.render(html, { card, column, index });
  }

  function cardColumnRender(array, column) {
    let html = '';
    array.forEach((element, i) => {
      html += cardFontRender(element, column, i);
    });
    return html;
  }

  function cardFontsPageRender(page) {
    let html = '';
    html += `<div>
        <h1>Please select one font</h1>
        <div class="card-fonts">
            <div class="card-fonts__left-column">${cardColumnRender(page.leftCol, 'leftCol')}</div>
            <div class="card-fonts__right-column">${cardColumnRender(
              page.rightCol,
              'rightCol'
            )}</div>
        </div>
    </div>`;

    return html;
  }
  function cardMyFontsPageRender(page) {
    let html = '';
    html += `<div>
        <h1>Bought fonts</h1>
        <div class="card-fonts">
            <% if (page.leftCol.length) { %>
                <div class="card-fonts__right-column">
                    ${cardColumnRender(page.leftCol, 'leftCol')}
                </div>
            <% } else { %>
                <p>You haven’t bought anything yet!</p>
            <% } %>
            <% if (page.rightCol.length) { %>
                <div class="card-fonts__right-column">
                    ${cardColumnRender(page.rightCol, 'rightCol')}
                </div>
            <% } %>
        </div>
    </div>`;

    return ejs.render(html, { page });
  }

  function buyFontsRender() {
    let html = '';
    html += cardFontsPageRender(arrData[pageIndex]);

    return html;
  }
  function myFontsRender() {
    let html = '';
    html += cardMyFontsPageRender({ leftCol: arrBoughtFonts, rightCol: [] });

    return html;
  }

  let html = '';
  if (pageBuy) html = buyFontsRender();
  else html = myFontsRender();
  document.querySelector('#groupFonts').innerHTML = html;
}

function addEventListeners() {
  document.querySelector('#myFonts').addEventListener('click', () => {
    pageBuy = false;
    render();
  });
  document.querySelector('#buyFonts').addEventListener('click', () => {
    pageBuy = true;
    render();
  });
}

render();
addEventListeners();
