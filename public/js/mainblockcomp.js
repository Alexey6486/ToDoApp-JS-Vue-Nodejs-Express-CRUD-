Vue.component('mainblock', {

	data: function() {
		return {
			listOfPlans: [],
            searchedPlans: [],
            value: ''
		}
	},

	created() {
	    this.$parent.getJson('/api/tasks')
	      .then(data => {
		        for (let item of data) {
		          this.$data.listOfPlans.push(item);
		          this.$data.searchedPlans.push(item);
		        }
	      });

    },

    computed: {
        remaining: function() {
            return this.listOfPlans.length;
        }
    },

	methods: {

        removePlan: function(item) {
          let find = this.listOfPlans.find(product => product.plan === item.plan);

          let doneTime = this.$parent.$refs.reftofintasks.fixTime();
          item.time = doneTime;

          this.$parent.postJson('/api/history', item)
            .then(data => {
              if(data.result === 1){
                  this.$parent.$refs.reftofintasks.completedTasks.push(item);
              }
            });

          this.$parent.deleteJson(`/api/tasks`, item)
            .then(data => {
              if (data.result === 1) {
                  this.listOfPlans.splice(this.listOfPlans.indexOf(find), 1);
                  this.searchedPlans.splice(this.searchedPlans.indexOf(find), 1);
                }
            });
        },

        addPlan: function(value) {
            let plan = {"plan": value, "priority": false, "time": "", "note": ""};
            this.$parent.postJson('/api/tasks', {"plan": value, "priority": false, "time": "", "note": ""})
                .then(data => {
                    if(data.result === 1){
                        this.listOfPlans.push(plan);
                        this.searchedPlans.push(plan);
                    }
                });
            this.value = '';
        },

        filter: function(value, event) {
            const regexp = new RegExp(value, 'i');
            this.searchedPlans = this.listOfPlans.filter(el => regexp.test(el.plan));
        },

        changePriority: function(item, $event) {
            let find = this.listOfPlans.find(el => el.plan === item.plan);

            if ($(event.target).attr('class') === 'red') {
                this.$parent.putJson(`/api/tasks/${find.plan}`, item)
                  .then(data => {
                      if(data.result === 1){
                          item.priority = false;
                      }
                  })

            } else if ($(event.target).attr('class') === 'grey') {
                this.$parent.putJson(`/api/tasks/${find.plan}`, item)
                  .then(data => {
                      if(data.result === 1){
                          item.priority = true;
                      }
                  })
            }
        },

	},

	template: `
<div class="mainblockwrapper">   
    <div id="history-btn">
        <h3 v-show="remaining">Tasks left: {{ remaining }}</h3>
        <button id="btn-add" type="button" @click="$parent.$refs.reftofintasks.showHistory()">History</button>
    </div>
    <div id="wrap-ul">      
        <ul v-if="listOfPlans.length"
        id="ul-list">
            <linkToSecondComp  
            v-for="item of searchedPlans"
            :key="item.plan"
            :link-to-item="item"
            @link-to-method-remove="removePlan"
            @link-to-method-priority="changePriority">
            </linkToSecondComp>
        </ul>
        <p v-else>Have nothing to do? Really?</p>
    </div>
    <div id="wrap-form">
        <form action="#" @submit.prevent="addPlan(value)">
            <input id="input-field" type="text" v-model="value">
            <button id="btn-add" type="submit">add</button>
        </form>
    </div>
</div>`

});

Vue.component('linkToSecondComp', {
    data: function() {
        return {
            isVisibleComment: false
        }
    },

  props: ['linkToItem', 'textAreas'],

    methods: {
        showComment: function() {
            return this.isVisibleComment = !this.isVisibleComment;
        },
    },

  template: `
<li>
    <p>{{ linkToItem.plan }}</p>
    <button id="btn-priority"
    type="button"
    @click="$emit('link-to-method-priority', linkToItem)" 
    :class="[!linkToItem.priority ? 'grey' : 'red']">
    !!!
    </button>
    <button id="btn-priority"
    type="button"
    @click="showComment">
    cm
    </button>
    <button id="btn-del"
    type="button"
    @click="$emit('link-to-method-remove', linkToItem)">
    done
    </button>

    <textarea :class="[isVisibleComment ? 'comment' : 'invisible']" placeholder="Add comment if you need..." v-model="linkToItem.note">{{linkToItem.note}}</textarea>

</li>`

});


