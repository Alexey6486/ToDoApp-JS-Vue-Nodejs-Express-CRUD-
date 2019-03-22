Vue.component('completedtasks', {

    data: function() {
        return {
            completedTasks: [],
            isVisibleHistory: false
        }
    },

    created() {
        this.$parent.getJson('/api/history')
          .then(data => {
              for (let item of data) {
                  this.$data.completedTasks.push(item);
              }
          });
    },

    methods: {
        fixTime: function () {

            let date = new Date();
            let hours = date.getHours() + '';
            let minutes = date.getMinutes() + '';
            let seconds = date.getSeconds() + '';
            let weekDay = date.getDay() + '';
            let dates = date.getDate() + '';
            let months = date.getMonth() + '';

            if (hours.length < 2) {
                hours = '0' + hours;
            }
            if (minutes.length < 2) {
                minutes = '0' + minutes;
            }
            if (seconds.length < 2) {
                seconds = '0' + seconds;
            }
            if (dates.length < 2) {
                dates = '0' + dates;
            }

            const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const monthsName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            let formatedTime = dates + ' ' + monthsName[months] + ', ' + weekDays[weekDay] + ' ' + hours + ':' + minutes + ':' + seconds;

            return formatedTime;

        },

        removeFromHistory: function(item) {
            let find = this.completedTasks.find(product => product.plan === item.plan);
            this.$parent.deleteJson(`/api/history`, item)
              .then(data => {
                  if (data.result === 1) {
                      this.completedTasks.splice(this.completedTasks.indexOf(find), 1);
                  }
              });
        },


        showHistory: function() {
            return this.isVisibleHistory = !this.isVisibleHistory
        },
    },

    template: `
<div :class="[isVisibleHistory ? 'historyblockwrapper' : 'invisible']">
    <ul id="ul-list">
        <linkToFinishedTasks  
        v-for="item of completedTasks"
        :key="item.plan"
        :link-to-task="item"
        @link-to-method="removeFromHistory">
        </linkToFinishedTasks>
    </ul>

</div>`
});

Vue.component('linkToFinishedTasks', {
    props: ['linkToTask'],

    data: function() {
        return {
            isVisibleComment: false
        }
    },

    methods: {
        showComment: function() {
            return this.isVisibleComment = !this.isVisibleComment;
        },
    },

    template: `
<li id="historytask">
    <p>{{ linkToTask.plan }} ({{ linkToTask.time }})</p>
    <button id="btn-priority"
    type="button"
    @click="showComment()">
    cm
    </button>
    <button id="btn-del"
    type="button"
    @click="$emit('link-to-method', linkToTask)">
    del
    </button>
    <textarea :class="[isVisibleComment ? 'comment' : 'invisible']" v-model="linkToTask.note">{{linkToTask.note}}</textarea>
</li> 
    `
});