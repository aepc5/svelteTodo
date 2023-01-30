<script>
    import { createEventDispatcher } from "svelte";

    // 
    const dispatch = createEventDispatcher();

    let showAddBtn = false;
    let value = "";

    // This function is called after a key is pressed in the text input field
    function handleKeyUp({key}) {
        // #ControlFlow: if the input field is not empty and the key pressed is not Enter then the showAddBtn variable is set to true otherwise it is set to false
        if (value.length > 0 && key !== "Enter") {
            showAddBtn = true;
        } else {
            showAddBtn = false;
        }

        // if the key pressed is not Enter and the input field is empty then the function stops, otherwise, it will add a new item
        if (key !== "Enter" || value.length === 0) return;
        dispatch("newitem", value);
        value = "";
    }

    // This function is called whenever the 'Add' button is clicked
    function handleButtonClick() {
        // #ControlFlow: if the input field is empty, the function stops, otherwise a new item is added
        if (value.length === 0) return;
        dispatch("newitem", value);
        value = "";
        showAddBtn = false;
    }
</script>

<style>
    form {
        display: flex;
        flex-direction: row;
        border: none;
        padding: 0px;
        margin-bottom: 15px;
        width: 100%;
        background: #16a085;
        cursor: pointer;
        border-radius: 15px;
        transition: all 0.15s;
    }

    input {
        flex-grow: 2;
        border: none;
        margin: 0;
        margin-left: 15px;
        background: none;
        cursor: pointer;
        color: white;
        font-weight: bold;
        font-size: 1em;
        padding: 15px 0;
    }

    input:focus {
        outline: none;
    }

    form:focus-within { 
        outline: 3px solid #34495e;
    }

    button {
        display: none;
        border: none;
        background:#34495e;
        color:white;
        margin: 0;
        margin-right: 6px;
        margin-top: 6px;
        margin-bottom: 6px;
        border-radius: 12px;
        padding: 0 10px;
        cursor: pointer;
        font-weight: bold;
    }

    button:active {
        background: #2c3e50;
    }

    button.showAddBtn {
        display: block;
    }

    form:hover {
        background: #178c75;
    }

    input::placeholder {
        color: #FFFFFF;
    }
</style>

<form onsubmit="return false">
    <input type="text" on:keyup={handleKeyUp} bind:value placeholder="+ Add Item">
    <button type="button" class:showAddBtn on:click={handleButtonClick}>Add</button>
</form>
