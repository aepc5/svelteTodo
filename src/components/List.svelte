<script>
    import { onMount } from "svelte";
    import {v4 as uuidv4 } from "uuid";
    import { items } from "../stores";
    import TodoApi from "../TodoApi";
    import Item from "./Item.svelte";
    import NewItem from "./NewItem.svelte";

    // Called when a new item is added, the function adds the new item to the beginning of the items store
    function handleNewItem(e) {
        $items = [
            {
                id: uuidv4(),
                text: e.detail,
                completed: false
            },
            ...$items
        ];

        TodoApi.save($items);
    }

    //Function finds the item being updated and updates it
    function handleUpdate(e) {
        const index = $items.findIndex(item => item.id === e.detail.id);
        $items[index] = e.detail;

        TodoApi.save($items);
    }

    // Function deletes the item
    function handleDelete(e) {
        $items = $items.filter(item => item.id !== e.detail);

        TodoApi.save($items);
    }

    // ItemsSorted is an array which will be a sorted version of the items store
    let itemsSorted = [];

    let listEmpty = true;
    // #Reactive: listEmpty updates everytime itemsSorted is updated
    $: listEmpty = itemsSorted.length <= 0;

    // #Reactive: itemsSorted updates everytime the items store is updated
    $: {
        itemsSorted = [...$items]
        itemsSorted.sort((a, b) => {
            // #ControlFlow: These if statements tell the sorting algorithm how to compare different items,
            // in this case, items that have been completed are sent to the bottom of the list
            if (a.completed && b.completed) return 0;
            if (a.completed) return 1;
            if (b.completed) return -1;
        });
    }

    // The onMount function runs whne the component is first rendered on the DOM
    // #Async: This function asynchronously calls the TodoApi which fetches the items in local storage and stores them in the items store
    onMount(async () => {
        $items = await TodoApi.getAll();
    });
</script>

<style>
    .list {
        padding: 15px;
        border-radius: 15px;
    }

    .list-items {
        border-radius: 15px;
        background: white;
        overflow: hidden;
    }

    .list-items.listEmpty {
        background: none;
    }

    .list-status {
        margin: 15px 0;
        text-align: center;
        color: #ffffff;
        font-weight: bold;
        font-size: 1.1em;
    }
</style>

<div class="list">
    <!-- #Component: NewItem is a component that has its own svelte file -->
    <NewItem on:newitem={handleNewItem} />
    <div class="list-items" class:listEmpty>
        <!-- #ControlFlow: the each tag iterates through the itemsSorted array and adds each item to the DOM -->
        {#each itemsSorted as item (item)}
            <!-- #Component: Item is a component that has its own svelte file -->
            <Item {...item} on:update={handleUpdate} on:delete={handleDelete} />
        <!-- #ControlFlow: In case the itemsSorted array is empty there will be text saying that -->
        {:else}
            <p class="list-status">No Items Exist</p>
        {/each}
    </div>
</div>