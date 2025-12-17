import { country_code } from "./country-list.js"; // notice the { } for named import
const dropList = document.querySelectorAll(".drop-list select");
const getButton = document.querySelector(".box .btn");
const fromCurrency = document.querySelector("#fromCurrency");
const toCurrency = document.querySelector("#toCurrency");

for (let i = 0; i < dropList.length; i++) {
  for (let code in country_code) {
    // console.log(country_code[code]);
    let selected;
    if (i == 0) {
      selected = code == "USD" ? "selected" : "";
    } else if (i == 1) {
      selected = code == "INR" ? "selected" : "";
    }
    let optionTag = `<option value="${code}" ${selected}>${code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", e => {
    loadFlag(e.target);
  });
}

function loadFlag(element){
    for(let code in country_code){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagsapi.com/${country_code[code]}/flat/64.png`;
            // console.log(country_code[code]);
        }
    }
}

window.addEventListener("load", () => {
  getExchangeRate();
});

getButton.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

const exchangeIcon = document.querySelector(".drop-list .exchange button");
exchangeIcon.addEventListener("click", () =>{
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
})

function getExchangeRate() {
  const amount = document.querySelector(".inp");
  const exchangeRateText = document.querySelector(".result-amount");
  let amountVal = amount.value;

  if (amountVal == "" || amountVal == "0") {
    amount.value = "1";
    amountVal = 1;
  }

  exchangeRateText.innerText = "Getting exchange rate...";
  let url = `https://v6.exchangerate-api.com/v6/2734b92f9ba463fd2730800c/latest/${fromCurrency.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurrency.value];
      // console.log(exchangeRate);
      let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
      // console.log(totalExchangeRate);
      exchangeRateText.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    }).catch( () => {
      exchangeRateText.innerText = "Something went worng";
    })
}
