$(document).ready(function() {
  $("#page-whole").hide().fadeIn("fast")

  $("#discribtion").hide().fadeOut("fast").fadeIn("slow")

  $(".col-xs-6").hide().fadeOut("fast").fadeIn("slow")


    $("#content").hide()

    $("#salTable").hide()

    $('#btn, #btnAll').click(function() {

        $("#content").show()

        var userJob = $("#userJob").val()

        var userLocation = $("#userLocation").val()

        // hit api with salarys based on the users input for job descrition
        $.ajax(`http://api.glassdoor.com/api/api.htm?t.p=118427&t.k=dq41qyTMppO&userip=10.0.0.125&useragent=Mozilla/5.0&format=json&v=1&action=jobs-prog&countryId=1&jobTitle=${userJob}`)
            .then(function(salary) {
              console.log("Salary API=== ", salary);

                var sjt= salary.response.jobTitle;
                var high = salary.response.payHigh;
                var low = salary.response.payLow;
                var med = salary.response.payMedian;
                var cash= salary.response.payCurrencyCode;

                $("#header2").append(`${sjt} Salarys`)
                if (high != "") {
                  $("#high").append(`<li>${high} ${cash}</li>`)
                  $("#salTable").show()
                }if (med != "") {
                  $("#med").append(`<li>${med} ${cash}</li>`)
                  $("#salTable").show()
                }if (low != "") {
                  $("#low").append(`<li>${low} ${cash}</li>`)
                  $("#salTable").show()
                }
                else {
                  console.log("undefined");
                }

        // hit api with user inputs and return list of jobs in location
        $.ajax(`http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=${userJob}&city=${userLocation}&age=30&sort=1&pgcnt=500`)
            .then(function(jobs) {
              console.log("JOBS API=== ",jobs);
                var myJobData = jobs.resultItemList
                for (var i = 0; i < myJobData.length; i++) {
                    var job = myJobData[i];
                    var company = job.company;
                    var date = job.date;
                    var url = job.detailUrl;
                    var title = job.jobTitle;
                    var location = job.location;

                    $("#title").append(`<li>${title}<hr></li>`)
                    $("#name").append(`<li>${company}<hr></li>`)
                    // $("#date").append(`<li>${date}<hr></li>`)
                    $("#location").append(`<li>${location}<hr></li>`)
                    // $("#apply").append(`<li>${url}<hr></li>`)
                    $("#apply").append(`<li><a href="${url}">Apply Here</a><hr></li>`)

        }
      })
    })
  })
  $("#btnNewPage").click(function () {
    $.ajax(`http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=${userJob}&city=${userLocation}&age=30&sort=1&pgcnt=500&page=2`)
        .then(function(jobsP2) {
          console.log("JOBS API NUMBER 2 === ",jobs);
            var myJobDataP2 = jobsP2.resultItemList
            for (var i = 0; i < myJobDataP2.length; i++) {
                var jobP2 = myJobData[i];
                var companyP2 = jobP2.company;
                var dateP2 = jobP2.date;
                var urlP2 = jobP2.detailUrl;
                var titleP2 = jobP2.jobTitle;
                var locationP2 = jobP2.location;

                $("#titleP2").append(`<li>${title}<hr></li>`)
                $("#nameP2").append(`<li>${company}<hr></li>`)
                // $("#date").append(`<li>${date}<hr></li>`)
                $("#locationP2").append(`<li>${location}<hr></li>`)
                // $("#apply").append(`<li>${url}<hr></li>`)
                $("#applyP2").append(`<li><a href="${url}">Apply Here</a><hr></li>`)

            }
          })
        })
      })
