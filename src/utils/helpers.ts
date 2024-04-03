export function getLastQueryParamValueFromUrl(url: string): string | null {
    const urlParams = new URLSearchParams(url);
    const keys = Array.from(urlParams.keys());
    const lastKey = keys[keys.length - 1];
    return urlParams.get(lastKey);
}
