<script>
    import { items } from "../stores";

    //#Reactive: itemCount updates everytime the items store updates
    $: itemCount = $items.length;
    //#Reactive: completedItemCount updates everytime the items store updates
    $: completedItemCount = $items.filter(item => item.completed).length;
</script>

<style>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        color: white;
        font-weight: 900;
        font-size: 1.5em;
        background-color: rgba(0,0,0,0.1);
        border-radius: 18px;
    }
</style>

<div class="header">
    <span>Todo List</span>
    <span>{completedItemCount}/{itemCount}</span>
</div>