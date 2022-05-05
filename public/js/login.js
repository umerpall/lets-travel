let signInForm = document.querySelector('.sign-in-form');
let registerForm = document.querySelector('.register-form');

signInForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    let email = document.querySelector('#sign-in-email').value;
    let password = document.querySelector('#sign-in-password').value;

    fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then((res)=> res.json())
      .then((data)=> {
          let redirectURL = data.redirectURL;
          if(redirectURL){
              window.location.href = redirectURL;
          } else {
              alert('Your password do not match. Please try again.')
          }
      })
})

registerForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    let email = document.querySelector('#register-email').value;
    let password = document.querySelector('#register-password').value;
    let rePassword = document.querySelector('#register-re-enter-password').value;

    if(password !== rePassword){
        return;
    }

    fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then((res)=> res.text())
      .then((data)=> alert(data))
})