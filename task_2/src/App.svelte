<script lang="js">

  const apiKey = '';
  const apiUrl = 'https://open.er-api.com/v6/latest/USD';

  fetch(`${apiUrl}?apiKey=${apiKey}`)
          .then(response => response.json())
          .then(data => {
            function createDOM() {
              const rates = data.rates;
              const currencySelects = document.querySelectorAll('.currency-select');

              currencySelects.forEach(currencySelect => {
                for (const key in rates) {
                  const option = document.createElement('option');
                  option.value = key;
                  option.textContent = key;
                  currencySelect.appendChild(option);
                }
              });
            }
            createDOM();

            const selectElement1 = document.getElementById('select-1');
            const selectElement2 = document.getElementById('select-2');

            let firstValue = 'USD';
            let secondValue = 'USD';

            const input1 = document.getElementById('input1');
            const input2 = document.getElementById('input2');
            let input1Value;
            let input2Value;

            function getValue(element) {
              const selectedValue = element.value;
              return selectedValue;
            }
            selectElement1.addEventListener('change', function() {
              firstValue = getValue(this);
              const event = new Event('input');
              input2.dispatchEvent(event);
            });
            selectElement2.addEventListener('change', function() {
              secondValue = getValue(this);
              const event = new Event('input');
              input1.dispatchEvent(event);
            });


            input1.addEventListener('input', function() {
              const rates = data.rates;
              input1Value = this.value;
              let temp;
              for (const key in rates) {
                if (firstValue === key) {
                  temp = 1 / rates[key];
                }
              }
              for (const key in rates) {
                if(secondValue === key) {
                  input1Value = input1Value * temp;
                  input2.value = input1Value * rates[key];
                }
              }
            });

            input2.addEventListener('input', function() {
              const rates = data.rates;
              input2Value = this.value;
              let temp;
              for (const key in rates) {
                if (secondValue === key) {
                  temp = 1 / rates[key];
                }
              }
              for (const key in rates) {
                if(firstValue === key) {
                  input2Value = input2Value * temp;
                  input1.value = input2Value * rates[key];
                }
              }

            })
          })
          .catch(error => {
            console.error(error);
          });
</script>

<main>
  <div class="app__wrapper">
    <p>currency conversion</p>
    <div class="first__block">
      <select name="currency1" class="currency-select" id="select-1">
      </select>
      <label>
        <input type="number" id="input1"/>
      </label>
    </div>
    <div class="first__block">
      <select name="currency2" class="currency-select" id="select-2">
      </select>
      <label>
        <input type="number" value='' id="input2">
      </label>
    </div>
  </div>
</main>

<style>

</style>
