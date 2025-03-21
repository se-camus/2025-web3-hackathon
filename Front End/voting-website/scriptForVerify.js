'use strict';

const loginDetails = document.getElementById('username');
const passwordDetails = document.getElementById('password');
const loginButton = document.querySelector('.login-section .realme-button');
const createLoginButton = document.querySelector('.signup-section .realme-button');

loginButton.addEventListener('click', function(){
    if (loginDetails.value !== "" && passwordDetails.value !== ""){
        window.location.href = "successPage.html";
    } else {
        alert("Incorrect username or password");
    }
})

createLoginButton.addEventListener('click', function(){
    window.location.href = 'https://login.realme.govt.nz/32179062-92f6-4eb0-89bc-df400a9e0367/B2C_1A_DIA_RealMe_Home/api/CombinedSigninAndSignup/unified?local=signup&csrf_token=ZFJPQ3lFQ0cxKyszR09ib3NkaEhGRjNBSUgxYXdNZThRb2VzeEFvYXJ6UEhMYWtiRnlraUtIOEUxb1F5VWdGejE5SitGbEkyazB1Sy9JZm1qbk9KNmc9PTsyMDI1LTAzLTIxVDIyOjA2OjA5LjYxMjg3NThaO3ZuUHBpd252aThZYmlrZlEzN0lmSWc9PTt7Ik9yY2hlc3RyYXRpb25TdGVwIjoxfQ==&tx=StateProperties=eyJUSUQiOiIxODM0N2IyOS01MzI2LTRmYWItYWM5ZC1mMGFlZDg5OGI3MmIifQ&p=B2C_1A_DIA_RealMe_Home'; 
})



