// Creare un layout base con una searchbar (una input e un button) in cui possiamo
// scrivere completamente o parzialmente il nome di un film.
// Possiamo, cliccando il bottone, cercare sull’API tutti i film che
// contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti
// valori per ogni film trovato:
// Titolo
// Titolo Originale
// Lingua
// Voto

$(document).ready(function(){
    $('#cerca').click(function(){
        var query = $('#query').val()

        $.ajax(
            {
                "url":'https://api.themoviedb.org/3/search/movie',
                "method":'GET',
                "data": {
                    api_key:'b71909719ea322aa41b4b92813e721e5',
                    language:'it-IT',
                    query: query
            },

            "success": function(r){
                for (var i = 0; i < r.results.length; i++){
                    if(r.results[i].title.includes(query) || r.results[i].original_title.includes(query)){
                        var source = $("#entry-template").html();
                        var template = Handlebars.compile(source);
                        var context = r.results[i];
                        var html = template(context);
                        // stampo risultati
                        $('#risultati').append(html);
                    } else {
                        console.log('Nessun risultato')
                    }
                }
            },
            "error": function(){
                alert('Errore');
            }
        })
    })
});
