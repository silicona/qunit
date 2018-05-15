define([
    
    'funciones',
    'app/config',
    'app/formulario'
    
], function(Fx, Config, Formulario){
    
    var LoginViewHtml = {};
    
    LoginViewHtml['login'] = [

        '<div class="outer">',
        '<div class="middle">',
        '<div class="inner">',
        
        '<div id="l-login" class="lc-block toggled">',
            
            '<img class="logo_login" src="' + Config.base_url + 'img/profile-menu.png" alt="Grupo Oclem" /><br><br>',
            '<div class="input-group m-b-20">',
                '<span class="input-group-addon"><i class="fa fa-user"></i></span>',
                '<div class="fg-line">',
                    '<input id="usuario" type="text" placeholder="Usuario" class="form-control" value="">',
                '</div>',
            '</div>',
            
            '<div class="input-group m-b-20">',
                '<span class="input-group-addon"><i class="fa fa-lock"></i></span>',
                '<div class="fg-line">',
                    '<input id="password" type="password" placeholder="Password" class="form-control" value="" >',
                '</div>',
            '</div>',
            
            '<div class="clearfix"></div>',
            
            '<a id="btn_login" class="btn btn-login btn-danger btn-float waves-effect waves-button" href="#"><i class="md md-arrow-forward"></i></a>',
            '<br>',
            '<a id="btn_acceder" class="btn btn-success" href="#"> Entrar <i class="fa fa-arrow-right"></i></a>',
            '<br>',
            '<br>',

            '<div id="resp_login"></div>',
            '<p class="align-center"> <br><a href="' + Config.base_url + '#alta"><i class="fa fa-user fa-lg"></i> Contratar</p>',
            
            '</ul>',
        '</div>',

        '</div>',
        '</div>',
        '</div>'

    ].join('');

    return LoginViewHtml;

});