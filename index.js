const backgroundImage = document.querySelector('.background-image');
const usersContainer = document.querySelector('.users-container');

window.addEventListener("scroll", ()=> {
    let offset = window.pageYOffset;
    backgroundImage.style.backgroundPositionY = `${offset * 0.5}px`;
});


const showUsers = (users) => {
    usersContainer.innerHTML = '';
    users.forEach((user, i) => {
        const userEl = document.createElement('div');
        userEl.classList.add('user');
        userEl.innerHTML = `
        <h3>User Nr. ${i+1}</h3>
        <div class="user-info">
            <span><u>Name:</u> ${user.name.first} ${user.name.last}</span>
            <span><u>E-Mail Address: </u> ${user.email}</span>
            <span><u>Phone Number: </u> ${user.phone}</span>
            <span><u>Street:</u> ${user.location.street.name}</span>
            <span><u>City:</u> ${user.location.city}</span>
            <span><u>Zipcode:</u> ${user.location.postcode}</span>
        </div>
        `;
        usersContainer.appendChild(userEl);
    })
};


const getUsers = async() => {
    try{
        const res = await fetch('https://randomuser.me/api/?results=9');
        const data = await res.json();
        const {results} = data;
        showUsers(results);
    } catch(err){
        console.log(err);
    }
}
getUsers();


const checkUsers = () => {
    const triggerBottom = window.innerHeight / 5 * 4
    const users = document.querySelectorAll('.user')
    users.forEach((user, i) => {
        const userTop = user.getBoundingClientRect().top;
        if(userTop < triggerBottom) {
            user.classList.add('show');
        } else {
            user.classList.remove('show');
        };
        user.style.transitionDelay = `${i * 0.2}s`
    });
};

window.addEventListener('scroll', checkUsers);
