export class Service{

    constructor(){}

    async registerUser({firstName, lastName, username, email, mobileNumber, password}){
        try {
            // user register api call
            // return await ------
        } catch (error) {
            console.log("Registration Error:: ",error);
        }
    }

    async loginUser({email, password}){
        try {
            // user login api call
        } catch (error) {
            console.log("Login Error:: ", error);
        }
    }

    async uploadVideo(){
        try {
            // upload video api call
        } catch (error) {
            console.log("Upload Error:: ",error);
        }
    }
}

const service = new Service()

export default service