const BASE = "https://script.google.com/macros/s/AKfycbxfLPy3odruLz47mjopCxIpvHo5XAoMXMZDufpySR6KFx-IsQgknDLg4Rm_K3ZgzxHbYQ/exec";

export async function GET({ url }) {
    const response = await fetch(BASE + url.search);
    if (response.ok) {
        return new Response("success", { status: response.status });
    } else {
        return new Response("failure", { status: response.status });
    }
}
