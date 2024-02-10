// define routes
const routes = {
    '/' : home,
    '/bio' : bio,
    '/contact' : contact,
    '/null-copula' : nullCopula,
    '/performances' : performances,
    '/princsex' : princsex,
    '/recordings' : recordings,
    '/turtle-boat' : turtleBoat
  };

// select root/content div and inject corresponding HTML
const rootDiv = document.getElementById('root');
rootDiv.innerHTML = routes[window.location.pathname];

// Take pathname and render section content

const onNavigate = (pathname) => {
    window.history.pushState(
      {},
      pathname,
      window.location.origin + pathname
    );
    rootDiv.innerHTML = routes[pathname];
}
  
window.onpopstate = () => {
    rootDiv.innerHTML = routes[window.location.pathname];
}