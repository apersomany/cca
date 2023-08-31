<script>
    import { Input, Label, Button, Select, Spinner } from "flowbite-svelte";
    let state = "default";
    let grade;
    let id;
    let items = ["9", "10", "11", "12"].map((e) => {
        return {
            value: e,
            name: "Grade " + e,
        };
    });

    async function submit() {
        state = "submitting";
        await fetch(`/submit?grade=${grade}&id=${id}`);
        state = "submitted";
    }
</script>

{#if state == "submitted"}
    Successfully Submitted
{:else}
    <form on:submit={submit}>
        <div class="mb-6">
            <Label for="grade" class="mb-2">Grade Level</Label>
            <Select type="grade" id="grade" {items} required bind:value={grade} />
        </div>
        <div class="mb-6">
            <Label for="id" class="mb-2">Student ID</Label>
            <Input type="text" id="id" placeholder="12345" required bind:value={id} />
        </div>
        <Button type="submit" class="w-full">
            {#if state == "submitting"}
                <Spinner class="mr-2" size="4" />
            {/if}
            Submit
        </Button>
    </form>{/if}

<style>
    :global(body) {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        margin: 0px;
    }
</style>
