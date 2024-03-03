function onRouteChanged() {
    const hash = window.location.hash;
    const routerView = document.getElementById("root");

    if (!(routerView instanceof HTMLElement)) {
        throw new ReferenceError("No router view element available");
    }

    switch (hash) {
        case "#home":
            routerView.innerHTML = home;
            break;
        case "#bio":
            routerView.innerHTML = bio;
            break;
        case "#turtle-boat":
            routerView.innerHTML = turtleBoat;
            break;
        case "#null-copula":
            routerView.innerHTML = nullCopula;
            break;
        case "#princsex":
            routerView.innerHTML = princsex;
            break;
        case "#recordings":
            routerView.innerHTML = recordings;
            break;
        case "#performances":
            routerView.innerHTML = performances;
            break;
        case "#contact":
            routerView.innerHTML = contact;
            break;
        default:
            routerView.innerHTML = home;
            break;
    }
}

window.addEventListener("hashchange", onRouteChanged);