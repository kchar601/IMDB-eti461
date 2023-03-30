def check_user():
    const email = document.getElementById("email").value;
    const pswd = document.getElementById("pswd").value;

    result = user.find_one({'User':"'"+email+"'"})

    if result == //pathTo"User.user"/:
        console.log("user exist")
        return true
    else:
        console.log("user dont exist")
        return false