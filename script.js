
  const buttons = document.querySelectorAll('.tip-btn');
  const custom = document.getElementById('custom');
  const reset = document.getElementById('reset');

  const inputBill = document.getElementById('bill');
  const inputPeople = document.getElementById('people');

  const tipPerPerson = document.getElementById('tipPerPerson');
  const totalPerPerson = document.getElementById('totalPerPerson');


  for (const button of buttons) {
    button.addEventListener('click',(e)=>{
      unselectButtons();
      button.classList.add('selected');
      setAmount();
    });
  }

  inputBill.addEventListener('keyup',(e)=>{
    setAmount();
  });
  inputPeople.addEventListener('keyup',(e)=>{
    setAmount();
  });
  
  custom.addEventListener('keyup',(e)=>{
    custom.dataset.value = parseInt(custom.value);
    setAmount();
  });

  function unselectButtons(){
    for (const button of buttons) {
      button.classList.remove('selected');     
    }
  }

  function setAmount(){
    
    if (document.querySelector('.selected') === null) return;
    if (document.querySelector('.selected').dataset.value === 0) return;
    if (document.querySelector('.selected').dataset.value === undefined) return;
    if (isNaN(document.querySelector('.selected').dataset.value)) return;
    if (inputBill.value === 0) return;
    if (document.getElementById('people').value === 0 || document.getElementById('people').value === ''){
      showError();
      return;
    };
    removeErrors();
    
    let total = inputBill.value;
    let selectedTip = document.querySelector('.selected').dataset.value;
    let totalTip = parseFloat(total * selectedTip / 100);
    let totalWithTip = parseFloat(total) + totalTip;
    let numberOfPeople = document.getElementById('people').value;
    tipPerPerson.innerHTML = (Math.round((totalTip / numberOfPeople) * 100) / 100).toFixed(2); 
    totalPerPerson.innerHTML = (Math.round((totalWithTip / numberOfPeople) * 100) / 100).toFixed(2); 
  }
  
  function showError(){
    removeErrors();
    let div = document.getElementById('numberOfPeople');
    let error = document.createElement('p');
    error.innerHTML = "Can't be zero";
    error.classList.add('error');
    div.appendChild(error);
  }
  
  function removeErrors(){
    let div = document.getElementById('numberOfPeople');
    if (div.querySelector('.error')) {
      div.querySelector('.error').remove();
    }
  }