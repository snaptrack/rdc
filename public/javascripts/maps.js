var marker_array=[];
var contentString='';
var map;


function initMap() {
    map = new google.maps.Map(document.getElementById('googleMap'), {
        center: {
            lat: 46.10370807092794,
            lng: 11.865234375
        },
        zoom: 3
    });
    var len = array_luoghi.length;
    for (var count = 0; count < len; count++) {
        if (array_luoghi[count].place.hasOwnProperty('location') && array_luoghi[count].place.location.hasOwnProperty('latitude')) {
            var location = {
                lat: array_luoghi[count].place.location.latitude,
                lng: array_luoghi[count].place.location.longitude
            };
            var nome = array_luoghi[count].place.location.city;
            addMarker(location, map, nome);
        }
    }

    for (var count = 0; count < marker_array.length; count++) {
        marker_array[count].addListener('click', function() {
            add_images(this);
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            infowindow.open(map, this);
            contentString = '';
        });
    }


}

function addMarker(location, map, nome) {
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: nome
    });
    marker_array.push(marker);
    marker.setMap(map);
}

//contentString += '<a class="example-image-link" href="'+array_foto[i].images[len].source+'" data-lightbox="example-set" ><img class="example-image" height="100" width="100" src="'+array_foto[i].images[len].source+'" alt=""/></a>'
//contentString+='<img height="100" width="100" src="'+array_foto[i].images[len].source+'"/>';

function add_images(marker) {
    for (var i = 0; i < array_foto.length; i++) {
        if (marker.title === array_foto[i].place.location.city) {
            var len = array_foto[i].images.length - 1;
            //contentString += '<img height="100" width="100" src="' + array_foto[i].images[len].source + '"/>';
            contentString += '<a class="example-image-link" href="' + array_foto[i].images[len].source + '" data-lightbox="example-set" ><img class="example-image" height="100" width="100" src="'+ array_foto[i].images[len].source +'" alt=""/></a>';
        }
    }
    for (var k = 0; k < feed.length; k++) {
        if (marker.title === feed[k].place.location.city) {
            var array_images = feed[k].attachments.data;
            if (array_images[0].hasOwnProperty('subattachments')) {
                for (var j = 0; j < array_images[0].subattachments.data.length; j++) {
                    if (array_images[0].subattachments.data[j].hasOwnProperty('media'))
                        contentString += '<a class="example-image-link" href="' + array_images[0].subattachments.data[j].media.image.src + '" data-lightbox="example-set" ><img class="example-image" height="100" width="100" src="'+ array_images[0].subattachments.data[j].media.image.src+'" alt=""/></a>';
                }
            }
            else {
                for (var j = 0; j < array_images.length; j++) {
                    if (array_images[j].hasOwnProperty('media'))
                        contentString += '<a class="example-image-link" href="' + array_images[j].media.image.src + '" data-lightbox="example-set" ><img class="example-image" height="100" width="100" src="'+ array_images[j].media.image.src+'" alt=""/></a>';
                }
            }
        }
    }
}


function place(){
    var luogo=document.getElementById('place').value;
    if (luogo == "") {
        alert("inserisci un luogo");
        return false;
    }
        var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'address': luogo
    }, function(results, status) {
        if (luogo == '') {
            alert('Inserire un Luogo');
            return false;
        }
        else if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            map.setZoom(10);
            var proprieta = {
                path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
                fillColor: 'yellow',
                fillOpacity: 0.8,
                scale: 0.3,
                strokeColor: 'gold',
                strokeWeight: 6

            };
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                icon: proprieta
            });
            marker.addListener('click', function() {
                var m = this;
                $.post('https://rdc-snaptrack.c9users.io/users/luogoCercato', {
                    friend: JSON.stringify(array_friends),
                    place: '' + luogo
                }, function(data) {
                    console.log(data.names);
                    var content = '' + data.names;
                    var infowindow = new google.maps.InfoWindow({
                        content: content
                    });
                    console.log(content);
                    infowindow.open(map, m);
                });
            });
        }
        else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}

function friends() {
    var html = '';
    for (var j = 0; j < array_friends.length; j++) {
        html += '<a onclick="friends_map(' + j + ')" >' + array_friends[j].name + '</a> <br>';
    }
    document.getElementById('zonaDinamica').innerHTML = html;
}


function friends_map(k) {
    var id = array_friends[k].id;
    var url = 'https://rdc-snaptrack.c9users.io/users/dataFriends';
    var form = $('<form action="' + url + '" method="post">' +
        '<input type="hidden" name="id" value="' + id + '">' +
        '</form>');
    $('body').append(form);
    form.submit();
}
    
function validation() {
    console.log('ti prego');
    var luogo = document.form1.city.value;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'address': luogo
    }, function(results, status) {
        if (!status == google.maps.GeocoderStatus.OK) {
            alert("Il luogo inserito è inesistente");
            return false;
        }
    });
    var temp_friends = JSON.stringify(array_friends);
    var temp_name = myname;
    console.log('porca troia');
    console.log(temp_name);
    console.log(temp_friends);
    console.log('porca mignotta');
    $("#table").append("<tr><td><input type='hidden' name='friends' value='" + temp_friends + "'></td></tr>");
    $("#table").append('<tr><td><input type="hidden" name="myname" value="' + temp_name + '"></td></tr>');
}

function notification(testo) {

    if (window.Notification && Notification.permission !== "denied") {
        Notification.requestPermission(function(status) { // status is "granted", if accepted by user
            var n = new Notification('SNAPTRACK', {
                body: testo
                    //icon: '/path/to/icon.png' // optional
            });
        });
    }
    else if (Notification.permission === "granted") {
        var n = new Notification('SNAPTRACK', {
            body: testo,
            silent: 'false'
        })
    }

}


function badge_notification() {
    var content_notification = "";
    for (var i = 0; i < array_notifiche.length; i++) {
        content_notification += "<h6 value='" + i + "'>" + array_notifiche[i] + "</h6>";
    }
    //console.log("ffff")
    array_notifiche = [];
    $("#notif").append("<tr><td>" + content_notification + "</td></tr>")
    $(".badge1").attr("data-badge", "0");
    $.post('https://rdc-snaptrack.c9users.io/users/numberNotifications', {
        rb: rb
    }, function(data) {
        console.log("tutto ok");
    });
}