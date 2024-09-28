let addingIncredientBtn = document.getElementById('addingIncredientBtn');
let incredientList = document.querySelector('.incredientList');
let incredientDiv = document.querySelectorAll('.incredientDiv')[0];

addingIncredientBtn.addEventListener('click',function() {
   const newIngreient = incredientDiv.cloneNode(true);
   let input = newIngreient.getElementsByTagName('input')[0];
   input.value = '';
   

   let removeButton = document.createElement('button');
   removeButton.classList.add('btn','btn-outline-danger', 'mt-1');
   removeButton.textContent = 'Remove';

   removeButton.addEventListener('click', function() {
    newIngreient.remove();
    showRemoveButtons();
   });
   
   newIngreient.appendChild(removeButton);
   incredientList.appendChild(newIngreient);
   
   showRemoveButtons();
});

function showRemoveButtons() {
    let allIncredients = incredientList.querySelectorAll('.incredientDiv');
    allIncredients.forEach((incredientDiv, index) => {
        let removeButton = incredientDiv.querySelector('button');
        if(removeButton) {
            if(allIncredients.length > 1) {
                removeButton.style.display = 'inline-block';
            } else {
                removeButton.style.display = 'none';
            }
        }
    })
}

showRemoveButtons();


const alertOne = document.getElementById('alertOne')


setTimeout(()=> {
    alertOne.style.display = 'none';

},3000);