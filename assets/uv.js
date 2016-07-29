function indexFun(locpostal) {

urlJSONOriginal = 'https://iaspub.epa.gov/enviro/efservice/getEnvirofactsUVHOURLY/ZIP/'+locpostal+'/JSON';

urlJSONProxy = 'https://jsonp.afeld.me/?callback=&url=https%3A%2F%2Fiaspub.epa.gov%2Fenviro%2Fefservice%2FgetEnvirofactsUVHOURLY%2FZIP%2F'+locpostal+'%2FJSON';

var html='';
var barxlabel = [];
var baryvalue = [];



$(document).ready(function() {
    $.ajax({
        url: urlJSONProxy,
        type: "GET",
        crossDomain: true,
        dataType: "json",
        success: function(data) {
        for(entry=0; entry < data.length;entry++) {
            var order = data[entry]['ORDER'];
            var timestp = data[entry]['DATE_TIME'];
            var value = data[entry]['UV_VALUE'];
            var zipvalue = data[entry]['ZIP'];

              barxlabel.push(timestp.substr(timestp.length - 5))
              baryvalue.push(value)
             html+='<tr>'+'<td>'+order+'</td>'+'<td>'+timestp+'</td>'+'<td>'+value+'</td>'+'<td>'+zipvalue+'</td>'+'</tr>'
            }
             $('#table-data').empty(); // Empty the table before append
            $("#table-data").append(html);
            $("#categoryDataSourceLink").empty();
            $("#categoryDataSourceLink").append('JSON Data: <a href="https://iaspub.epa.gov/enviro/efservice/getEnvirofactsUVHOURLY/ZIP/'+locpostal+'/JSON">EPA</a>');

            var barplotdata = [{
              x: barxlabel.slice(2,15),
              y: baryvalue.slice(2,15),
              type: 'bar'
            }];
            var layout = {
	               title: 'Hourly UV Index ('+locpostal+')',
	                  showlegend: false};

                Plotly.newPlot('pltlybar', barplotdata,layout,{showLink: false});

        }

    });
});

} // END OF GRAND FUNCTION

function updateButton () {
postalcode = document.getElementById('zipcode').value
indexFun(postalcode)

}
