function navigate(section) {
  console.log('Navigating to ' + section);
  document.getElementById('content-title').innerText = section.replace('-', ' ');
  document.getElementById('content-body').innerText = 'You are now viewing ' + section.replace('-', ' ') + '.';
}

document.addEventListener('DOMContentLoaded', function() {
  const menuItems = document.querySelectorAll('.menu li');
  menuItems.forEach(item => {
      item.addEventListener('click', function() {
          navigate(this.textContent.toLowerCase().replace(' ', '-'));
      });
  });

  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach(item => {
      item.addEventListener('click', function() {
          navigate(this.textContent.toLowerCase().replace(' ', '-'));
      });
  });
});