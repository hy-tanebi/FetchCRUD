const postIkku = document.querySelector('.postIkku');
const postBtn = document.querySelector('.postBtn');
const url = 'http://localhost:3000/ikku';


// Create
const postFetch = () => {
    const data = {
        ikku: postIkku.value
    };
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((response) => {
        if(!response.ok) {
            console.log('error!');
        } 
        console.log('ok!: ' + response);
        return response.json();
    }).then((data)  => {
        console.log(data);
    }).catch((error) => {
        console.log(error);
    });
};

postBtn.addEventListener('click', postFetch, false);
