function userSignUp(){
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

            const response = axios.post ("http://localhost:4000/user/signup", obj)

            if(response === 201){
                // window.location.href="./user/login.html";
                alert('User signed up successfully')
            }
            else{
                throw new Error('Failed to login');
            }
    }
    catch(err){
        document.body. innerHTML += `<div style="color;red; ">${err} <div>` ;
    }
}