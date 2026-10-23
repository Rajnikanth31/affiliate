const filters = document.querySelector('[data-filters]');
if (filters) {
  filters.hidden = false;
  const search = document.querySelector('#search');
  const category = document.querySelector('#category');
  const cards = [...document.querySelectorAll('[data-guide]')];
  function update() {
    let count = 0;
    for (const card of cards) {
      card.hidden = !card.dataset.title.toLowerCase().includes(search.value.trim().toLowerCase()) || (category.value !== '' && category.value !== card.dataset.category);
      if (!card.hidden) count++;
    }
    document.querySelector('#result-count').textContent = `${count} guide${count === 1 ? '' : 's'}`;
    document.querySelector('#no-results').hidden = count !== 0;
  }
  search.addEventListener('input', update);
  category.addEventListener('change', update);
  update();
}
