const SERVER_HOST_URL = "https://manpower-backend-shk1.onrender.com";

function getCurrentRegisterSectionFromLS() {
    const currentSection = localStorage.getItem('__sivagroup__registration');
    if (!currentSection) {
        return -1;
    }
    return parseInt(currentSection);
}

let currentRegisterSection = getCurrentRegisterSectionFromLS();

function updateToNextSection() {
    const allRegisteredSection = Array.from(document.querySelectorAll('.register__section'));
    allRegisteredSection.forEach((section) => {
        section.classList.add('hide__section')
        allRegisteredSection[currentRegisterSection + 2].classList.remove('hide__section');
    })
    currentRegisterSection += 1;
    localStorage.setItem('__sivagroup__registration', currentRegisterSection);
}

window.addEventListener('load', () => {
    const currentRegisterSection = getCurrentRegisterSectionFromLS();
    const allRegisteredSection = Array.from(document.querySelectorAll('.register__section'));
    allRegisteredSection.forEach((section) => {
        section.classList.add('hide__section')
        allRegisteredSection[currentRegisterSection + 1].classList.remove('hide__section');
    })
})

// Toastify

function createToast(message) {
    return Toastify({
        text: message,
        duration: 6000,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "var(--c-mainBg)",
          color: "var(--c-primary)",
          borderRadius: '8px',
          boxShadow: '0 0 4px 1px var(--mainShadow)',
          fontSize: '0.9rem',
          padding: '0.8rem',
          border: '1px solid var(--c-primary)'
        },
    }).showToast();
}

// Toastify

const allServices = [
    {
        id: "85ac065f-ade0-4d5c-8e0f-c8d2d0b47101",
        service: 'Hospitality Services'
    },
    {
        id: "adf6df2a-6fbd-4daa-b225-4f2d1e09a957",
        service: 'Parttime Jobs'
    },
    {
        id: "375bee3b-b3b8-42a5-87b5-423cbc01fe33",
        service: 'corporate Manpower Supply'
    },
    {
        id: "a7814fbf-322c-44ff-a01a-dcee0dad3dc3",
        service: 'Valet Driver'
    },
    {
        id: "0e7345c1-f8bc-45aa-9181-db2855b09ac8",
        service: 'Bouncers'
    },
    {
        id: "99b5fdd2-bf49-499c-839b-0a37c84f4a06",
        service: 'House Keepers'
    },
    {
        id: "0b514b81-84fc-42d8-b500-dd5e42df1ad3",
        service: 'Kitchen Stewards'
    },
    {
        id: "fcfe522c-3daa-46d1-adf1-e28fc19fe75d",
        service: 'Chefs'
    },
];

const serviceSelectBox = document.querySelector('#service');

allServices.forEach((service) => {
    let serviceOption = document.createElement('option');
    serviceOption.value = service.id;
    serviceOption.id = service.id;
    serviceOption.textContent = service.service;

    serviceSelectBox.append(serviceOption);
})

function selectedFile(e, mainId) {

    const msgPara = document.querySelector(`#${mainId} #msg__show`);
    
    if (e.target.files) {
        const file = e.target.files[0];
        file && msgPara.classList.add('show__selected');
    }
}

// Handle Personal Details Submit

let submitDetailsLoading = false;

function btnInfo(isLoading) {
    const detailSubmitBtn = document.querySelector('#detailsSubmitBtn');

    detailSubmitBtn.disabled = isLoading;
    detailSubmitBtn.innerHTML = isLoading ? '<span class="btnLoader"></span>' : 'Submit Details';
}

function docsBtn(isLoading) {
    const docsSubmitBtn = document.querySelector('#docsSubmitBtn');

    docsSubmitBtn.disabled = isLoading;
    docsSubmitBtn.innerHTML = isLoading ? '<span class="btnLoader"></span>' : 'Upload Documents';
}

async function newRegistration(registeredDetails) {
    try {
        

        btnInfo(true);
        createToast('Verifying Details...');
        const newRegistraionResponse = await fetch(`${SERVER_HOST_URL}/api-prof/v1/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registeredDetails)
        });

        if (!newRegistraionResponse.ok) {
            if (newRegistraionResponse.status === 409) {
                createToast('Email or username already exists');
            }
            btnInfo(false);
            return '';
        }

        const registerData = await newRegistraionResponse.json();
        return registerData;

    } catch (error) {
        console.log(error);
        return '';
    }
}

async function handlePersonalDetailsSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const age = parseInt(formData.get('age'));
    const password = formData.get('password');
    const username = formData.get('username');
    const mobileNumber = parseInt(formData.get('mobileNumber'));

    const phoneNumber = parseInt(formData.get('phoneNumber'));
    const whatsappNumber = parseInt(formData.get('whatsappNumber'));
    const alternateNumber = parseInt(formData.get('alternateNumber'));

    const contactNumbers = { phoneNumber, whatsappNumber, alternateNumber };

    const permanent = formData.get('permanent');
    const current = formData.get('current');
    const latitude = parseFloat(formData.get('latitude'));
    const longitude = parseFloat(formData.get('longitude'));

    const address = { permanent, current, latitude, longitude };

    const education = formData.get('education');

    const number = parseInt(formData.get('number'));
    const IFSCCode = formData.get('IFSCCode');
    const bankName = formData.get('bankName');
    const holderName = formData.get('holderName');

    const accountDetails = { number, bankName, IFSCCode, holderName };

    const upiId = formData.get('upiId');
    const workExperience = formData.get('workExperience');
    const language = formData.get('language');
    
    const dutyHours = parseInt(formData.get('dutyHours'));
    const payment = dutyHours === 4 ? 400 : 700;

    const service = formData.get('service');
    const services = [service];

    
    if (!fullName && !email && !password && !age && !mobileNumber && !username && !permanent && !current && !latitude && !longitude && !education && !phoneNumber && !whatsappNumber && !number && !holderName && !bankName && !IFSCCode && !upiId && !workExperience && !language && !dutyHours && !payment && !service) {
        createToast('Fill the required fields!');
        return '';
    }

    const registerDetails = { fullName, email, password, age, mobileNumber, username, address, education, contactNumbers, accountDetails, upiId, workExperience, language, dutyHours, payment, services };

    
    const response = await newRegistration(registerDetails);
    if (response.mesage === 'An email has been sent to your mail.') {
        createToast(response.mesage);
        btnInfo(false);
        updateToNextSection();
    }

}

const confirmIconBox = document.querySelector('.confirm__icon');

async function emailVerification(mailToken) {
    try {
        
        const emailVerificationResponse = await fetch(`${SERVER_HOST_URL}/api-prof/v1/auth/confirm-email/${mailToken}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!emailVerificationResponse.ok) {
            console.log('Email verification failed. Try again!');
            createToast('Email verification failed. Try again!');
            confirmIconBox.innerHTML = '<ion-icon name="mail-unread"></ion-icon>';
            return '';
        }

        const confirmResponse = await emailVerificationResponse.json();
        return confirmResponse;

    } catch (error) {
        console.log(error);
        createToast('Internal Server Issues');
        return ''
    }
}

window.addEventListener('load', () => {
    if (getCurrentRegisterSectionFromLS() === 0) {
        const urlParams = new URLSearchParams(window.location.search);
        const confirmation = urlParams.get('confirmation');

        if (!confirmation) {
            return '';
        }

        createToast('Verifying email...');
        confirmIconBox.innerHTML = '<span class="confirmLoader"></span>';
        emailVerification(confirmation).then((response) => {
            const {message, token, professional} = response;
            if (message === 'Email Verified') {
                createToast('Email Verified');
                localStorage.setItem('__sivagroup__registerUserId', professional.id);
                localStorage.setItem('__sivagroup__registertoken', token);
                confirmIconBox.innerHTML = '<ion-icon name="checkmark-done"></ion-icon>';
                createToast('Forwarding in 5 seconds.');
                setTimeout(updateToNextSection, 5000);
            } else if (message === 'Invalid Token') {
                confirmIconBox.innerHTML = '<ion-icon name="close"></ion-icon>';
                createToast('Verification failed. Try again!');
            }
        }).catch(err => {
            console.log(err);
            createToast('Verification failed');
        });
    }
})

async function uploadDocs(formData) {
    try {
        
        docsBtn(true);
        createToast('Uploading Documents...');
        const uploadDocsResponse = await fetch(`${SERVER_HOST_URL}/api-prof/v1/auth/upload-docs/${localStorage.getItem('__sivagroup__registerUserId')}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('__sivagroup__registertoken')}`
            },
            body: formData
        });

        if (!uploadDocsResponse.ok) {
            console.log('Issue uploading Docs');
            if (uploadDocsResponse.status === 403) {
                createToast('Email not verified. Verify and try again.');
            }
            docsBtn(false);
            return '';
        }

        const response = await uploadDocsResponse.json();
        return response;

    } catch (error) {
        console.log(error);
        createToast('Internal Server Issues');
        return ''
    }
}

function checkFileSize(file) {
    const fileName = file.name;
    const fileSize = file.size;
    const fileSizeInKB = fileSize/1024;
    if (fileSizeInKB > 2048) {
        return {
            status: false,
            name: fileName
        };
    } else {
        return {
            status: true,
            name: fileName
        };
    }
}

async function handleUploadDocumentsSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const aadharFront = formData.get('aadharFront');
    const aadharFrontStatus = checkFileSize(aadharFront);

    if (!aadharFrontStatus.status) {
        createToast(`ID Front file is larger than 2 MB`);
        return ''
    }

    const aadharBack = formData.get('aadharBack');
    const aadharBackStatus = checkFileSize(aadharBack);

    if (!aadharBackStatus.status) {
        createToast(`ID Back file is larger than 2 MB`);
        return ''
    }

    const withUniformPics = formData.getAll('withUniform');
    withUniformPics.forEach((pic, index) => {
        const picStatus = checkFileSize(pic);
        if (!picStatus.status) {
            createToast(`Uniform Pic ${index + 1} is larger than 2 MB`);
            return ''; 
        }
    })

    const withoutUniform = formData.getAll('withoutUniform');
    withoutUniform.forEach((pic, index) => {
        const picStatus = checkFileSize(pic);
        if (!picStatus.status) {
            createToast(`No Uniform Pic ${index + 1} is larger than 2 MB`);
            return ''; 
        }
    })

    const response = await uploadDocs(formData);
    console.log(response);
    if (response.message === 'Documents Uploaded') {
        createToast(response.message);
        btnInfo(false);
        updateToNextSection();
    }

}