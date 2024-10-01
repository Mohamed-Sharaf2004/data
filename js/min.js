var contactName = document.getElementById("name");
var contactPhone = document.getElementById("phone");
var contactEmail = document.getElementById("mail");
var contactDescription = document.getElementById("description");
var nameAlert = document.getElementById("nameAlert");
var phoneAlert = document.getElementById("phoneAlert");
var submitButon = document.getElementById("submit");
var inputs = document.getElementsByClassName("form-control");
var searchInput = document.getElementById("searchInput");
var contacts = [];
var currentIndex = 0;
if (JSON.parse(localStorage.getItem("contactList")) != null) {
  contacts = JSON.parse(localStorage.getItem("contactList"));
  displayDate();
}
submitButon.onclick = function () {
  if (submitButon.innerHTML == "Add Contact") {
    console.log("trueeee");

    addcontact();
  } else {
    updateContact();
  }
  displayDate();
  clearForm();
};
function addcontact() {
  var contact = {
    name: contactName.value,
    phone: contactPhone.value,
    mail: contactEmail.value,
    description: contactDescription.value,
  };
  contacts.push(contact);
  localStorage.setItem("contactList", JSON.stringify(contacts));
}
function displayDate() {
  var continare = "";
  for (var i = 0; i < contacts.length; i++) {
    continare += `
      <tr>
      <td>${contacts[i].name}</td>
      <td>${contacts[i].phone}</td>
      <td>${contacts[i].mail}</td>
      <td>${contacts[i].description}</td>
      <td><i onclick="getCurrentContact(${i})" class="fa-solid text-warning mx-3 fa-edit"></i>
       <i onclick="deleteContact(${i})" class="fa-solid text-danger fa-trash"></i> </td>
      </tr>
      `;
  }
  document.getElementById("tableBody").innerHTML = continare;
}
function clearForm() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}
function deleteContact(index) {
  contacts.splice(index, 1);
  displayDate();
  localStorage.setItem("contactList", JSON.stringify(contacts));
}
function getCurrentContact(index) {
  currentIndex = index;
  contactName.value = contacts[index].name;
  contactPhone.value = contacts[index].phone;
  contactEmail.value = contacts[index].mail;
  contactDescription.value = contacts[index].description;
  submitButon.innerHTML = "Update Contact";
}
function updateContact() {
  var contact = {
    name: contactName.value,
    phone: contactPhone.value,
    mail: contactEmail.value,
    description: contactDescription.value,
  };
  contacts[currentIndex] = contact;
  submitButon.innerHTML = "Add Contact";
  localStorage.setItem("contactList", JSON.stringify(contacts));
}
searchInput.onkeyup = function () {
  var continare = "";
  for (var i = 0; i < contacts.length; i++) {
    if (
      contacts[i].name.toLowerCase().includes(searchInput.value.toLowerCase())
    ) {
      continare += `
        <tr>
      <td>${contacts[i].name}</td>
      <td>${contacts[i].phone}</td>
      <td>${contacts[i].mail}</td>
      <td>${contacts[i].description}</td>
      <td><i onclick="getCurrentContact(${i})" class="fa-solid text-warning mx-3 fa-edit"></i>
       <i onclick="deleteContact(${i})" class="fa-solid text-danger fa-trash"></i> </td>
      </tr>
      `;
    }
  }
  document.getElementById("tableBody").innerHTML = continare;
};
// if(array[i].input.value.toLowerCase().icludes(inputSearch.value.toLowerCase()))

function nameValidate() {
  var nameRejax = /^[A-Z][a-z]{4,10}\s[A-Z][a-z]{4,10}$/;
  if (nameRejax.test(contactName.value)) {
    submitButon.removeAttribute("disabled");
    contactName.classList.add("is-valid");
    contactName.classList.remove("is-invalid");
    nameAlert.classList.add("d-none");
    return true;
  } else {
    submitButon.disabled = "true";
    contactName.classList.add("is-invalid");
    contactName.classList.remove("is-valid");
    nameAlert.classList.remove("d-none");
  }
}

function phoneValidate() {
  var phoneRejax = /^(002)?01[0125][0-9]{8}$/;
  if (phoneRejax.test(contactPhone.value)) {
    contactPhone.classList.add("is-valid");
    contactPhone.classList.remove("is-invalid");
    phoneAlert.classList.add("d-none");
    return true;
  } else {
    contactPhone.classList.add("is-invalid");
    contactPhone.classList.remove("is-valid");
    phoneAlert.classList.remove("d-none");
  }
}
function test() {
  if (nameValidate() && phoneValidate()) {
    submitButon.removeAttribute("disabled");
  } else {
    submitButon.disabled = "true";
  }
}
contactName.onkeyup = function () {
  nameValidate();
  phoneValidate();
  test();
};
contactPhone.onkeyup = function () {
  phoneValidate();
  nameValidate();
  test();
};
