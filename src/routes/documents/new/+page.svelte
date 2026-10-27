<!-- frontend/src/routes/documents/new/+page.svelte -->
<script>
    import { enhance } from "$app/forms";

    let { form } = $props();
</script>

<div style="max-width: 600px; margin: 2rem auto; font-family: sans-serif;">
    <h1>Create New Document</h1>

    <p><a href="/documents">← Back to Document List</a></p>

    {#if form?.error}
        <div style="color: #721c24; background-color: #f8d7da; padding: 1rem; margin-bottom: 1rem; border-radius: 4px;">
            {form.error}
        </div>
    {/if}

    <form method="POST" action="?/createDocument" use:enhance style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem;">
        <div>
            <label for="originalFilename" style="display: block; font-weight: bold; margin-bottom: 0.5rem;">
                Original Filename *
            </label>
            <input
                id="originalFilename"
                name="originalFilename"
                type="text"
                placeholder="e.g. invoice_2026.pdf"
                required
                style="width: 100%; padding: 0.5rem; box-sizing: border-box;"
            />
        </div>

        <div>
            <label for="state" style="display: block; font-weight: bold; margin-bottom: 0.5rem;">
                State *
            </label>
            <select id="state" name="state" required style="width: 100%; padding: 0.5rem; box-sizing: border-box;">
                <option value="UPLOADED">UPLOADED</option>
                <option value="PROCESSING">PROCESSING</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="FAILED">FAILED</option>
            </select>
        </div>

        <div>
            <label for="generatedTitle" style="display: block; font-weight: bold; margin-bottom: 0.5rem;">
                Generated Title (Optional)
            </label>
            <input
                id="generatedTitle"
                name="generatedTitle"
                type="text"
                placeholder="e.g. 2026-10-20_Tax_Invoice"
                style="width: 100%; padding: 0.5rem; box-sizing: border-box;"
            />
        </div>

        <div>
            <label for="extractedText" style="display: block; font-weight: bold; margin-bottom: 0.5rem;">
                Extracted Text (Optional)
            </label>
            <textarea
                id="extractedText"
                name="extractedText"
                rows="3"
                placeholder="Optional OCR text..."
                style="width: 100%; padding: 0.5rem; box-sizing: border-box;"
            ></textarea>
        </div>

        <button type="submit" style="padding: 0.75rem 1rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
            Create Document
        </button>
    </form>
</div>