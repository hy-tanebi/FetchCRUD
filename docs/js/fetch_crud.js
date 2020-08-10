const postIkku = document.querySelector('.postIkku');
const postBtn = document.querySelector('.postBtn');
const ikkulist = document.querySelector('.ikkuDl');
const url = 'http://localhost:3000/ikku';

const appendList = (thisData) => {
    const li = document.createElement("li");
    li.dataset.id = thisData.id;
    li.innerHTML = thisData.ikku;
    ikkulist.appendChild(li);    
};

// Create
const createFetch = () => {
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
        console.log('ok!');
        return response.json();
    }).then((data)  => {
        appendList(data);
    }).catch((error) => {
        console.log(error);
    });
};

postBtn.addEventListener('click', createFetch, false);


// Read
const readFetch = () => {
    fetch(url).then((response) => {
        if(!response.ok) {
            console.log('error!');
        } 
        console.log('ok!');
        return response.json();
    }).then((data)  => {
        for (let i = 0; i < data.length; i++) {
            const thisData = data[i];
            appendList(thisData);
        }
    }).catch((error) => {
        console.log(error);
    });
};
readFetch();