const API_URL = "https://sudden-seemly-narwhal.glitch.me/api";

/*
GET /api - получить список услуг
GET /api?service={n} - получить список барберов
GET /api?spec={n} - получить список месяца работы барбера
GET /api?spec={n}&month={n} - получить список дней работы барбера
GET /api?spec={n}&month={n}&day={n} - получить список свободных часов барбера
POST /api/order - оформить заказ
*/

const addPreload = (elem) => {
  elem.classList.add("preload");
};

const removePreload = (elem) => {
  elem.classList.remove("preload");
};

const startSlider = () => {
  const sliderItems = document.querySelectorAll(".slider__item");
  const sliderList = document.querySelector(".slider__list");
  const btnPrevSlide = document.querySelector(".slider__arrow_left");
  const btnNextSlide = document.querySelector(".slider__arrow_right");

  let activeSlide = 1;
  let position = 0;

  const checkSlider = () => {
    if (
      (activeSlide + 2 === sliderItems.length &&
        document.documentElement.offsetWidth > 560) ||
      activeSlide === sliderItems.length
    ) {
      btnNextSlide.style.display = "none";
    } else {
      btnNextSlide.style.display = "";
    }

    if (activeSlide === 1) {
      btnPrevSlide.style.display = "none";
    } else {
      btnPrevSlide.style.display = "";
    }
  };

  checkSlider();

  const nextSlide = () => {
    sliderItems[activeSlide]?.classList.remove("slider__item_active");
    position = -sliderItems[0].clientWidth * activeSlide;

    sliderList.style.transform = `translateX(${position}px)`;
    activeSlide += 1;
    sliderItems[activeSlide]?.classList.add("slider__item_active");
    checkSlider();
  };

  const prevSlide = () => {
    sliderItems[activeSlide]?.classList.remove("slider__item_active");
    position = -sliderItems[0].clientWidth * (activeSlide - 2);

    sliderList.style.transform = `translateX(${position}px)`;
    activeSlide -= 1;
    sliderItems[activeSlide]?.classList.add("slider__item_active");
    checkSlider();
  };

  btnPrevSlide.addEventListener("click", prevSlide);
  btnNextSlide.addEventListener("click", nextSlide);

  window.addEventListener("resize", () => {
    if (
      activeSlide + 2 > sliderItems.length &&
      document.documentElement.offsetWidth > 560
    ) {
      activeSlide = sliderItems.length - 2;
      sliderItems[activeSlide]?.classList.add("slider__item_active");
    }

    position = -sliderItems[0].clientWidth * (activeSlide - 1);
    sliderList.style.transform = `translateX(${position}px)`;
    checkSlider();
  });
};

const initSlider = () => {
  const slider = document.querySelector(".slider");
  const sliderContainer = document.querySelector(".slider__container");

  sliderContainer.style.display = "none";
  addPreload(slider);

  window.addEventListener("load", () => {
    sliderContainer.style.display = "";
    removePreload(slider);
    startSlider();
  });
};

const renderPrice = (wrapper, data) => {
  data.forEach((item) => {
    const priceItem = document.createElement("li");
    priceItem.classList.add("price__item");

    priceItem.innerHTML = `
      <span class="price__item-title">${item.name}</span>
      <span class="price__item-count">${item.price} руб</span>
    `;

    wrapper.append(priceItem);
  });
};

const renderService = (wrapper, data) => {
  const labels = data.map((item) => {
    const label = document.createElement("label");
    label.classList.add("radio");
    label.innerHTML = `
      <input class="radio__input" type="radio" name="service" value="${item.id}" />
      <span class="radio__label">${item.name}</span> 
    `;
    return label;
  });

  console.log(labels);
  console.log(...labels);
  wrapper.append(...labels);
};

const initService = () => {
  const priceList = document.querySelector(".price__list");
  const reserveFieldsetService = document.querySelector(
    ".reserve__fieldset_service"
  );
  priceList.textContent = "";
  addPreload(priceList);

  reserveFieldsetService.innerHTML =
    '<legend class="reserve__legend">Услуга</legend>';
  addPreload(reserveFieldsetService);

  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      renderPrice(priceList, data);
      removePreload(priceList);
      return data;
    })
    .then((data) => {
      renderService(reserveFieldsetService, data);
      removePreload(reserveFieldsetService);
    });
};

const addDisabled = (arr) => {
  arr.forEach((elem) => {
    elem.disabled = true;
  });
};

const removeDisabled = (arr) => {
  arr.forEach((elem) => {
    elem.disabled = false;
  });
};

const initReserve = () => {
  const reserveForm = document.querySelector(".reserve__form");
  const { fieldspec, fielddata, fieldmonth, fieldday, fieldtime, btn } =
    reserveForm;

  addDisabled([fieldspec, fielddata, fieldmonth, fieldday, fieldtime, btn]);

  reserveForm.addEventListener("change", (event) => {});
};

const init = () => {
  initSlider();
  initService();
  initReserve();
};

window.addEventListener("DOMContentLoaded", init);
