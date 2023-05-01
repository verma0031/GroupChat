async function userSignUp(){
    try{
        console.log("adding user");
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;

            const obj ={
                name,
                email,
                phone,
                password
            };

            console.log(obj);

            const response = await axios.post ("http://localhost:4000/user/signup", obj)

            if(response.status === 201){
                alert('User signed up successfully')
                // window.location.href="/login.html";
            }
            else{
                throw new Error('Failed to login');
            }
    }
    catch(err){
        document.body. innerHTML += `<div style="color;red; ">${err} <div>` ;
    }
}


function login(e) {
    e.preventDefault();
    console.log(e.target.name);

    const loginDetails = {
        email: e.target.email.value,
        password: e.target.password.value

    }
    console.log(loginDetails)
    axios.post('http://localhost:4000/user/login',loginDetails).then(response => {
        alert(response.data.message)

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userDetails', JSON.stringify(response.data.user))

            window.location.href = "/user/chatapp.html"
    }).catch(err => {
        console.log(JSON.stringify(err))
        document.body.innerHTML += `<div style="color:red;">${err.message} <div>`;
    })
}