var colorPallete = ['rgb(175,232,116)','rgb(255,230,109)','rgb(255,166,132)','rgb(255,107,107)','rgb(76.54,144)'];
var colorPalletHex = ['#AFE874','#FFE66D','#FFA684','#FF6B6B','#4C3690'];

var warningTextPallete = ['Low','Moderate','High','Very High','Extreme']

function indexFun(locpostal) {

urlJSONOriginal = 'https://iaspub.epa.gov/enviro/efservice/getEnvirofactsUVHOURLY/ZIP/'+locpostal+'/JSON';


urlJSONProxy = 'https://json-proxy-server.herokuapp.com/?callback=&url=https%3A%2F%2Fiaspub.epa.gov%2Fenviro%2Fefservice%2FgetEnvirofactsUVHOURLY%2FZIP%2F'+locpostal+'%2FJSON';


// urlJSONProxy = 'https://jsonp.afeld.me/?callback=&url=https%3A%2F%2Fiaspub.epa.gov%2Fenviro%2Fefservice%2FgetEnvirofactsUVHOURLY%2FZIP%2F'+locpostal+'%2FJSON';

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

            var showValueasText = []

            for(i=0;i<baryvalue.slice(2,15).length;i++){
              if(baryvalue.slice(2,15)[i]<=2){
                showValueasText.push(warningTextPallete[0])
              } else if(baryvalue.slice(2,15)[i]<=5) {
                showValueasText.push(warningTextPallete[1])
              } else if(baryvalue.slice(2,15)[i]<=7){
                showValueasText.push(warningTextPallete[2])
              } else if(baryvalue.slice(2,15)[i]<=10){
                showValueasText.push(warningTextPallete[3])
              } else {
                showValueasText.push(warningTextPallete[4])
              }
            }


            var colorFunction = []

            for(i=0;i<baryvalue.slice(2,15).length;i++){
              if(baryvalue.slice(2,15)[i]<=2){
                colorFunction.push(colorPallete[0])
              } else if(baryvalue.slice(2,15)[i]<=5) {
                colorFunction.push(colorPallete[1])
              } else if(baryvalue.slice(2,15)[i]<=7){
                colorFunction.push(colorPallete[2])
              } else if(baryvalue.slice(2,15)[i]<=10){
                colorFunction.push(colorPallete[3])
              } else {
                colorFunction.push(colorPallete[4])
              }
            }


            var barplotdata = [{
              x: barxlabel.slice(2,15),
              y: baryvalue.slice(2,15),
              type: 'bar',
              text: showValueasText,
              marker: {
                  color: colorFunction,//['rgb(0,0,0)','rgb(255,0,0)','rgb(0,0,0)','rgb(0,0,0)','rgb(0,0,0)','rgb(255,0,0)'],
                  opacity: 0.9
                }
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
