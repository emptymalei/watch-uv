
  var app = new Vue({
    el: '#app',
    data: {
      zipInput: '87106',
      cityFromInput: 'ALBUQUERQUE, NM',
    },
    watch: {
      zipInput: function() {
        this.cityFromInput = ''
        if (this.zipInput.length == 5) {
          this.lookupZip()
        }
      }
    },
    methods: {
      lookupZip: _.debounce(function() {
        var app = this
        app.cityFromInput = "Searching..."
        axios.get('http://ziptasticapi.com/' + app.zipInput)
             .then(function (response) {
                app.cityFromInput = response.data.city + ', ' + response.data.state
             })
             .catch(function (error) {
                app.cityFromInput = "Can not locate"
             })
      }, 500)
    }
  })
