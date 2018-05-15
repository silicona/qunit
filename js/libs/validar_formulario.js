define([
  'jquery',
  'iban'

], function($, IBAN){

  var MiForm = {

  //Funciones para validación del formulario
  valida_texto: function(mi_texto, min_long){
    
    if(min_long != undefined){
      return mi_texto.length >= min_long;  
    }
    
    return true;

  },

  is_numeric: function(n){
      return !isNaN(parseFloat(n)) && isFinite(n);
  },

  is_integer: function(val){
      if(val==null)
      {
          return false;
      }
      if (val.length==0)
      {
          return false;
      }
      for (var i = 0; i < val.length; i++) 
      {
          var ch = val.charAt(i)
          if (i == 0 && ch == "-")
          {
              continue;
          }
          if (ch < "0" || ch > "9")
          {
              return false;
          }
      }
      return true;
  },


  valida_iban: function(cadena) {

      if( typeof cadena == 'undefined' ){
        return true;
      }


      if( cadena.length == 0){
        return true;
      }

      // limpiar cadena para comparar
      return IBAN.isValid(cadena);
  },

  valida_numerico: function(mi_texto){

     //chequear si numerico   
      var es_numerico=true;
      if((this.is_numeric(mi_texto)==false) || (mi_texto=='')){
        es_numerico=false;
      }
      
      return es_numerico;
  },

  valida_entero: function(mi_texto){

     //chequear si numerico entero   
      var es_entero=true;
      if((this.is_integer(mi_texto)==false) || (mi_texto=='')){
        es_entero=false;
      }
     
     return es_entero;
  },

  valida_ano: function(mi_texto){

     //chequear si numerico entero   
      var es_ano=true;
      if((this.is_integer(mi_texto)==false) || (mi_texto=='')){es_ano=false;}
     
     if(parseFloat(mi_texto)>2030 || parseFloat(mi_texto)<1800){es_ano=false;}
     
     if(parseFloat(mi_texto)==0){es_ano=true}
     
     return es_ano;
  },

  valida_telefono: function(mi_texto){
         
      var caract_validos = "+0123456789.-() ";
      var min_long = 9;
      var es_telefono=true;
      var caracter;

      //chequear caracteres
      for (i = 0; i < mi_texto.length && es_telefono == true; i++){

          caracter = mi_texto.charAt(i);
          if (caract_validos.indexOf(caracter) == -1){
            es_telefono = false;
          }
      }

      //chequear lontitud
      if (mi_texto.length<min_long){
        es_telefono=false;
      }

     return es_telefono;
  },

  valida_nombre_archivo: function(mi_texto){
      
      var caract_validos = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя";
      var es_nombre_archivo=true;
      var Char;
         
      //chequear caracteres
      for (i = 0; i < mi_texto.length; i++)
         {
         Char = mi_texto.charAt(i);
         if (caract_validos.indexOf(Char) == -1)
      {
      es_nombre_archivo = false;
      }
         }
    
      if(mi_texto.length==0){es_nombre_archivo=true;}
      
     return es_nombre_archivo;
  },

  valida_usuario: function(mi_texto, min_long){
      
      var caract_validos = "0123456789abcdefghijklmnñopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщъыьэюя";
      var es_usuario_valido=true;
      var caracter;

      //chequear caracteres
      for (i = 0; i < mi_texto.length; i++)
         {
         caracter = mi_texto.charAt(i);
         if (caract_validos.indexOf(caracter) == -1)
      {
      es_usuario_valido = false;
      }
         }
         
      if (mi_texto.length<min_long){
       es_usuario_valido = false;
         }
      
     return es_usuario_valido;
        
  },

  valida_cp: function(mi_texto){

      var caract_validos = "0123456789";
      var longitud = 5;
      var es_cp=true;
      var caracter;

      //chequear caracteres
      for (i = 0; i < mi_texto.length && es_cp == true; i++)
         {
         caracter = mi_texto.charAt(i);
         if (caract_validos.indexOf(caracter) == -1)
      {
      es_cp = false;
      }
         }
     //chequear lontitud
     if (mi_texto.length != longitud){es_cp=false}

     return es_cp;
  },

  valida_email: function(s){

      var reg = /^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i;
      return reg.test(s);

  },


  valida_url: function(s) {
  
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);

  },


  //VALIDAR FECHA
  valida_fecha: function(fecha){
      // Adaptado de valida_ Fecha By Luciano 1998 (elcodigo.com)
      
      var mi_fecha = new String(fecha)  // Crea un string
      var Ano = new String(mi_fecha.substring(mi_fecha.lastIndexOf("/")+1,mi_fecha.length))
      var Mes = new String(mi_fecha.substring(mi_fecha.indexOf("/")+1,mi_fecha.lastIndexOf("/")))
      var Dia = new String(mi_fecha.substring(0,mi_fecha.indexOf("/")))
      
      if (fecha.length !=10){return false;}
      
      if( fecha == '00/00/0000'){return true;}

      // Dejar pasar si es bisiesto
      if( fecha == '29/02/2016' || fecha == '29/02/2020' || fecha == '29/02/2024' ){ return true;}

      // Valido el año
      if (isNaN(Ano) || Ano.length<4 || parseFloat(Ano)<1900){return false;}
      
      // Valido el Mes
      if (isNaN(Mes) || parseFloat(Mes)<1 || parseFloat(Mes)>12){return false;}
      
      // Valido el Dia
      if (isNaN(Dia) || parseInt(Dia, 10)<1 || parseInt(Dia, 10)>31){return false;}
      
      if (Mes==4 || Mes==6 || Mes==9 || Mes==11 || Mes==2) {
        if ( Mes == 2 && Dia > 28 || Dia > 30) {
            return false;
        }
      }
      return true;
  },

  valida_hora: function(s) {

    var regexp = /^(?:[01]?[0-9]|2[0-3]):[0-5][0-9]$/
    return regexp.test(s);

  },

  valida_nif: function(nif) {
      
      var numero;
      var letra_aux;
       
       //Si la primera letra es A o B es un CIF
      // if (((nif.substring(0,1)=="A") || (nif.substring(0,1)=="B")) && (nif.length==9)){
      var arr_letras = ['A','B','C','D','E','F','G','H','J','N','P','Q','R','S','U','V','W'];
      if( ( arr_letras.indexOf( nif.substring(0,1) ) > -1 ) && (nif.length==9)){
        return true;
      }
      
      //comprobar NIF o NIE
      numero = nif.substr(0,nif.length-1);
       
      //Si es nie, la primera letra hay que transformarla en 0, 1 o 2
      if (numero.substring(0,1).toUpperCase()=="X"){numero = "0" + nif.substr(1,nif.length-1);}
      if (numero.substring(0,1).toUpperCase()=="Y"){numero = "1" + nif.substr(1,nif.length-1);}
      if (numero.substring(0,1).toUpperCase()=="Z"){numero = "2" + nif.substr(1,nif.length-1);}
       
       letra_aux = nif.substr(nif.length-1,1);
       numero    = parseFloat(numero) % 23;
       letra     = 'TRWAGMYFPDXBNJZSQVHLCKET';
       letra     = letra.substring(numero,numero+1);
      
      if ((letra!=letra_aux)||(nif=='')){
          return false;
      }else{
          return true;
      }
       
  },
   


  //VALIDAR CUENTA CORRIENTE
  // Código original: http://www.programacion.com/articulo/validacion_del_numero_de_cuenta_ccc_135
  obtener_digito: function(valor){
      valores = new Array(1, 2, 4, 8, 5, 10, 9, 7, 3, 6);
      control = 0;
      for (i=0; i<=9; i++)
        control += parseInt(valor.charAt(i)) * valores[i];
      control = 11 - (control % 11);
      if (control == 11) control = 0;
      else if (control == 10) control = 1;
      return control;
    },
   
  numerico: function(valor){
      cad = valor.toString();
      for (var i=0; i<cad.length; i++) {
    var caracter = cad.charAt(i);
    if (caracter<"0" || caracter>"9"){return false;}
      }
      
      return true;
    },
   
  valida_cuenta: function(banco, sucursal, dc, cuenta) {
      EsCuenta=true;
      
      if(banco.length != 4 || sucursal.length != 4 ||
    dc.length != 2 || cuenta.length != 10){
        EsCuenta=false;
    
      }else {
    
        if (!numerico(banco) || !numerico(sucursal) ||
      !numerico(dc) || !numerico(cuenta)){
        
    EsCuenta=false;
        }else {
    if (!(this.obtener_digito("00" + banco + sucursal) ==
          parseInt(dc.charAt(0))) || 
        !(this.obtener_digito(cuenta) ==
          parseInt(dc.charAt(1)))){
      EsCuenta=false;
      //alert('cuenta erronea');
      }else{
        //alert('cuenta correcta');
        EsCuenta=true;
    }
        }
      }
      return EsCuenta;
  },

  // validar tarjeta de crédito
  /* This script and many more are available free online at
  The JavaScript Source!! http://javascript.internet.com
  Created by: David Leppek :: https://www.azcode.com/Mod10

  Basically, the alorithum takes each digit, from right to left and muliplies each second
  digit by two. If the multiple is two-digits long (i.e.: 6 * 2 = 12) the two digits of
  the multiple are then added together for a new number (1 + 2 = 3). You then add up the 
  string of numbers, both unaltered and new values and get a total sum. This sum is then
  divided by 10 and the remainder should be zero if it is a valid credit card. Hense the
  name Mod 10 or Modulus 10. */

  valida_num_tarjeta: function(ccNumb) {  // v2.0
    
    var valid = "0123456789"  // Valid digits in a credit card number
    var len = ccNumb.length;  // The length of the submitted cc number
    var iCCN = parseInt(ccNumb);  // integer of ccNumb
    var sCCN = ccNumb.toString();  // string of ccNumb
    sCCN = sCCN.replace (/^\s+|\s+$/g,'');  // strip spaces
    var iTotal = 0;  // integer total set at zero
    var bNum = true;  // by default assume it is a number
    var bResult = false;  // by default assume it is NOT a valid cc
    var temp;  // temp variable for parsing string
    var calc;  // used for calculation of each digit
    
    // Determine if the ccNumb is in fact all numbers
    for (var j=0; j<len; j++) {
      temp = "" + sCCN.substring(j, j+1);
      if (valid.indexOf(temp) == "-1"){bNum = false;}
    }
    
    // if it is NOT a number, you can either alert to the fact, or just pass a failure
    if(!bNum){
      /*alert("Not a Number");*/bResult = false;
    }
    
    // Determine if it is the proper length 
    if((len == 0)&&(bResult)){  // nothing, field is blank AND passed above # check
      bResult = false;
    } else{  // ccNumb is a number and the proper length - let's see if it is a valid card number
      if(len >= 15){  // 15 or 16 for Amex or V/MC
        for(var i=len;i>0;i--){  // LOOP throught the digits of the card
          calc = parseInt(iCCN) % 10;  // right most digit
          calc = parseInt(calc);  // assure it is an integer
          iTotal += calc;  // running total of the card number as we loop - Do Nothing to first digit
          i--;  // decrement the count - move to the next digit in the card
          iCCN = iCCN / 10;                               // subtracts right most digit from ccNumb
          calc = parseInt(iCCN) % 10 ;    // NEXT right most digit
          calc = calc *2;                                 // multiply the digit by two
          // Instead of some screwy method of converting 16 to a string and then parsing 1 and 6 and then adding them to make 7,
          // I use a simple switch statement to change the value of calc2 to 7 if 16 is the multiple.
          switch(calc){
            case 10: calc = 1; break;       //5*2=10 & 1+0 = 1
            case 12: calc = 3; break;       //6*2=12 & 1+2 = 3
            case 14: calc = 5; break;       //7*2=14 & 1+4 = 5
            case 16: calc = 7; break;       //8*2=16 & 1+6 = 7
            case 18: calc = 9; break;       //9*2=18 & 1+8 = 9
            default: calc = calc;           //4*2= 8 &   8 = 8  -same for all lower numbers
          }                                               
        iCCN = iCCN / 10;  // subtracts right most digit from ccNum
        iTotal += calc;  // running total of the card number as we loop
      }  // END OF LOOP
      if ((iTotal%10)==0){  // check to see if the sum Mod 10 is zero
        bResult = true;  // This IS (or could be) a valid credit card number.
      } else {
        bResult = false;  // This could NOT be a valid credit card number
        }
      }
    }
    
    // change alert to on-page display or other indication as needed.
    /*
    if(bResult) {
      alert("This IS a valid Credit Card Number!");
    }
    if(!bResult){
      alert("This is NOT a valid Credit Card Number!");
    }
    */
    
    return bResult; // Return the results
    
  },

  valida_contrasena: function(contrasena1, contrasena2) {
         
         if(contrasena1 == contrasena2){
                return true;
         }else{
                return false;
         }
         
  }
  
  };

  return MiForm;

});