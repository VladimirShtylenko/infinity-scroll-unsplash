//help function to set Attributes to elements
function setAttr(elem, attr) {
    for (const key in attr) {
        elem.setAttribute(key, attr[key]);
    }

}
const imageContainer = document.querySelector('#image-container'),
    loader = document.querySelector('#loader');


let photosArray = [],
    ready = false,
    imagesLoaded = 0,
    totalImages = 0,
    initialLoad = true;


//Unsplash API
let count = 4;
const apiKey = 'lTmKU7QHNM4eErai8QKERtJ7VlJ65gIU7Qkudec2zKM';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if image was loaded

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        initialLoad = false;
        count = 10;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
}
//Create elements for links
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        //create link to unsplash
        const item = document.createElement('a');
        setAttr(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //create image photo
        const img = document.createElement('img');
        setAttr(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        img.addEventListener('load', imageLoaded());
        //put the image inside the <a>
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
//Get photos from API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
}
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

getPhotos();