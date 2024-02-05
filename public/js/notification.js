const btn = document.getElementById('showNotification');
const comment = document.getElementById('exampleFormControlTextarea1')

btn.addEventListener('click', () => {

    showNotification();
});


    function showNotification() {
        Notification.requestPermission().then(perm => {
                if (perm === "granted") {
                    let notification = new Notification('Comentário enviado com sucesso');
                }
            });
        }
