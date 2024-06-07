
const elements = document.querySelectorAll('.element');


elements.forEach(function(element) {
    element.addEventListener('click', function() {

        if (element.classList.contains('selected')) {
            element.classList.remove('selected'); 
        } else {

            elements.forEach(function(otherElement) {
                otherElement.classList.remove('selected');
            });
            element.classList.add('selected');
        }
    });
});

const toggleBtn = document.getElementById('toggleBtn');

toggleBtn.addEventListener('click', function() {

    elements.forEach(function(element) {

        if (!element.classList.contains('selected')) {
            element.classList.toggle('hidden');
        }
    });
});
