<!-- frontend/src/routes/documents/+page.svelte -->
<script>
  import { enhance } from "$app/forms";

  let { data, form } = $props();

  let documents = $derived(data.documents || []);
  let { user, isAuthenticated } = $derived(data);
</script>

<h1 class="mt-3">Create Document</h1>

{#if isAuthenticated && user.user_roles && user.user_roles.includes("admin")}
    <div style="margin-bottom: 1rem;">
        <a href="/documents/new" class="btn btn-success">+ New Document</a>
    </div>
{/if}

{#if form?.success}
  <div class="alert alert-success alert-dismissible fade show" role="alert">
    Document created successfully!
  </div>
{/if}

{#if form?.error}
  <div class="alert alert-danger alert-dismissible fade show" role="alert">
    {form.error}
  </div>
{/if}


<div style="margin-bottom: 1rem;">
    <a href="/documents/new" style="padding: 0.5rem 1rem; background: #28a745; color: white; text-decoration: none; border-radius: 4px;">
        + New Document
    </a>
</div>

<h1>All Documents</h1>
<table class="table">
  <thead>
    <tr>
      <th scope="col">Original Filename</th>
      <th scope="col">Generated Title</th>
      <th scope="col">State</th>
    </tr>
  </thead>
  <tbody>
    {#each documents as doc}
      <tr>
        <td>{doc.originalFilename}</td>
        <td>{doc.generatedTitle || '-'}</td>
        <td>{doc.state}</td>
      </tr>
    {/each}
  </tbody>
</table>