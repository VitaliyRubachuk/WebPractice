const createDivBtn = document.getElementById('createDivBtn');

createDivBtn.addEventListener('click', function() {
    const newDiv = document.createElement('div');
    
    newDiv.style.width = '800px';
    newDiv.style.height = '50px';
    newDiv.style.backgroundColor = 'rgba(0, 0, 255, 0.5)'; 
    newDiv.style.margin = 'auto'; 
    newDiv.style.opacity = '0.7'; 
    newDiv.style.fontWeight = 'bold'; 
    newDiv.style.textAlign = 'center'; 

    newDiv.textContent = 'Новий div';

    const container = document.querySelector('.container');

    container.appendChild(newDiv);
});
