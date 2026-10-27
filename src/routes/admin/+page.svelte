<script>
    let { data } = $props();
    let { user, isAuthenticated, allDocuments, stats } = $derived(data);
</script>

{#if isAuthenticated && user.user_roles && user.user_roles.includes("admin")}
    <h1>Admin Dashboard – Systemverwaltung</h1>

    <h3>System-Statistiken (Alle Dokumente nach Status)</h3>
    <ul>
        {#each Object.entries(stats) as [state, count]}
            <li><b>{state}:</b> {count} Dokumente</li>
        {/each}
    </ul>

    <h3>Alle Benutzer-Dokumente im System</h3>
    <table class="table">
        <thead>
            <tr>
                <th>Owner (Auth0 ID)</th>
                <th>Filename</th>
                <th>Generated Title</th>
                <th>State</th>
            </tr>
        </thead>
        <tbody>
            {#each allDocuments as doc}
                <tr>
                    <td>{doc.ownerAuth0Id}</td>
                    <td>{doc.originalFilename}</td>
                    <td>{doc.generatedTitle}</td>
                    <td>{doc.state}</td>
                </tr>
            {/each}
        </tbody>
    </table>
{:else}
    <p>Zugriff verweigert. Diese Seite ist nur für Administratoren sichtbar.</p>
{/if}