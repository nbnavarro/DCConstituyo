function organizeByName() {
  function order(const1, const2) {
    const ordered = document.getElementById('order');
    if (ordered.value === 'crec') {
      if (const1.innerText >= const2.innerText) {
        return 1;
      }
      return -1;
    }
    if (const1.innerText <= const2.innerText) {
      return 1;
    }
    return -1;
  }
  const constituents = document.getElementsByClassName('constituent');

  const constArray = Array.prototype.slice.call(constituents);

  const constArrayOrg = constArray.sort(order);

  const parent = constituents[0].parentNode;
  for (let i = 0; i < (constituents.length); i += 1) {
    parent.removeChild(constituents[i]);
  }
  for (let j = 0; j < (constArrayOrg.length); j += 1) {
    parent.appendChild(constArrayOrg[j]);
  }
}

function organizeByDate() {
  function order(const1, const2) {
    const ordered = document.getElementById('order');
    const date1 = new Date(const1.id.split('_')[2]);
    const date2 = new Date(const2.id.split('_')[2]);
    if (ordered.value === 'crec') {
      return parseInt(date1.getTime(), 10) - parseInt(date2.getTime(), 10);
    }
    return parseInt(date2.getTime(), 10) - parseInt(date1.getTime(), 10);
  }

  const constituents = document.getElementsByClassName('constituent');

  const constArray = Array.prototype.slice.call(constituents);

  const constArrayOrg = constArray.sort(order);

  const parent = constituents[0].parentNode;
  for (let i = 0; i < (constituents.length); i += 1) {
    parent.removeChild(constituents[i]);
  }
  for (let j = 0; j < (constArrayOrg.length); j += 1) {
    parent.appendChild(constArrayOrg[j]);
  }
}
function organizeByAge() {
  function order(const1, const2) {
    const ordered = document.getElementById('order');
    if (ordered.value === 'crec') {
      return parseInt(const1.id.split('_')[1], 10) - parseInt(const2.id.split('_')[1], 10);
    }
    return parseInt(const2.id.split('_')[1], 10) - parseInt(const1.id.split('_')[1], 10);
  }
  const constituents = document.getElementsByClassName('constituent');

  const constArray = Array.prototype.slice.call(constituents);

  const constArrayOrg = constArray.sort(order);

  const parent = constituents[0].parentNode;
  for (let i = 0; i < (constituents.length); i += 1) {
    parent.removeChild(constituents[i]);
  }
  for (let j = 0; j < (constArrayOrg.length); j += 1) {
    parent.appendChild(constArrayOrg[j]);
  }
}

const orderAge = document.getElementById('age');
const orderName = document.getElementById('name');
const orderCreated = document.getElementById('created');

if (orderAge) {
  orderAge.addEventListener('click', organizeByAge);
  orderCreated.addEventListener('click', organizeByDate);
  orderName.addEventListener('click', organizeByName);
}
