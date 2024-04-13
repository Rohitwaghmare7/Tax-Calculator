function validateField(field) {
  const value = field.value;
  const errorIcon = field.nextElementSibling;
  const isValid = !isNaN(value) && value.trim() !== "";

  if (!isValid) {
    errorIcon.style.display = "inline-block";
  } else {
    errorIcon.style.display = "none";
  }
  return isValid;
}

function calculateTax(gIncome, eIncome, deductions, ageGroup) {
  const overallIncome =
    parseFloat(gIncome) + parseFloat(eIncome) - parseFloat(deductions);
  let tax = 0;

  if (overallIncome > 800000) {
    const incomeOver8Lakhs = overallIncome - 800000;

    let taxRate = 0;
    if (ageGroup === "<40") {
      taxRate = 0.3;
    } else if (ageGroup === "40-60") {
      taxRate = 0.4;
    } else if (ageGroup === "≥60") {
      taxRate = 0.1;
    }

    tax = incomeOver8Lakhs * taxRate;
  }

  return tax.toFixed(2);
}

function validateForm(event) {
  event.preventDefault();

  let isValid = true;

  const gIncomeValid = validateField(document.getElementById("gIncome"));
  const eIncomeValid = validateField(document.getElementById("eIncome"));
  const deductionsValid = validateField(document.getElementById("deductions"));

  isValid = gIncomeValid && eIncomeValid && deductionsValid;

  const ageGroupSelect = document.getElementById("ageGroup");
  const ageGroupErrorIcon = document.getElementById("ageGroupError");

  if (!ageGroupSelect.value) {
    ageGroupErrorIcon.style.display = "inline-block";
    isValid = false;
  } else {
    ageGroupErrorIcon.style.display = "none";
  }

  if (isValid) {
    const gIncome = parseFloat(document.getElementById("gIncome").value);
    const eIncome = parseFloat(document.getElementById("eIncome").value);
    const deductions = parseFloat(document.getElementById("deductions").value);
    const ageGroup = ageGroupSelect.value;

    const overallIncome = gIncome + eIncome - deductions;
    const tax = calculateTax(gIncome, eIncome, deductions, ageGroup);

    const taxFloat = parseFloat(tax);
    const overallIncomeAfterTax = overallIncome - taxFloat;

    const resultModal = new bootstrap.Modal(
      document.getElementById("resultModal")
    );
    resultModal.show();
    document.getElementById("resultText").innerHTML = `
    Your calculated tax is <strong>${tax}</strong><br>
    Overall income after tax deductions is <strong>${overallIncomeAfterTax}</strong>
`;
  }
}

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

const form = document.getElementById("taxCalculatorForm");
form.onsubmit = validateForm;
