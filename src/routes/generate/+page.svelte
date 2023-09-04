<script>
    import { Input } from "flowbite-svelte";
    import "@fontsource/inter";
    import "../../app.postcss";
    import QRCode from "qrcode";

    let canvas;
    let link = "";
    let name;

    function render() {
        link = "https://cca.aperso.dev/" + btoa(name);
        QRCode.toCanvas(canvas, link);
    }
</script>

<canvas style="width: 148px; height: 148px;" bind:this={canvas} />
<div class="mb-6">{link}</div>
<Input
    style="width: 300px"
    placeholder="Code Club"
    on:change={render}
    bind:value={name}
/>
