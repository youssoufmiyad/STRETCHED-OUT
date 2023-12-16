import sha256 from 'crypto-js/sha256';

const encrypt = (pwd) => {
    let hashHello = sha256(pwd).words
    let result = ""
    for (let index = 0; index < hashHello.length; index++) {
        result += hashHello[index]

    }
    return result
}

export default encrypt;