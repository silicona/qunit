define([
    
    'app/formulario',
    'funciones'

], function(Formulario, Fx){
    
    var NoEncontradoViewHtml = {};
    
    NoEncontradoViewHtml['no_encontrado'] = [

        '<div class="container">',

            '<div class="card">',

                '<div class="card-header">',
                    '<h2>Sección no encontrada</h2>',
                '</div>',

                '<div class="card-body card-padding">',
                    
                    '<div class="row text-center texto_no_encontrado">',
                        '<p>',
                            '<i class="fa fa-frown-o"></i>',
                        '</p>',

                        '<p class="text-center">',
                            'La sección que busca no existe. <br>Por favor, pinche en Ir a inicio o seleccione un elemento del menú.',
                        '</p>',

                        '<p class="text-center">',
                            '<a href="#" class="btn btn-default">Ir a inicio</a>',
                        '</p>',

                    '</div>',

                '</div>', // fin card body

           '</div>', // fin card

        '</div>', // fin container

    ].join('');


    return NoEncontradoViewHtml;

});