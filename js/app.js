document.querySelector(".jsFilter").addEventListener("click", function () {
    document.querySelector(".filter-menu").classList.toggle("active");
});

document.querySelector(".grid").addEventListener("click", function () {
    document.querySelector(".list").classList.remove("active");
    document.querySelector(".grid").classList.add("active");
    document.querySelector(".products-area-wrapper").classList.add("gridView");
    document
        .querySelector(".products-area-wrapper")
        .classList.remove("tableView");
});

document.querySelector(".list").addEventListener("click", function () {
    document.querySelector(".list").classList.add("active");
    document.querySelector(".grid").classList.remove("active");
    document.querySelector(".products-area-wrapper").classList.remove("gridView");
    document.querySelector(".products-area-wrapper").classList.add("tableView");
});

var modeSwitch = document.querySelector('.mode-switch');
modeSwitch.addEventListener('click', function () {
    document.documentElement.classList.toggle('light');
    modeSwitch.classList.toggle('active');
});



let elUsers = document.querySelector(".box2");

function fetchProducts(url, callBack) {
    let deleteObj;
    fetch(url, {
        method: "GET"
    })
        .then(res => res.json())
        .then(data => {
            // renderData(data)
            deleteObj = data
            console.log(data);
        }).then(() => callBack(deleteObj))
}

function render(arr) {
    arr.forEach(element => {
        let card2 =
            `
    <div class="div">
    <img class="img" src="${element.avatar}" alt="">
       <h3 class="title">${element.name}</h3>
       <h4 class="title"><span class="title-span">role:</span> ${element.role}</h4>
       <p class="text"><span class="text-span">email:</span> ${element.email}</p>
    <div class="btns">
       <button id="${element.id}" class="edit">Update</button>
       <button id="${element.id}" class="del">Delete</button>
    </div>
    </div>
    `   
        elUsers.insertAdjacentHTML("beforeend", card2)
    });
}

fetchProducts("https://api.escuelajs.co/api/v1/users", render)

elUsers.addEventListener("click", e => {
    e.preventDefault()
    if (e.target.matches(".del")) {
        e.preventDefault()
        deleteFetch(e.target.id)
    }

    if (e.target.matches(".edit")) {
        if(e.target.parentElement.childElementCount == 2) {
            let input = document.createElement("input")
            let inputPrice = document.createElement("input")
            let buttonEdit = document.createElement("button")

            buttonEdit.textContent = "Edit"
            buttonEdit.setAttribute("id", e.target.id)
            buttonEdit.setAttribute("class", "update-btn")
            input.setAttribute("class", "input")
            inputPrice.setAttribute("class", "input-price")

            input.setAttribute("placeholder", "Enter your name")
            inputPrice.setAttribute("placeholder", "Enter your email")

            e.target.parentElement.appendChild(input)
            e.target.parentElement.appendChild(inputPrice)
            e.target.parentElement.appendChild(buttonEdit)
        }
    }

    if(e.target.matches(".update-btn")) {
        updateFetch(e.target.id, e.target.previousSibling.previousSibling.value, e.target.previousSibling.value)
    }
})

function deleteFetch(id) {
    fetch(`https://api.escuelajs.co/api/v1/users/${id}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(data => {
            fetchProducts("https://api.escuelajs.co/api/v1/users", render)
            window.location.reload()
        })
}

function updateFetch(id, value, email){
    console.log(id);
    fetch(`https://api.escuelajs.co/api/v1/users/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify({
            name: value,
            email: email
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            fetchProducts("https://api.escuelajs.co/api/v1/users", render)
            window.location.reload()
        })
}



(function() {
    "use strict";
  
    let box = document.getElementById('box')
    const backdrop = document.querySelector('#modal-backdrop');
    document.addEventListener('click', modalHandler);
  
    function modalHandler(evt) {
      const modalBtnOpen = evt.target.closest('.js-modal');
      if (modalBtnOpen) { // open btn click
        const modalSelector = modalBtnOpen.dataset.modal;
        showModal(document.querySelector(modalSelector));
        box.style.opacity = '0.1'
      }
  
      const modalBtnClose = evt.target.closest('.modal-close');
      if (modalBtnClose) { // close btn click
        evt.preventDefault();
        hideModal(modalBtnClose.closest('.modal-window'));
        box.style.opacity = '1'
      }
  
      if (evt.target.matches('#modal-backdrop')) { // backdrop click
        hideModal(document.querySelector('.modal-window.show'));
      }
    }
  
    function showModal(modalElem) {
      modalElem.classList.add('show');
    }
  
    function hideModal(modalElem) {
      modalElem.classList.remove('show');
    }
})();