<script>
	import PackageInfo from './03_2_nested.svelte';

	const pkg = {
		name: 'svelte',
		version: 5,
		description: 'blazing fast',
		website: 'https://svelte.dev'
	};

</script>

<!-- 1. since PackageInfo component expects the same amount and names of props inside its
        its component, we need to give it explicitly, but there could be a way to just give
        the whole object since it has at least N defined props which have the same name
        and are expected by the PackageInfo component, right ? -->
<PackageInfo
    name={pkg.name}
	version={pkg.version}
	description={pkg.description}
	website={pkg.website}
/>

<!-- 2. yes, there is, its called "spread operator" -->
<PackageInfo {...pkg} />
<!-- 2.1 do not do this, it will not work, its for attribute binding of the same name,
         its not an error and component will render but without the props values -->
<PackageInfo {pkg} />
