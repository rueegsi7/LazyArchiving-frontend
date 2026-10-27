<script>

    let { data, children } = $props();
    let { user, isAuthenticated } = $derived(data);
</script>

<nav class="navbar navbar-expand-lg bg-light" style="padding: 1rem; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between;">
    <div style="display: flex; gap: 1rem; align-items: center;">
        <a class="navbar-brand" href="/" style="font-weight: bold; text-decoration: none;">LazyArchiving</a>
        
        {#if isAuthenticated}
            <a class="nav-link" href="/documents">Documents</a>
            <a class="nav-link" href="/account">Account</a>
        {/if}
    </div>

    <div class="d-flex" style="display: flex; gap: 0.5rem; align-items: center;">
        {#if isAuthenticated}
            <span class="navbar-text me-2">{user.name}</span>
            <form method="POST" action="/logout" style="display: inline;">
                <button type="submit" class="btn btn-primary">Log Out</button>
            </form>
        {:else}
            <a href="/login" class="btn btn-primary me-2">Login</a>
            <a href="/signup" class="btn btn-outline-primary">Sign Up</a>
        {/if}
    </div>
</nav>

<div class="container mt-3">
    {@render children()}
</div>