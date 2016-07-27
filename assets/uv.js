$(document).ready(function() {
    $.ajax({
        url: "https://iaspub.epa.gov/enviro/efservice/getEnvirofactsUVHOURLY/ZIP/87106/JSON",
        type: "GET",
        rossDomain: true,
        dataType: "json"
    }).then(function(data) {
       $('.order').append(data.ORDER);
       $('.uv-value').append(data.UV_VALUE);
    });
});