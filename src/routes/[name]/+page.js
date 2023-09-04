export const ssr = false;
export function load({ params }) {
    return {
        name: params.name
    };
}