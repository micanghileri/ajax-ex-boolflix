$(document).ready(function(){
    // ricerca al click
    $('#cerca').click(function(){
        var query = $('#query').val();
        reset();
        insertFilm(query);
        insertSeries(query);
    });
    // ricerca con tasto invio
    $(document).keydown(function(event){

        if (event.keyCode == 13 || event.which == 13){
            var query = $('#query').val();
            reset();
            insertFilm(query);
            insertSeries(query);
        }
    })
});

// *****funzioni*****

function reset(){
    $('#risultati').empty();
    $('#query').val('');
};

// ***film****
function insertFilm(data){
    $.ajax(
        {
            url: 'https://api.themoviedb.org/3/search/movie',
            method: 'GET',
            data:
            {
                api_key: 'b71909719ea322aa41b4b92813e721e5',
                language: 'it-IT',
                query: data
            },
            success: function(r){
                if(r.total_results > 0){
                    printFilm(r.results);
                } else {
                    noResult();
                }
            },
            error: function(){
                alert('Errore');
            }
        }
    );
};

function printFilm(data){
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < data.length; i++){
        var context = {
            pic: imgScheda(data[i].poster_path),
            title: data[i].title,
            original_title: data[i].original_title,
            original_language: worldFlag(data[i].original_language),
            vote_average: voteStar(data[i].vote_average),
        };
        var html = template(context);
        $('#risultati').append(html);
    }
};
// ****serie tv*****
function insertSeries(data){
    $.ajax(
        {
            url: 'https://api.themoviedb.org/3/search/tv',
            method: 'GET',
            data:
            {
                api_key: 'b71909719ea322aa41b4b92813e721e5',
                language: 'it-IT',
                query: data
            },
            success: function(r){
                if(r.total_results > 0){
                    printSeries(r.results);
                } else {
                    noResult();
                }
            },
            error: function(){
                alert('Errore');
            }
        }
    );
};

function printSeries(data){
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < data.length; i++){
        var context = {
            pic: imgScheda(data[i].poster_path),
            title: data[i].name,
            original_title: data[i].original_name,
            original_language: worldFlag(data[i].original_language),
            vote_average: voteStar(data[i].vote_average),
        };
        var html = template(context);
        $('#risultati').append(html);
    }
};

function noResult(){
    var source = $("#no-result-template").html();
    var template = Handlebars.compile(source);
    var context = {
        noResult: 'Non ci sono risultati'
    };
    var html = template(context);
    $('#risultati').append(html);
};

function worldFlag(langCode){
    var lingua = ['it','en','de','pt','sv','fr','ja','es'];
    if (lingua.includes(langCode)) {
        return '<img src="img/' + langCode + '.png">';
    } else {
        return langCode;
    }
};

function voteStar(vote){
    var activeStar = '<i class="fas fa-star active-star"></i>';
    var disabledStar = '<i class="fas fa-star disabled-star"></i>';
    var vote = Math.round(vote / 2);
    var a = '';
    for (var i = 0; i < 5; i++) {
        if (vote > 0) {
            a += activeStar;
            vote -= 1;
        } else {
            a += disabledStar;
        }
    }
    return a;
};

function imgScheda(pic){
    if (pic != null) {
        return 'https://image.tmdb.org/t/p/w342' + pic;
    } else {
        return 'https://adriaticaindustriale.it/wp-content/uploads/2020/02/not-found.png'
    }
};
