var mensajesPendientes = 0;

jQuery(document).ready(function() {

    $( "#juego" ).hide();

    $(function() {
        $( "#tabs" ).tabs();
    });
    
    $( "#tabs" ).hide();
    
     $(function() {
        $( "#draggable" ).draggable();
    });
    
    function mostrarMensaje (data, identificador){ 
        for (var i in data){
            $( identificador ).append("<div>" + '<img id="img" src='+ data[i].Avatar + ' />' + "  " + data[i].Autor + "<div>");
            $( identificador ).append("<div>" + data[i].Contenido + "</div>");
        }
        $(identificador).accordion({collapsible: true, active:false, heightStyle: "content"});
    };
    
    function mostrarMensaje2 (data, identificador){ 
        for (var i in data){
            $( identificador ).append("<div>" + data[i].Titulo + "<div>");
            $( identificador ).append("<div>" + '<img id="img" src='+ data[i].Avatar + ' />' + data[i].Contenido1 +"<br>" + '<img id="img" src='+ data[i].Avatar +' />'+ data[i].Contenido2 + "</div>");
        }
        $(identificador).accordion({collapsible: true, active:false, heightStyle: "content"});
    };
    
    //Funcion para lo de registrarte del principio
     $(function() {
        var dialog, form,
        // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
        emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        name = $( "#name" ),
        email = $( "#email" ),
        password = $( "#password" ),
        allFields = $( [] ).add( name ).add( email ).add( password ),
        tips = $( ".validateTips" );
        
        function updateTips( t ) {
            tips
            .text( t )
            .addClass( "ui-state-highlight" );
            setTimeout(function() {
            tips.removeClass( "ui-state-highlight", 1500 );
            }, 500 );
        }
        
        function checkLength( o, n, min, max ) {
            if ( o.val().length > max || o.val().length < min ) {
                o.addClass( "ui-state-error" );
                updateTips( "Length of " + n + " must be between " +
                min + " and " + max + "." );
                return false;
            } else {
                return true;
            }
        }
        
        function checkRegexp( o, regexp, n ) {
            if ( !( regexp.test( o.val() ) ) ) {
                o.addClass( "ui-state-error" );
                updateTips( n );
                return false;
            } else {
                return true;
            }
        }
        
        function addUser() {
            var valid = true;
            allFields.removeClass( "ui-state-error" );
            valid = valid && checkLength( name, "username", 3, 16 );
            valid = valid && checkLength( email, "email", 6, 80 );
            valid = valid && checkLength( password, "password", 5, 16 );
            valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
            valid = valid && checkRegexp( email, emailRegex, "eg. ui@jquery.com" );
            valid = valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );
            if ( valid ) {
                $( "#users tbody" ).append( "<tr>" +
                "<td>" + name.val() + "</td>" +
                "<td>" + email.val() + "</td>" +
                "<td>" + password.val() + "</td>" +
                "</tr>" );
                dialog.dialog( "close" );
            }
            return valid;
        }
            
        dialog = $( "#dialog-form" ).dialog({
            autoOpen: false,
            height: 500,
            width: 550,
            modal: true,
            buttons: {
            "Create an account": addUser,
            Cancel: function() {
                dialog.dialog( "close" );
            }
            },
            close: function() {
                form[ 0 ].reset();
                allFields.removeClass( "ui-state-error" );
            }
        });
        
        form = dialog.find( "form" ).on( "submit", function( event ) {
            event.preventDefault();
            addUser();
        });
        
        $( "#create-user" ).button().on( "click", function() {
            dialog.dialog( "open" );
        });
        
        $( "#pagWeb" ).button().on( "click", function() {
            $( "#EO" ).hide();
            $( "#tabs" ).show();
            $.getJSON("mio.json", function(data) {
              
                mostrarMensaje(data.Mensajes, "#upd");    
            });
            $.getJSON("frases.json", function(data) {
              
                mostrarMensaje2(data.Mensajes, "#frases");    
            });
        });
        
        $( "#boton" ).click(function() {
            $( "#tabs" ).hide();
            $( "#juego" ).show();
            
        });
        
        $( "#volver" ).click(function() {
            $( "#juego" ).hide();
            $( "#tabs" ).show();//no se mete
            
        });
        
        $( "#gus1" ).button({}).draggable();
        
        $( "#gus2" ).button({}).draggable();
        
        $( "#she1" ).button({}).draggable();
        
        $( "#she2" ).button({}).draggable();
        
        $( "#yoli1" ).button({}).draggable();
        
        $( "#yoli2" ).button({}).draggable();
        
        $( "#gus" ).droppable({
            tolerance: "touch",
            drop: function( event, ui ){
                ui.draggable.hide();
            }
        });   
        
        $( "#she" ).droppable({
            tolerance: "touch",
            drop: function( event, ui ){
                ui.draggable.hide();
            }
        });   
        
        $( "#yoli" ).droppable({
            tolerance: "touch",
            drop: function( event, ui ){
                ui.draggable.hide();
            }
        });       
        
    });
    
    
    
    /*
    $("#boton1").hide();

    $(function() {
        $( "#tabs" ).tabs();
    });
    
    //funcion que muestra los mensajes de timeline
    function mostrarMensaje (data, identificador){ 
        for (var i in data){
            $( identificador ).append("<div>" + '<img id="img" src='+ data[i].Avatar + ' />' + "  " + data[i].Autor + "  ---  " + data[i].Titulo + "  ---<div>");
            $( identificador ).append("<div>" + data[i].Contenido + "<li>" + data[i].Fecha + "</li>" + "</div>");
        }
        $(identificador).accordion({collapsible: true, active:false, heightStyle: "content"});
    };
   
    
    //Primero descargo los mensajes del timeline
    $.getJSON("timeline.json", function(data) {
        timeline = data.Mensajes;
        mostrarMensaje(data.Mensajes, "#mens");    
    });
       
    //Miro a ver los mensajes que hay pendientes
    $.getJSON("update.json", function(data) {
        mensajesPendientes = data.Mensajes.length;
        console.log(mensajesPendientes);
        if(mensajesPendientes != 0){
            $( "#tabs-1" ).prepend("<p>" + "Mensajes pendientes:  " + mensajesPendientes + "</p>");
            $("#boton1").show();
        }else{
            $( "#tabs-1" ).prepend("<p>" + "No hay mensajes pendientes</p>");
        }
    });
    
    //saco los mensajes de myline para mostrarlos
    $.getJSON("myline.json", function(data) {
        mostrarMensaje(data.Mensajes, "#tabs-2");    
    });
    
    //si me pulsan el boton descargo los mensajes pendientes
    $("#boton1").click(function(){
        if (mensajesPendientes != 0){
            mensajesPendientes = 0;
            $( "#tabs-1 p" ).html("Mensajes pendientes:  " + mensajesPendientes);
            $.getJSON("update.json", function(data) {
              
                mostrarMensaje(data.Mensajes, "#upd");       
            });
        }
    });
    */
});
