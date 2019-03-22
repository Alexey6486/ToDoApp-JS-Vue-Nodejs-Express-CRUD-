const app = new Vue({

	el: '#app',

	methods: {

	    getJson: function(url)  {
	      return fetch(url)
	        .then(result => result.json())
	        .catch(error => {
	          console.log('error');
	        });
	    },

        postJson: function(url, data){
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)

            })
              .then(result => result.json())
              .catch(error => {
                  console.log('error');
              });
        },

        putJson: function(url, data){
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
              .then(result => result.json())
              .catch(error => {
                  console.log('error');
              });
        },

        deleteJson: function(url, data){
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
              .then(result => result.json())
              .catch(error => {
                  console.log('error');
              });
        },

  	},

});