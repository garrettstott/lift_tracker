// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

document.addEventListener("DOMContentLoaded", function() {
  document.addEventListener('click', e => {
    toggleMenu(e);
  })
});

window.toggleMenu = function toggleMenu(e) {
  let menu = document.getElementById('nav-menu');
  if ( e.target.id === 'nav-hamburger' || e.target.parentElement.id === 'nav-hamburger' ) {
    menu.classList.toggle('hidden')
  } else if ( e.target.parentElement.id !== 'nav-menu' ) {
    menu.classList.add('hidden')
  }
}

