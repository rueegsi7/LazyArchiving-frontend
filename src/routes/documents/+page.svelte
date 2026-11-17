<!-- frontend/src/routes/documents/+page.svelte -->
<script>
    import { enhance } from "$app/forms";

    let { data, form } = $props();
    let { user, isAuthenticated, documents, currentPage, nrOfPages } = $derived(data);

    const pageSize = 4;
</script>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
    <h1>All Documents</h1>
    <a href="/documents/new" class="btn btn-success">+ New Document</a>
</div>


<table class="table">
    <thead>
        <tr>
            <th scope="col">Filename</th>
            <th scope="col">Generated Title</th>
            <th scope="col">Size (MB)</th>
            <th scope="col">State</th>
            <th scope="col">Owner (Email)</th>
            <th scope="col">Actions</th>
        </tr>
    </thead>
    <tbody>
        {#each documents as doc}
            <tr>
                <td>{doc.originalFilename}</td>
                <td>{doc.generatedTitle || '-'}</td>
                <td>{doc.fileSizeMb || 0}</td>
                <td>{doc.state}</td>
                <td>{doc.ownerAuth0Id || ''}</td>
                <td>
                    {#if doc.state === "COMPLETED"}
                        <span class="badge bg-secondary">Done</span>
                    {:else if doc.state === "PROCESSING"}
                        <span class="badge bg-secondary">Assigned</span>
                        {#if user && doc.ownerAuth0Id === user.email}
                            <form
                                method="POST"
                                action="?/completeMyDocument"
                                use:enhance
                                style="display: inline; margin-left: 0.5rem;"
                            >
                                <input type="hidden" name="documentId" value={doc.id} />
                                <button type="submit" class="btn btn-primary btn-sm">
                                    Complete Document
                                </button>
                            </form>
                        {/if}
                    {:else if !doc.ownerAuth0Id}
                        <form
                            method="POST"
                            action="?/assignToMe"
                            use:enhance
                            style="display: inline;"
                        >
                            <input type="hidden" name="documentId" value={doc.id} />
                            <button type="submit" class="btn btn-primary btn-sm">
                                Assign to me
                            </button>
                        </form>
                    {/if}
                </td>
            </tr>
        {/each}
    </tbody>
</table>

<nav>
    <ul class="pagination">
        {#each Array(nrOfPages) as _, i}
            <li class="page-item">
                <a
                    class="page-link"
                    class:active={currentPage == i + 1}
                    href="/documents?pageNumber={i + 1}&pageSize={pageSize}"
                >
                    {i + 1}
                </a>
            </li>
        {/each}
    </ul>
</nav>

<style>
    .page-link:focus {
        box-shadow: none;
    }
</style>