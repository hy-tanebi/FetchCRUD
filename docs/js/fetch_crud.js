const postIkku = document.querySelector('.postIkku');
const postBtn = document.querySelector('.postBtn');
const ikkulist = document.querySelector('.ikkuList');
const url = 'http://localhost:3000/ikku';

const appendList = (thisData) => {
    const li = document.createElement('li');
    li.dataset.id = thisData.id;
    li.innerHTML = thisData.ikku;

    const makeBtn = (className, text) => {
        const btn = document.createElement('button');
        btn.className = className;
        btn.innerHTML = text;
        return btn;
    };

    const updateBtn = makeBtn('updateBtn', '修正');
    const deleteBtn = makeBtn('deleteBtn', '削除');
    
    ikkulist.appendChild(li);
    li.appendChild(updateBtn);
    li.appendChild(deleteBtn);
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