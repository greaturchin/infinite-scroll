const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true

const intialCount = 5;
const apiKey = '8b6YmyYqzXZGTuVTH0-Mk1gCUdYQwaco5WpO2HzWXZ8';
let apiUrl = `https://api.unsplash.com/photos/random/?count=${intialCount}&client_id=${apiKey}`;

function updateAPIwithNewCount (picCount) {

    apiUrl = `https://api.unsplash.com/photos/random/?count=${picCount}&client_id=${apiKey}`;

}

function imageLoaded() {

    imagesLoaded++;

    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }

}

function setAtrributes(element, attributes) {

    for (const key in attributes) {

        element.setAttribute(key, attributes[key]);

    }

}

function displayPhotos() {

    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {

        const item = document.createElement('a');

        setAtrributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        const img = document.createElement('img');

        setAtrributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        item.appendChild(img);
        imageContainer.appendChild(item);

        img.addEventListener('load', imageLoaded);

    });

}



async function getPhotos() {
    try {

        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();

        if (isInitialLoad) {
            updateAPIwithNewCount(30);
            isInitialLoad = false;
        }

    } catch (error) {

    }
}

window.addEventListener('scroll', () => {

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {

        ready = false;
        getPhotos();

    }

})

getPhotos();