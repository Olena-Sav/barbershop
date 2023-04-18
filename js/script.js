const addPreload = (elem) => {
  elem.classList.add("preload");
};

const removePreload = (elem) => {
  elem.classList.remove("preload");
};

const initSlider = () => {
  const slider = document.querySelector(".slider");

  addPreload(slider);
  window.addEventListener("load", startSlider);
};
