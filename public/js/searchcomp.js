Vue.component('searchdiv', {

    data: function() {
        return {
            serachFieldValue: ''
        }
    },

	template: `
<div id="wrap-search">
    <form id="search-field" action="#" @submit.prevent="$parent.$refs.reftomainblock.filter(serachFieldValue)">
        <input type="rext" placeholder="Type to search" v-model="serachFieldValue">
    </form>
</div>`

})
