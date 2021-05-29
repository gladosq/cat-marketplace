/* Cats data */
const cats = [
  {
    id: 0,
    img: 'cat-1.png',
    price: 30000,
    discount: true,
    age: 2,
    sold: false
  },
  {
    id: 1,
    img: 'cat-2.png',
    price: 40000,
    discount: false,
    age: 1,
    sold: true
  },
  {
    id: 2,
    img: 'cat-3.png',
    price: 20000,
    discount: false,
    age: 4,
    sold: false
  },
  {
    id: 3,
    img: 'cat-1.png',
    price: 40000,
    discount: false,
    age: 5,
    sold: false
  },
  {
    id: 4,
    img: 'cat-3.png',
    price: 40000,
    discount: true,
    age: 2,
    sold: true
  },
  {
    id: 5,
    img: 'cat-2.png',
    price: 40000,
    discount: false,
    age: 3,
    sold: false
  },
];

/* NoJS Compatibility */
const headerNav = document.querySelector('.header__nav');
function noJsCompatibility () {
  if (headerNav.classList.contains('header__nav--nojs')) {
    headerNav.classList.remove('header__nav--nojs');
  }
}

noJsCompatibility();

/* Navigation */
const navClosedButton = document.querySelector('.header__nav-closed-button');
const navOpenedButton = document.querySelector('.header__nav-opened-button');
const overlay = document.querySelector('.overlay');

navClosedButton.addEventListener('click', function() {
  headerNav.classList.add('header__nav--opened');
  document.body.classList.add('no-scroll');
  overlay.classList.add('show');
});

navOpenedButton.addEventListener('click', function() {
  if (headerNav.classList.contains('header__nav--opened')) {
    headerNav.classList.remove('header__nav--opened');
    document.body.classList.remove('no-scroll');
  overlay.classList.remove('show');
  }
});

/* Clear cards */
const catalogList = document.querySelector('.catalog__list');

function clearCards () {
  while (catalogList.firstChild) {
    catalogList.removeChild(catalogList.firstChild);
  }
}

/* Render cards */
const catalogItem = document.querySelector('.catalog__item');

function renderCards (cats) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < cats.length; i++) {
    fragment.appendChild(renderElement(cats[i]));
  }

  catalogList.appendChild(fragment);
}

/* Render element */
function renderElement (cat) {
  let newElement = catalogItem.cloneNode(true);
  newElement.querySelector('.catalog__image').src = `img/${cat.img}`;
  let correctValue = cat.price.toLocaleString('ru-RU');
  newElement.querySelector('.catalog__item-price').textContent = `${correctValue} руб.`;
  newElement.querySelector('.catalog__item-age').textContent = `${cat.age} мес.`;
  if (cat.discount) {
    newElement.classList.add('catalog__item--discount');
  } else {
    if (newElement.classList.contains('catalog__item--discount')) {
      newElement.classList.remove('catalog__item--discount');
    }
  }
  newElement.querySelector('.catalog__item-favorites').className = 'catalog__item-favorites';
  if (cat.sold) {
    newElement.classList.add('catalog__item--sold');
  }
  return newElement;
}

/* Favorites */
const favoritesButtons = document.querySelectorAll('.catalog__item-favorites');
const modalNote = document.querySelector('.note__wrapper');

favoritesButtons.forEach((button) => {
  button.addEventListener('click', function() {
    if (modalNote.classList.contains('note__wrapper--active')) {
      modalNote.classList.remove('note__wrapper--active');
    }
    let offsetWidth = button.offsetWidth;
    if (!button.classList.contains('catalog__item-favorites--active')) {
      button.classList.add('catalog__item-favorites--active');
      modalNote.classList.add('note__wrapper--active');
    } else {
      button.classList.remove('catalog__item-favorites--active');
    }
  });
});

/* Sort cards (price) */
const sortPriceButton = document.querySelector('.catalog__sort-price');

sortPriceButton.addEventListener('click', function() {
  let sortedCats = cats.sort(function(a, b) {
    return a.price - b.price;
  });

  clearCards();
  renderCards(sortedCats);

  let sortedButtons = document.querySelectorAll('.catalog__item-favorites');
  let modalNote = document.querySelector('.note__wrapper');

  sortedButtons.forEach((button) => {
    button.addEventListener('click', function() {
      if (modalNote.classList.contains('note__wrapper--active')) {
        modalNote.classList.remove('note__wrapper--active');
      }
      let offsetWidth = button.offsetWidth;
      if (!button.classList.contains('catalog__item-favorites--active')) {
        button.classList.add('catalog__item-favorites--active');
        modalNote.classList.add('note__wrapper--active');
      } else {
        button.classList.remove('catalog__item-favorites--active');
      }
    })
  })
});

/* Sort cards (age) */
const sortAgeButton = document.querySelector('.catalog__sort-age');

sortAgeButton.addEventListener('click', function() {
  let sortedCats = cats.sort(function(a, b) {
    return a.age - b.age;
  });

  clearCards();
  renderCards(sortedCats);

  let sortedButtons = document.querySelectorAll('.catalog__item-favorites');
  let modalNote = document.querySelector('.note__wrapper');

  sortedButtons.forEach((button) => {
    button.addEventListener('click', function() {
      if (modalNote.classList.contains('note__wrapper--active')) {
        modalNote.classList.remove('note__wrapper--active');
      }
      let offsetWidth = button.offsetWidth;
      if (!button.classList.contains('catalog__item-favorites--active')) {
        button.classList.add('catalog__item-favorites--active');
        modalNote.classList.add('note__wrapper--active');
      } else {
        button.classList.remove('catalog__item-favorites--active');
      }
    })
  })
});

/* Scroll button */
const scrollButton = document.querySelector('.scroll-up__button');
const TO_SCROLL_HEIGHT = 500;

window.addEventListener('scroll', function() {
  if (pageYOffset > 800) {
    scrollButton.style.opacity = 1;
  } else {
    scrollButton.style.opacity = 0;
  }
});

scrollButton.addEventListener('click', function() {
  window.scrollTo(pageXOffset, 0);
});
