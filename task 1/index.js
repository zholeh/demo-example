'use strict';
function logSelectors() {
  console.log(1, jQuery('.node').not('.blogs > .node'));
  console.log(2, jQuery('.articles > .node'));
  console.log(3, jQuery('.articles').children());
  console.log(4, jQuery('.articles .node'));
  console.log(
    5,
    jQuery('.node').filter((index, el) => /\barticles\b/.test(el.parentElement.className))
  );
}
logSelectors();

async function printUsers() {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const response = await fetch(url);
  if (response.ok) {
    const arrUsers = await response.json();
    let usersInnerHTML = '';
    arrUsers.forEach(el => {
      usersInnerHTML += '<div class="user">';
      usersInnerHTML += `<h3 class="user_name">${el.name}</h3>`;
      usersInnerHTML += `<div class="user_email">${el.email}</div>`;
      usersInnerHTML += '</div>';
    });
    document.querySelector('#users').innerHTML = usersInnerHTML;
  } else {
    alert('HTTP error: ' + response.status);
  }
}

printUsers();
