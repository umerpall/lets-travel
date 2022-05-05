{
    let articlesBlock = document.querySelector('.articles-list');
    let updateBtn = document.querySelector('#v-pills-update-post-tab');
    let updateForm = document.querySelector('.update-post-form');
    let updateInput = document.querySelector('#update-title');
    let textArea = document.querySelector('#update-text');

    let id;

    articlesBlock.addEventListener('click', async (e)=>{
        if(e.target.classList.contains('edit-btn')){
            id = e.target.parentNode.parentNode.querySelector('.id').value;
            let postInfo = await fetch('http://localhost:3000/posts/' + id)
                .then((response)=>response.json())
                .then((data)=>data)

            updateInput.value = postInfo.title;
            textArea.value = postInfo.text;
            updateBtn.click(); 
        }
    })

    updateForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        let updateDescription;
        if(textArea.value.indexOf('.') === -1){
            updateDescription = textArea.value;
        }else {
            updateDescription = textArea.value.substring(0, textArea.value.indexOf('.')+1);
        }
        fetch(`http://localhost:3000/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: updateInput.value,
                text: textArea.value,
                description: updateDescription
            })
        }).then((res)=>res.text())
          .then(()=>window.history.go())
    })
}