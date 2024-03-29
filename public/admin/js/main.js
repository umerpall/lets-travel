async function getPosts() {
    return await fetch('http://localhost:3000/posts')
    .then((response)=>response.json())
    .then((data)=> data)
}

let callMeForm = document.querySelector('.call-me-form');

async function getCallbackRequests() {
    return await fetch('http://localhost:3000/callback-requests')
    .then((response)=>response.json())
    .then((data)=> data)
}

async function getEmails() {
    return await fetch('http://localhost:3000/emails')
    .then((response)=>response.json())
    .then((data)=> data)
}

document.addEventListener('DOMContentLoaded', async ()=>{
    addPosts();
    addCallbackRequests();
    addEmails();
    //Create Post
    let addPostBtn = document.querySelector('.add-post');
    let createPostBtn = document.querySelector('#v-pills-add-post-tab');
    addPostBtn.addEventListener('click', ()=>createPostBtn.click());
})

async function addPosts (){
    let posts = await getPosts();
    let articles = document.querySelector('.articles-list tbody');
    let id = 1;
    articles.innerHTML = '';
    posts.forEach(post => {
        let postHTML = `
        <tr>
            <td>${id++}<input class="id" type="hidden" value="${post.id}"></td>
            <td class="title">${post.title}</td>
            <td class="date">${post.date}</td>
            <td class="country">${post.country}</td>
            <td><button class="edit-btn btn btn-link p-0 text-decoration-none">Edit</button></td>
            <td><button class="remove-btn btn btn-link p-0 text-decoration-none">X</button></td>
      </tr>`;
      articles.insertAdjacentHTML('beforeend', postHTML);
})}

async function addCallbackRequests() {
    let requests = await getCallbackRequests();
    let requestsBlock = document.querySelector('#v-pills-requests tbody');
    let id = 1;
    requestsBlock.innerHTML = '';
    requests.forEach(request => {
        let requestHTML = `
        <tr>
            <td>${id++}<input class="id" type="hidden" value="${request.id}"></td>
            <td class="title">${request.phoneNumber}</td>
            <td class="date">${request.date}</td>
            <td><button class="remove-btn btn btn-link p-0 text-decoration-none">X</button></td>
      </tr>`;
      requestsBlock.insertAdjacentHTML('beforeend', requestHTML);
})}

async function addEmails() {
    let emails = await getEmails();
    let emailsBlock = document.querySelector('#v-pills-mails tbody');
    let id = 1;
    emailsBlock.innerHTML = '';
    emails.forEach(email => {
        let emailHTML = `
        <tr>
            <td>${id++}<input class="id" type="hidden" value="${email.id}"></td>
            <td class="name">${email.name}</td>
            <td class="email">${email.email}</td>
            <td class="date">${email.date}</td>
            <td><button class="remove-btn btn btn-link p-0 text-decoration-none">X</button></td>
        </tr>
        <tr>
            <td colspan="5" class="text">${email.text}</td>
        </tr>
      `;
      emailsBlock.insertAdjacentHTML('beforeend', emailHTML);
})}

callMeForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    let phoneInput = callMeForm.querySelector('input');
    fetch('http://localhost:3000/callback-requests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            phoneNumber: phoneInput.value
        })
    }).then((res)=>res.text())
      .then(()=>alert('We will call you back as soon as possible'))
})

let requestsBlock = document.querySelector('#v-pills-requests');

    requestsBlock.addEventListener('click', (e)=>{
        if(e.target.classList.contains('remove-btn')){
            let id = e.target.parentNode.parentNode.querySelector('.id').value;
            fetch(`http://localhost:3000/callback-requests/${id}`, {
                method: 'DELETE'
            }).then((response)=>response.text())
            .then(()=> window.history.go()) 
        }
    })

    let emailsBlock = document.querySelector('#v-pills-mails');

    emailsBlock.addEventListener('click', (e)=>{
        if(e.target.classList.contains('remove-btn')){
            let id = e.target.parentNode.parentNode.querySelector('.id').value;
            fetch(`http://localhost:3000/emails/${id}`, {
                method: 'DELETE'
            }).then((response)=>response.text())
            .then(()=> window.history.go()) 
        }
    })

    let logOutBtn = document.querySelector('.log-out-btn');

    logOutBtn.addEventListener('click', ()=>{
      document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
      window.location.href = '/';
    })