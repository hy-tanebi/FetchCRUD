const postIkku = document.querySelector('.postIkku');
const postBtn = document.querySelector('.postBtn');
const ikkulist = document.querySelector('.ikkuList');
const url = 'http://localhost:3000/ikku';


const appendBtn = (className, text) => {
    const btn = document.createElement('button');
    btn.className = className;
    btn.innerHTML = text;
    return btn;
};


const appendList = (thisData) => {
    const li = document.createElement('li');
    li.dataset.id = thisData.id;
    li.innerHTML = thisData.ikku;
    const updateBtn = appendBtn('doUpdate', '修正');
    li.appendChild(updateBtn);
    const deleteBtn = appendBtn('doDelete', '削除');
    li.appendChild(deleteBtn);
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


// Update
const appendUpdateInput =  (thisIkku) => {
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'updateIkku';
    input.size = '30';
    input.maxlength = '30px';
    input.className = 'updateIkku';
    input.value = thisIkku;
    return input;
};


const appendUpdateBtn = () => {
    const btn = document.createElement('input');
    btn.type = 'button';
    btn.value = '送信';
    btn.className = 'updateBtn';
    return btn;
};


const appendUpdateArea = (thisLi) => {
    const thisIkku = thisLi.firstChild.textContent;
    const appendDiv = document.createElement('div');
    appendDiv.className = 'updateArea';
    appendDiv.appendChild(appendUpdateInput(thisIkku));
    appendDiv.appendChild(appendUpdateBtn());
    thisLi.appendChild(appendDiv);
};


document.addEventListener('click', (e) => {
    if (e.target.className ==='doUpdate') {
        const thisLi = e.target.closest('li');
        appendUpdateArea(thisLi);
    } 
}, false);


const updateFetch = (thisLi, thisId, data) => {
    const updateUrl = url + '/' + thisId;
    const updateArea = thisLi.querySelector('.updateArea');
    fetch(updateUrl, {
        method: 'PUT',
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
        thisLi.firstChild.textContent = data.ikku;
        thisLi.removeChild(updateArea);
    }).catch((error) => {
        console.log(error);
    });
};

document.addEventListener('click', (e) => {
    if (e.target.className ==='updateBtn') {
        const thisLi = e.target.closest('li');
        const thisId = thisLi.dataset.id;
        const thisInput = thisLi.querySelector('.updateIkku').value;
        console.log(thisInput);
        const data = {
            ikku: thisInput
        };
        updateFetch(thisLi, thisId, data);
    } 
}, false);