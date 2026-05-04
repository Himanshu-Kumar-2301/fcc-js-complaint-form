const fullName = document.getElementById("full-name");
const email = document.getElementById("email");
const orderNo = document.getElementById("order-no");
const productCode = document.getElementById("product-code");
const quantity = document.getElementById("quantity");
const complaints = document.querySelectorAll('input[name="complaint"]');
const complaintDescription = document.getElementById("complaint-description");
const solutions = document.querySelectorAll('input[name="solutions"]');
const solutionDescription = document.getElementById("solution-description");
const form = document.getElementById("form");

const checkValidName = (ele) => {
  if (ele.value.trim() === "") {
    ele.style.borderColor = "red";
    return false;
  } else {
    ele.style.borderColor = "green";
    return true;
  }
};

const checkValidEmail = (ele) => {
  const emailRegex = /^\S+@\S+[.]{1}\S+$/;
  if (emailRegex.test(ele.value)) {
    ele.style.borderColor = "green";
    return true;
  } else {
    ele.style.borderColor = "red";
    return false;
  }
};

const checkValidOrderNo = (ele) => {
  const orderRegex = /^2024[\d]{6}$/;
  if (orderRegex.test(ele.value)) {
    ele.style.borderColor = "green";
    return true;
  } else {
    ele.style.borderColor = "red";
    return false;
  }
};

const checkValidProductCode = (ele) => {
  const productCodeRegex = /[A-Z]{2}\d{2}-[A-Z]\d{3}-[A-Z]{2}\d/i;
  if (productCodeRegex.test(ele.value)) {
    ele.style.borderColor = "green";
    return true;
  } else {
    ele.style.borderColor = "red";
    return false;
  }
};

const checkValidQuantity = (ele) => {
  if (Number(ele.value) > 0) {
    ele.style.borderColor = "green";
    return true;
  } else {
    ele.style.borderColor = "red";
    return false;
  }
};

const checkValidComplaint = (ele) => {
  const res = Array.from(ele).some((input) => input.checked);
  if (res && ele[3].checked) {
    complaintDescription.parentElement.hidden = false;
  } else {
    complaintDescription.parentElement.hidden = true;
  }
  document.getElementById("complaints-group").style.borderColor = res
    ? "green"
    : "red";
  return res;
};

const checkComplaintDescription = () => {
  if (complaints[3].checked) {
    if (complaintDescription.value.length < 20) {
      complaintDescription.style.borderColor = "red";
      return false;
    }
    complaintDescription.style.borderColor = "green";
    return true;
  }
  return null;
};

const checkValidSolution = (ele) => {
  const res = Array.from(ele).some((input) => input.checked);
  if (res && ele[2].checked) {
    solutionDescription.parentElement.hidden = false;
  } else {
    solutionDescription.parentElement.hidden = true;
  }
  document.getElementById("solutions-group").style.borderColor = res
    ? "green"
    : "red";
  return res;
};

const checkSolutionDescription = () => {
  if (solutions[2].checked) {
    if (solutionDescription.value.length < 20) {
      solutionDescription.style.borderColor = "red";
      return false;
    }
    solutionDescription.style.borderColor = "green";
    return true;
  }
  return null;
};

fullName.addEventListener("change", (e) => checkValidName(e.target));

email.addEventListener("change", (e) => checkValidEmail(e.target));

orderNo.addEventListener("change", (e) => checkValidOrderNo(e.target));

productCode.addEventListener("change", (e) => checkValidProductCode(e.target));

quantity.addEventListener("change", (e) => checkValidQuantity(e.target));

complaintDescription.addEventListener("change", checkComplaintDescription);

solutionDescription.addEventListener("change", checkSolutionDescription);

complaints.forEach((ele) =>
  ele.addEventListener("change", () => checkValidComplaint(complaints)),
);

solutions.forEach((ele) =>
  ele.addEventListener("change", () => checkValidSolution(solutions)),
);

const clear = () => {
  fullName.value = "";
  email.value = "";
  orderNo.value = "";
  productCode.value = "";
  quantity.value = "";
  complaints.forEach((ele) => (ele.checked = false));
  solutions.forEach((ele) => (ele.checked = false));
  complaintDescription.parentElement.hidden = true;
  solutionDescription.parentElement.hidden = true;
};

const validateForm = () => {
  const validInput = {
    "full-name": checkValidName(fullName),
    email: checkValidEmail(email),
    "order-no": checkValidOrderNo(orderNo),
    "product-code": checkValidProductCode(productCode),
    quantity: checkValidQuantity(quantity),
    "complaints-group": checkValidComplaint(complaints),
    "complaint-description": checkComplaintDescription(),
    "solutions-group": checkValidSolution(solutions),
    "solution-description": checkSolutionDescription(),
  };

  validInput["complaint-description"] === null
    ? delete validInput["complaint-description"]
    : "";
  validInput["solution-description"] === null
    ? delete validInput["solution-description"]
    : "";

  return validInput;
};

const isValid = (obj) => Object.values(obj).every((val) => val === true);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const validate = isValid(validateForm());
  document.getElementById("message-box").innerText = validate
    ? ""
    : "Please, fill out the required fields correctly before submitting.";
  if (validate) {
    alert("Form submitted successfully");
    clear();
  }
});

document.getElementById("clear-btn").addEventListener("click", clear);
