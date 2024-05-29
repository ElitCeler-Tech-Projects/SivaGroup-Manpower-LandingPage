const SERVER_HOST_URL = "https://manpower-eliteceler.coffeecodes.in";

// 1. Getting Current Section

function getCurrentRegisterSectionFromLS() {
    const currentSection = localStorage.getItem('__sivagroup__registration__section');
    if (!currentSection) {
        return 0;
    }
    return parseInt(currentSection);
}

let currentRegisterSection = getCurrentRegisterSectionFromLS();

// 2. Updating to Next Section. Storing Current Section in Local Storage for Easy access

function updateToNextSection() {
    const allRegisteredSection = Array.from(document.querySelectorAll('.register__section'));
    allRegisteredSection.forEach((section) => {
        section.classList.add('hide__section')
        allRegisteredSection[currentRegisterSection + 1].classList.remove('hide__section');
    })
    currentRegisterSection += 1;

    localStorage.setItem('__sivagroup__registration__section', currentRegisterSection);
}

// 3. Retreiving stored current section from Local Storage

window.addEventListener('load', () => {
    const allRegisteredSection = Array.from(document.querySelectorAll('.register__section'));
    allRegisteredSection.forEach((section) => {
        section.classList.add('hide__section')
        allRegisteredSection[currentRegisterSection].classList.remove('hide__section');
    });
})

// 4. Toastify | For creating Toast Notifications.

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

// 5. Services in HTML | Populate from Here for Dropdown

const allServices = [
    {
        id: "85ac065f-ade0-4d5c-8e0f-c8d2d0b47101",
        service: 'Hospitality Services'
    },
    {
        id: "f6043180-45a8-418c-8a80-4129657e8154",
        service: 'Security Services'
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

// 6. Showing Selected File | Upload Documents Section

function selectedFile(e, mainId) {

    const msgPara = document.querySelector(`#${mainId} #msg__show`);
    
    if (e.target.files) {
        const file = e.target.files[0];
        file && msgPara.classList.add('show__selected');
    }
}

// 7. Handling all Button Loading...

function btnLoad(isLoading, btnId) {
    const btn = document.querySelector(`${btnId}`);
    btn.disabled = isLoading;
    btn.innerHTML = isLoading ? '<span class="btnLoader"></span>' : btnId === '#detailsSubmitBtn' ? 'Submit Details' : btnId === '#otpSubmitBtn' ? 'Verify OTP' : 'Upload Documents';
}

async function newRegistration(registeredDetails) {
    try {

        btnLoad(true, '#detailsSubmitBtn');
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
                console.log(await newRegistraionResponse.json());
                createToast('Credentials already exists!');
            }
            btnLoad(false, '#detailsSubmitBtn');
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

    let phoneNumber = formData.get('phoneNumber');
    if (!phoneNumber.includes('+91')) {
        phoneNumber = `+91${phoneNumber}`;
    }
    let whatsappNumber = formData.get('whatsappNumber');
    if (!whatsappNumber.includes('+91')) {
        whatsappNumber = `+91${whatsappNumber}`;
    }
    let alternateNumber = formData.get('alternateNumber');
    if (!alternateNumber.includes('+91')) {
        alternateNumber = `+91${alternateNumber}`;
    }
    const contactNumbers = { phoneNumber, whatsappNumber, alternateNumber };

    const permanent = formData.get('permanent');
    const current = formData.get('current');
    const pincode = parseFloat(formData.get('pincode'));

    const address = { permanent, current, pincode};

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

    
    if (!fullName && !email && !password && !age && !username && !permanent && !current && !pincode && !education && !phoneNumber && !whatsappNumber && !number && !holderName && !bankName && !IFSCCode && !upiId && !workExperience && !language && !dutyHours && !payment && !service) {
        createToast('Fill the required fields!');
        return '';
    }

    localStorage.setItem('__register__sivagroup__phone', phoneNumber);

    const registerDetails = { fullName, email, password, age, username, address, education, contactNumbers, accountDetails, upiId, workExperience, language, dutyHours, payment, services };

    console.log(registerDetails);
    
    const response = await newRegistration(registerDetails);
    console.log(response);

    if (response.mesage === 'An OTP has been sent to your number.') {
        createToast(response.mesage);
        btnLoad(false, '#detailsSubmitBtn');
        updateToNextSection();
    }


}

async function confirmOTP(e) {
    e.preventDefault();

    const phoneNumber = localStorage.getItem('__register__sivagroup__phone');
    if (!phoneNumber) {
        createToast('Invalid Phone Number!');
        return '';
    }

    const otp = parseInt(document.querySelector('#otp')?.value);

    if (!otp) {
        createToast('Provide Valid OTP');
        return '';
    }

    const phoneDetails = {phone: phoneNumber, otp};

    console.log(phoneDetails);

    try {

        btnLoad(true, '#otpSubmitBtn');
        createToast('Verifying OTP...');
        const verifyOTP = await fetch(`${SERVER_HOST_URL}/api-prof/v1/auth/verify-phone`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(phoneDetails)
        });

        const responseData = await verifyOTP.json();

        if (!verifyOTP.ok) {
            console.log(verifyOTP.status);
            console.log(responseData);
            createToast('Invalid OTP');
            btnLoad(false, '#otpSubmitBtn');
            return '';
        }

        console.log(responseData);
        
        if (responseData.message === 'Phone number verified successfully') {
            const token = responseData.token;
            const profId = responseData.prof.id;
            localStorage.setItem('__register__sivagroup__profid', profId);
            localStorage.setItem('__register__sivagroup__token', token);
            localStorage.removeItem('__register__sivagroup__phone');
            createToast('OTP Verified!');
            btnLoad(false, '#otpSubmitBtn');
            updateToNextSection();
        }
    
    } catch (error) {
        console.log(error);
        createToast('Internal Server Issues');
        return ''
    }
    
}

const termsCheck = document.querySelector('#terms');
const uploadDocumentsBtn = document.querySelector('#docsSubmitBtn');

termsCheck.addEventListener('click', () => {
    if (termsCheck.checked) {
        uploadDocumentsBtn.disabled = false;
    } else {
        uploadDocumentsBtn.disabled = true;
    }
})

async function uploadDocs(formData) {
    try {
        
        btnLoad(true, '#docsSubmitBtn');
        createToast('Uploading Documents...');
        const uploadDocsResponse = await fetch(`${SERVER_HOST_URL}/api-prof/v1/auth/upload-docs/${localStorage.getItem('__register__sivagroup__profid')}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('__register__sivagroup__token')}`
            },
            body: formData
        });

        if (!uploadDocsResponse.ok) {
            console.log('Issue uploading Docs');
            if (uploadDocsResponse.status === 403) {
                createToast('Email not verified. Verify and try again.');
            }
            btnLoad(false, '#docsSubmitBtn');
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
    if (response.message === 'Documents Uploaded') {
        createToast(response.message);
        btnLoad(false, '#docsSubmitBtn');
        updateToNextSection();
    }

}