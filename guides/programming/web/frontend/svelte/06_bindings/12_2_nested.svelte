<script>
    let data = $state(Math.trunc(Math.random() * 100));

    // you need to export things you want to use outside this component
    export function genNumber() {
        data =  Math.trunc(Math.random() * 100);
    }
</script>

<p>{data}</p>
