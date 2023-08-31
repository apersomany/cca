const BASE = "https://script.google.com/macros/s/AKfycbwGIDN-dQ9Pb1bPRlSRRMkHM03p73zGCHqCMSITHjy_SwRUEpEHkV2aQAmGvSkKqc3nrw/exec";

export async function GET({ url }) {
    const response = await fetch(BASE + url.search);
    if (response.ok) {
        return new Response("success", { status: response.status });
    } else {
        return new Response("failure", { status: response.status });
    }
}
