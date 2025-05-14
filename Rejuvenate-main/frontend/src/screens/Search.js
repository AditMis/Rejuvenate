const toggleSearch = document.querySelector('.toggle-search'),
  drawers = document.querySelectorAll('.drawer'),
  search = document.querySelector('.drawer-search');

toggleSearch.addEventListener('click', (e) => {
  e.stopPropagation();
  document.body.classList.add('search-open');
  setTimeout(() => search.querySelector('input').focus(), 500);
});

const close = () => document.body.classList.remove('search-open');

drawers.forEach((drawer) => {
  if (drawer.querySelector('.close')) {
    drawer.querySelector('.close').addEventListener('click', () => {
      close();
    });
  }
});

document.body.addEventListener('click', close);
