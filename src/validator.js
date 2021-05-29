export function validateEmail(value) {
    const symbl = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var user = JSON.parse(localStorage.getItem('USER_DETAILS'))
    var checkEmail = user && user.find(o => o.Email === value);
    if (symbl.test(value) === false) {
         return [true, "Invalid Email Address"]
    }
    else if (checkEmail !== undefined && checkEmail !== null) {
         return [true, "Email already exist"]
    }
    else
         return [false, ""]
}
export function validatePassword(value) {
    // var user = JSON.parse(localStorage.getItem('USER_DETAILS'))
    const symbl = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if (symbl.test(value) === false)
         return [true, "Password should contain minimum 8 letters and a special character"]
    else
         return [false, ""]
}
export function validateUsername(value) {
    var user = JSON.parse(localStorage.getItem('USER_DETAILS'))
    var checkUsername = user && user.find(o => o.UserName === value);
    if (checkUsername)
         return [true, "Username already exist"]
    else
         return [false, ""]
}