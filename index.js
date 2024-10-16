// Menu Bar

const menuBarButton = document.querySelector('.app__navbar > button');
const menu = document.querySelector('.nav__menu');

const toggleMenuBar = () => {
    menu.classList.toggle('active__menu');
    menuBarButton.classList.toggle('active__menu');
}

// Menu Bar

// Services        

const services = [
    {
        id: 1,
        title: 'Hospitality Services',
        description: 'Tailored staffing solutions for the corporate world, ensuring seamless operations and productivity.',
        thumbnail: '/assets/extra/7.jpeg'
    },
    // {
    //     id: 2,
    //     title: 'Part Time Job',
    //     description: 'Elevating guest experiences with our trained and dedicated hospitality professionals, delivering excellence in service.',
    //     thumbnail: '/assets/S2.svg'
    // },
    // {
    //     id: 3,
    //     title: 'Corporate Manpower Supply',
    //     description: 'Flexible opportunities for event staffing, ensuring your gatherings are unforgettable with our skilled event personnel.',
    //     thumbnail: '/assets/S3.svg'
    // },
    {
        id: 4,
        title: 'Valet Driver',
        description: 'Flexible opportunities for event staffing, ensuring your gatherings are unforgettable with our skilled event personnel.',
        thumbnail: '/assets/extra/2.jpeg'
    },
    {
        id: 5,
        title: 'Bouncers',
        description: 'Flexible opportunities for event staffing, ensuring your gatherings are unforgettable with our skilled event personnel.',
        thumbnail: '/assets/extra/5.jpeg'
    },
    {
        id: 6,
        title: 'House Keeping',
        description: 'Flexible opportunities for event staffing, ensuring your gatherings are unforgettable with our skilled event personnel.',
        thumbnail: '/assets/extra/3.jpeg'
    },
    {
        id: 7,
        title: 'Kitchen Stewards',
        description: 'Flexible opportunities for event staffing, ensuring your gatherings are unforgettable with our skilled event personnel.',
        thumbnail: '/assets/extra/6.jpeg'
    },
    {
        id: 8,
        title: 'Chefs',
        description: 'Flexible opportunities for event staffing, ensuring your gatherings are unforgettable with our skilled event personnel.',
        thumbnail: '/assets/extra/4.jpeg'
    },
]

const mainServices = document.querySelector('.services__main');

services.forEach((service) => {
    const serviceBox = document.createElement('div');
    serviceBox.classList.add('service__box');

    let serviceImage = document.createElement('img');
    serviceImage.src = service.thumbnail;
    serviceImage.alt = service.title;

    let serviceDetail = document.createElement('div');
    serviceDetail.classList.add('service__detail');
    let serviceTitle = document.createElement('h4');
    serviceTitle.textContent = service.title;
    let serviceDesc = document.createElement('p');
    serviceDesc.textContent = service.description;

    serviceDetail.append(serviceTitle, serviceDesc);
    serviceBox.append(serviceImage, serviceDetail);

    mainServices.append(serviceBox);
})

// Services

// Lassi Story

const pics = Array.from(document.querySelectorAll('.lassi__pics'));

let currentPicIndex = 0;

setInterval(() => {
    pics.forEach((pic, index) => {
        if (currentPicIndex === index) {
            pic.classList.add('active__img');
        } else {
            pic.classList.remove('active__img');
        }

    })
    
    currentPicIndex = currentPicIndex === pics.length - 1 ? 0 : currentPicIndex + 1;

}, 2000);

// Lassi Story