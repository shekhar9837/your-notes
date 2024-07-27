export const validateEmail =(email)=>{
    const regex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return regex.test(email);
}

export const getInitials = (name)=>{
    if(!name) return "";

    const words = name.split(" ")
    let initial = ""

    for(let i=0; i< Math.min(words.length, 2); i++){
        initial += words[i][0]
    }
    return initial.toUpperCase();
}