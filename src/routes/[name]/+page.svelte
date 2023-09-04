<script>
    import { Input, Label, Button, Select, Spinner } from "flowbite-svelte";
    import "@fontsource/inter";
    import "../../app.postcss";

    export let data;

    let state =
        Number.parseInt(localStorage.getItem(data.name)) > Date.now()
            ? "already"
            : "default";
    let grade = localStorage.getItem("grade");
    let id = localStorage.getItem("id");
    grade = grade ? grade : undefined;
    id = id ? id : undefined;
    let items = ["9", "10", "11", "12"].map((e) => {
        return {
            value: e,
            name: "Grade " + e,
        };
    });

    async function submit() {
        state = "submitting";
        const resp = await fetch("https://ipinfo.io/ip");
        const text = await resp.text();
        if (text == "202.77.101.52") {
            await fetch(`/submit?name=${data.name}&grade=${grade}&id=${id}`);
            state = "submitted";
            localStorage.setItem(
                data.name,
                Date.now() + 6 * 24 * 60 * 60 * 1000
            );
        } else {
            alert(
                [
                    "It seems that you are not at school.",
                    "Please connect to the school wifi and try again.",
                ].join("\n")
            );
            state = "default";
        }
    }
</script>

{#if state == "submitted"}
    Successfully Submitted
{:else if state == "already"}
    Already Submitted
{:else}
    <form on:submit={submit}>
        <div class="mb-6">
            <Label for="grade" class="mb-2">Grade Level</Label>
            <Select
                type="grade"
                id="grade"
                {items}
                required
                on:change={() => localStorage.setItem("grade", grade)}
                bind:value={grade}
            />
        </div>
        <div class="mb-6">
            <Label for="id" class="mb-2">Student ID</Label>
            <Input
                type="text"
                id="id"
                placeholder="12345"
                required
                on:change={() => localStorage.setItem("id", id)}
                bind:value={id}
            />
        </div>
        <Button type="submit" class="w-full">
            {#if state == "submitting"}
                <Spinner class="mr-2" size="4" />
            {/if}
            Submit
        </Button>
    </form>{/if}
