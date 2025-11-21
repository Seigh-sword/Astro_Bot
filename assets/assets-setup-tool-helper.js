let _ASTRO_ASSETS_CACHE = null;

/**
 * Fetches the assets JSON and caches it globally
 * @returns {Promise<Object>} assets object with full paths
 */
export async function getAssets() {
    if (_ASTRO_ASSETS_CACHE) return _ASTRO_ASSETS_CACHE;

    try {
        const res = await fetch("assets-setup-tool.json"); // <- just JSON in same folder
        if (!res.ok) throw new Error("Failed to load assets JSON");

        const assets = await res.json();

        // No extra folder path prepended because helper is inside assets/
        _ASTRO_ASSETS_CACHE = assets; // cache globally
        return assets;
    } catch (err) {
        console.error("Error loading assets:", err);
        return {};
    }
}

/**
 * Sets the src of an img element by asset name
 * @param {string} elementId - ID of the img element
 * @param {string} assetName - Name of the asset in the JSON
 */
export async function setAssetImg(elementId, assetName) {
    const assets = await getAssets();
    const img = document.getElementById(elementId);
    if (!img) {
        console.warn(`No element found with ID: ${elementId}`);
        return;
    }
    if (!assets[assetName]) {
        console.warn(`No asset found with name: ${assetName}`);
        return;
    }
    img.src = assets[assetName]; // <-- path is correct relative to helper
}

/**
 * Utility: Get an asset URL by name
 * @param {string} assetName - Name of the asset
 * @returns {Promise<string|null>} - URL to the asset or null
 */
export async function getAssetUrl(assetName) {
    const assets = await getAssets();
    return assets[assetName] || null;
}
