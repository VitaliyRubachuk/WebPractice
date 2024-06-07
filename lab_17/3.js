
    const deleteBtns = document.querySelectorAll('.delete-btn');


    deleteBtns.forEach(function(btn) {
        btn.addEventListener('click', function()
         {
            const block = btn.parentElement; 
            block.remove();
        });
    });