window.addEventListener('scroll', function() {
  const navbarTop = document.querySelector('.navbar-top');
  const footer = document.querySelector('.footer');
  
  if (window.scrollY > 100) {
    navbarTop.classList.add('hidden');
  } else {
    navbarTop.classList.remove('hidden');
  }

  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    footer.classList.add('show');
  } else {
    footer.classList.remove('show');
  }
});