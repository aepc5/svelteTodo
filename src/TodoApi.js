export default class TodoApi {
    // #Async: This function asynchronously fetches the items in local storage and returns them
    static async getAll() {
        return JSON.parse(localStorage.getItem("todo-list") || "[]");
    }

    // #Async: This function asynchronously saves an array of items to local storage
    static async save(items) {
        localStorage.setItem("todo-list", JSON.stringify(items));
    }
}