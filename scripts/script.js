const input = document.getElementById("search-input");
const button = document.getElementById("search-button");


input.addEventListener('keyup', (event) => {
    if(event.keyCode === 13) {
        const inputValue = input.value;
        console.log(inputValue);
    }
})

button.addEventListener('click', () => {
    const inputValue = input.value;
    console.log(inputValue);
})