export class AppConstants {

    public static get baseServidor(): string {
       // return "https://huber-restful.herokuapp.com/"
       return "http://localhost:8080/"
    }

    public static get baseLogin(): string {
        return this.baseServidor + "curso_apirest/login"
    }

    public static get baseUserController(): string {
        return this.baseServidor + "curso_apirest/userSystem/"
    }
}
