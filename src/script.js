const file = document.getElementById('file');
const paragraph = document.getElementById('paragraph');
file.addEventListener('change', (event) => {
    const reader = new FileReader();
    reader.readAsText(file.files[0]);
    reader.onload = function () {
        paragraph.innerHTML = reader.result;
    }
})