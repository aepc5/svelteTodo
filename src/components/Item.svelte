<script>
    import { createEventDispatcher } from "svelte";
    // #Prop: allows the parent component to access these variables
    export let id, text, completed;

    // #EventHandler: Dispatch is used to call functions in parent container
    const dispatch = createEventDispatcher();

    // Called when an item is updated
    function triggerUpdate() {
        dispatch("update", {id, text, completed});
    }

    // This function is called whenever an item  is doubleclicked or when the trash button is clicked
    function handleDelete() {
        // The user will be prompted by the browser to confirm they want to delete the item
        const yes = confirm("Are you sure you want to delete this item?")

        // #controlFlow: if the 'yes' variable is true then the item will be deleted
        if (yes) {
            dispatch("delete", id);
        }
    }
</script>

<style>
    .item {
        display: flex;
        align-items: center;
        padding: 15px;
        border-bottom: 1px solid #ecf0f1;
    }

    .item:last-child {
        border: none;
    }

    .item.completed {
        background: #ecf0f1;
    }

    .item.completed .text-input {
        color: #bdc3c7;
        text-decoration: line-through;
    }

    .item:focus-within {
        background: rgba(26, 188, 156,0.25);
    }

    .text-input {
        flex-grow: 1;
        background: none;
        border: none;
        outline: none;
        font-weight: 500;
        font-size: 1em;
        margin: 0;
    }

    .trash {
        background-color: #95a5a6;
        border: none;
        cursor: pointer;
        -webkit-mask: url('/assets/trashIcon.svg') no-repeat center;
        mask: url('/assets/trashIcon.svg') no-repeat center;
        width: 18px;
        margin: 0;
        margin-left: 12px;
        padding: 0;
        transition: background-color 0.15s;
    }

    .trash:hover {
        background-color: #e74c3c;
    }

    .completed-checkbox {
        margin: 0;
        margin-left: 15px;
    }

    input[type="checkbox"] {
        -webkit-appearance: none;
        appearance: none;
        margin: 0;
        color: #95a5a6;
        width: 1.15em;
        height: 1.15em;
        border: 2px solid #95a5a6;
        border-radius: 0.25em;
        cursor: pointer;
        display: grid;
        place-content: center;
    }

    input[type="checkbox"]:checked {
        background-color: #34495e;
        border: none;
    }

    input[type="checkbox"]::before {
        content: "";
        width: 0.65em;
        height: 0.65em;
        clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
        transform: scale(0);
        box-shadow: inset 1em 1em #1abc9c;
        background-color: #1abc9c;
    }

    input[type="checkbox"]:checked::before {
        transform: scale(1);
    }
</style>

<div class="item" class:completed on:dblclick={handleDelete}>
    <input 
        class="text-input" 
        type="text" 
        bind:value={text} 
        readonly={completed} 
        on:keyup={({key, target}) => key === 'Enter' && target.blur()}
        on:blur={() => triggerUpdate()} />
    
    <input 
        class="completed-checkbox" 
        type="checkbox" 
        bind:checked={completed} 
        on:change={() => triggerUpdate()} />
    
    <input class="trash" on:click={handleDelete} type="button" />
</div>