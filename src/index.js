let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  handletoys()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', event => {
        event.preventDefault()
        addtoy(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const handletoys = () => {
  fetch('http://localhost:3000/toys')
   .then(res => res.json())
   .then( toys => {
      toys.forEach(toy=>renderToy(toy))
});
}

const renderToy = (toy) => {
  
  const toyCard= document.createElement('div')
  toyCard.className = "card"
  toyCard.dataset.id = toy.id //
  const toyname= document.createElement('h2')
  toyname.innerText = `${toy.name}`
  const toyimg= document.createElement('img')
  toyimg.className= "toy-avatar"
  toyimg.src= `${toy.image}`
  const toycount=document.createElement('p')
  toycount.innerText= `${toy.likes}`
  const toybtn=document.createElement('button')
  toybtn.dataset.toyId = toy.id //
  toybtn.className = "like-btn"
  toybtn.innerText= "Like"
  toybtn.addEventListener('click', (e) => { //
      updateLikes(e) //
    }) //

  toyCard.appendChild(toyname)
  toyCard.appendChild(toyimg)
  toyCard.appendChild(toycount)
  toyCard.appendChild(toybtn)

  const toyShow=document.querySelector("#toy-collection")
  toyShow.appendChild(toyCard)
}

const addtoy = (toy_data) => {
   fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": toy_data.name.value,
      "image": toy_data.image.value,
      "likes": 0
    })
  })
    .then(response => response.json())
    .then(toy => renderToy(toy))
}

const updateLikes = (e) => {
  e.preventDefault()
  const toy_id = parseInt(e.target.dataset.toyId)
  const likeElement= e.target.previousElementSibling
  const new_number= parseInt(likeElement.innerText) + 1
    
  fetch(`http://localhost:3000/toys/${toy_id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": new_number
    })
  })
    .then(response => response.json())
    .then(like_obj => {
    likeElement.innerText= `${new_number} likes`
  } )
}