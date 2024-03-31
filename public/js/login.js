const switchers = [...document.querySelectorAll('.switcher')];
switchers.forEach(item => {
    item.addEventListener('click', function() {
        switchers.forEach(item => item.parentElement.classList.remove('is-active'));
        this.parentElement.classList.add('is-active');
    })
});

if (document.getElementById("flash-msg").value) {
    alert(document.getElementById("flash-msg").value);
}