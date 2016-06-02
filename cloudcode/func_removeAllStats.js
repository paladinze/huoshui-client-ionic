var query = new AV.Query('Stats');
query.find({
  success: function(results) {

    AV.Object.destroyAll(results).then(function(success) {

    }, function(error) {

    });

  },
  error: function() {

  }
});
