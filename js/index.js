const db = firebase.firestore();
var sNombre = '';
var sApellidoPat = '';
var sApellidoMat = '';
var sGenero = '';
var sTelefono = '';
var sCorreo = '';
var iCorreoValido = 0;

$(document).ready(function()
{
	$('#mensaje').hide();
	$("#btnGuardar").click( async () =>
	{
		try
		{
			var sNombre 		= $('#txtNombre').val();
			var sApellidoPat 	= $('#txtApellidoPaterno').val();
			var sApellidoMat	= $('#txtApellidoMaterno').val();
			var sGenero			= $('#Genero').val();
			var sTelefono		= $('#txtTelefono').val();
			var sCorreo 		= $("#txtCorreo").val();

			if((sNombre.length == 0 || sNombre == '') || (sApellidoPat.length == 0 || sApellidoPat == '') || (sApellidoMat.length == 0 || sApellidoMat == '') || sCorreo.length == 0 || sCorreo == '')
			{
				$('#mensaje').removeClass('success');
				$('#mensaje').addClass('error');
				$('#mensaje').html("Favor de llenar los campos");
				$('#mensaje').show();
			}
			else {
				const response = await db.collection("users").doc().set({
					name:sNombre,
					firstlastname:sApellidoPat,
					secondlastname:sApellidoMat,
					genero:sGenero,
					phone:sTelefono,
					email:sCorreo
				});
				console.log(response);
	
				$('#mensaje').removeClass("error");
				$('#mensaje').addClass("success");
				$('#mensaje').html("Registro Guardado con Exito");
				$('#mensaje').show();
				limpiar();	
			}						
		}catch(e)
		{
			console.log(e);
		}
	});
	
	$("#txtCorreo").change(function(evento)
	{
		sCorreo = $("#txtCorreo").val();
		if(sCorreo != '')
		{
			if(ValidarCaracteres(sCorreo))
			{
				if(ValidarPrimerCaracter(sCorreo))
				{
					if(ValidarUltimoCaracter(sCorreo))
					{
						if(ValidarExistaArrobayPunto(sCorreo))
						{
							if(ValidarPuntosSeguidos(sCorreo))
							{
								if(ValidarMasDeUnArroba(sCorreo))
								{
									if(ValidarArrobaYPuntoSeguidos(sCorreo))
									{
										if(ValidarDominio(sCorreo))
										{	
											if(ValidarDominioUsados(sCorreo))
											{
												iCorreoValido = 1;
											}
											else
											{
												iCorreoValido = 0;
												//console.log("Correo Invalido debido a que Contiene un Dominio invalido");
												$('#mensaje').show();
												$('#mensaje').html("Favor de verificar la estructura del correo");
											}
										}
										else
										{
											iCorreoValido = 0;
											//console.log("Correo Invalido debido a que Contiene un Dominio invalido");
											$('#mensaje').show();
											$('#mensaje').html("Favor de verificar la estructura del correo");
										}
									}
									else
									{
										iCorreoValido = 0;
										//console.log("Validando arroba y punto seguido");
										$('#mensaje').show();
										$('#mensaje').html("Favor de verificar la estructura del correo");
									}
								}
								else
								{
									iCorreoValido = 0;
									//console.log("El correo no debe de tener mas de un arroba");
									$('#mensaje').show();
									$('#mensaje').html("Favor de verificar la estructura del correo");
								}						
							}
							else
							{
								iCorreoValido = 0;
								//console.log("El correo no debe de tener dos puntos seguidos");
								$('#mensaje').show();
								$('#mensaje').html("Favor de verificar la estructura del correo");
							}												
						}
						else
						{
							iCorreoValido = 0;
							//console.log("Se debe terner un arroba y un punto");
							$('#mensaje').show();
							$('#mensaje').html("Favor de verificar la estructura del correo");;
						}													
					}
					else
					{
						iCorreoValido = 0;
						//console.log("No debe de terminar con ese caracter");
						$('#mensaje').show();
						$('#mensaje').html("Favor de verificar la estructura del correo");
					}												
				}	
				else
				{
					iCorreoValido = 0;
					//console.log("No debe de empezar con ese caracter");
					$('#mensaje').show();
					$('#mensaje').html("Favor de verificar la estructura del correo");
				}					
			}
			else
			{
				iCorreoValido = 0;
				//console.log("Tiene caracteres Invalidos");
				$('#mensaje').show();
				$('#mensaje').html("Favor de verificar la estructura del correo");
			}								
		}
		else
		{
			iCorreoValido = 0;
			//console.log("El correo esta vacio");
			$('#mensaje').show();
			$('#mensaje').html("Favor de verificar la estructura del correo");
		}
	});	
	//validarTelefono();
});

function limpiar()
{	
	$("#txtNombre").val('');
	$("#txtApellidoPaterno").val('');
	$("#txtApellidoPaterno").val('');
	$("#txtTelefono").val('');
	$("#txtCorreo").val('');
}

function soloLetras(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toString();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNÑOPQRSTUVWXYZ";//Se define todo el abecedario que se quiere que se muestre.
    especiales = [8, 37, 39, 46, 6]; //Es la validación del KeyCodes, que teclas recibe el campo de texto.

    tecla_especial = false
    for(var i in especiales) {
        if(key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if(letras.indexOf(tecla) == -1 && !tecla_especial){
	
        return false;
      }
}

function solonumeros(e)
{ 
	tecla = (document.all) ? e.keyCode : e.which; 

	if (tecla==8) return true;
	if (tecla < 48 || tecla > 57) return false;
}

function validarTelefono()
{
	$("#txtTelefono").keypress(function(event){return validarKeypressSoloNumero(event); });
}

function validarKeypressSoloNumero(event)
{
	if(!(event.which >= 48 && event.which <= 58) && event.which!=8 && event.which!=0)
		event.preventDefault();
}

function ValidarCaracteres(cEmail)
{
	var bRegresa = false;
	cEmail += "";	
	
	for (i = 0; i < cEmail.length; i++)
	{
		if ((cEmail.charAt(i) == "&") || (cEmail.charAt(i) == "'") || (cEmail.charAt(i) == ",") || (cEmail.charAt(i) == '"') || (cEmail.charAt(i) == ":") || (cEmail.charAt(i) == ";") || 
			(cEmail.charAt(i) == "!") || (cEmail.charAt(i) == "+") || (cEmail.charAt(i) == "=") || (cEmail.charAt(i) == "/" ) || (cEmail.charAt(i) == "\\" ) || (cEmail.charAt(i) == "(" ) || 
			(cEmail.charAt(i) == ")" ) || (cEmail.charAt(i) == "<") || (cEmail.charAt(i) == ">") || (cEmail.charAt(i) == " "))
		{
			bRegresa = false;
			break;
		}
		else
		{
			bRegresa = true;
		}
	}
	return bRegresa;
}

function ValidarPrimerCaracter(cEmail)
{
	var bRegresa = false;
	var cInicial = cEmail.substring(0, 1);
	
	if ((cInicial == "@") || (cInicial == ".") || (cInicial == "-") || (cInicial == "_") || (cInicial == "%"))
	{
		bRegresa = false;
	}
	else
	{
		bRegresa = true;
	}
	return bRegresa;
}

function ValidarUltimoCaracter(cEmail)
{
	var bRegresa = false;
	var cFinal = cEmail.slice(cEmail.length-1);
	
	if ((cFinal == "@") || (cFinal == ".") || (cFinal == "-") || (cFinal == "_") || (cFinal == "%"))
	{
		bRegresa = false;
	}
	else
	{
		bRegresa = true;
	}
	return bRegresa;
}

function ValidarExistaArrobayPunto(cEmail)
{
	var bRegresa = false;
	var icontA = 0;
	var icontP = 0;
	cEmail += "";	
	
	for (i = 0; i < cEmail.length; i++)
	{
		if(cEmail.charAt(i) == "@")
		{
			icontA++;
		}
		else if (cEmail.charAt(i) == ".")
		{
			icontP++;
		}
	}
	
	if((icontA > 0) && (icontP > 0))
	{
		bRegresa = true;
	}
	else
	{
		bRegresa = false;
	}
	return bRegresa;
}

function ValidarPuntosSeguidos(cEmail)
{		
	var bRegresa = false;
	var icont = 0;
	cEmail += "";	
	
	for (i = 0; i < cEmail.length; i++)
	{
		if (cEmail.charAt(i) == ".")
		{
			icont++;
			
			if(icont > 1)
			{
				bRegresa = false;
				break;
			}
		}
		else
		{
			icont = 0;
			bRegresa = true;
		}
	}	
	return bRegresa;
}

function ValidarMasDeUnArroba(cEmail)
{		
	var bRegresa = false;
	var icont = 0;
	cEmail += "";	
	
	for (i = 0; i < cEmail.length; i++)
	{
		if (cEmail.charAt(i) == "@")
		{
			icont++;
			
			if(icont > 1)
			{
				bRegresa = false;
				break;
			}
		}
		else
		{
			bRegresa = true;
		}
	}	
	return bRegresa;
}

function ValidarArrobaYPuntoSeguidos(cEmail)
{
	var bRegresa = false;
	var icont = 0;
	cEmail += "";	
	
	for (i = 0; i < cEmail.length; i++)
	{
		if ((cEmail.charAt(i) == ".") || (cEmail.charAt(i) == "@"))
		{
			icont++;
			
			if(icont > 1)
			{
				bRegresa = false;
				break;
			}
		}
		else
		{
			icont = 0;
			bRegresa = true;
		}
	}
	return bRegresa;
}

function ValidarDominio(cEmail)
{
	var bRegresa = false;
	var res = cEmail.split("@");
	var sDominio = res[1];
		
	if((sDominio == 'e-correo.com.mx') || (sDominio == 'ecorreo.com.mx') || (sDominio == 'e-correo.com') || (sDominio == 'ecorreo.com'))
	{
		bRegresa = false;
	}
	else
	{
		bRegresa = true;
	}
	return bRegresa;
}

function ValidarDominioUsados(cEmail)
{
	var bRegresa = false;	
	var res = cEmail.split("@");
	var sDominio = res[1];
		
	if((sDominio == 'Hotmail.com' || sDominio == 'hotmail.com') || (sDominio == 'Gmail.com' || sDominio == 'gmail.com') || (sDominio == 'Yahoo.com' || sDominio == 'yahoo.com') 
		|| (sDominio == 'Outlook.com' || sDominio == 'outlook.com')|| (sDominio =='Outlook.es' || sDominio =='outlook.es'))
	{
		bRegresa = true;
	}
	else
	{
		bRegresa = false;
	}
	return bRegresa;
}