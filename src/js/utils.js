function disableLink() {
    const links = document.querySelectorAll('a[href="#"]');
    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
        })
    })
}

export {disableLink};