// COLLECTION GALLERY
const buttons = document.querySelector('#gallery-buttons').children;
console.log(buttons)
const collectionItems = document.querySelector('.collection-books').children;
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    for (let j = 0; j < buttons.length; j++) {
      buttons[j].classList.remove('active');
    }
    this.classList.add('active');
    const target = this.getAttribute('data-target');
    for (let k = 0; k < collectionItems.length; k++) {
      collectionItems[k].style.display = 'none';
      if (collectionItems[k].getAttribute('data-id') === target) {
        collectionItems[k].style.display = 'block';
        collectionItems[k].style.margin = '0rem 1rem';
        collectionItems[k].parentElement.style.justifyContent = 'center';
      }
      if (target === 'all') {
        collectionItems[k].style.display = 'block';
      }
    }
  })
}