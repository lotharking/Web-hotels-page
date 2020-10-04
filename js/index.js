$(function(){
	$("[data-toggle='tooltip']").tooltip();
	$("[data-toggle='popover']").popover();
	//El interval es el tiempo en milisegundos
	$('.carousel').carousel({
		interval:5000
	});
	//el ON se usa para usar eventos en JQuery--la letra e es 
	//para que la funcion de JQuery reciba parametros
	$('#informacion').on('show.bs.modal', function(e){
		console.log('el modal contacto se esta mostrando');
	$('#informacionBtn').removeClass('btn-outline-success');
	$('#informacionBtn').addClass('btn-primary');
	$('#informacionBtn').prop('disabled',true);		
	});
	$('#informacion').on('shown.bs.modal', function(e){
		console.log('el modal contacto se mostró');
	});
	$('#informacion').on('hide.bs.modal', function(e){
		console.log('el modal contacto se oculta');
	});
	$('#informacion').on('hidden.bs.modal', function(e){
		console.log('el modal contacto se ocultó');
		$('#informacionBtn').removeClass('btn-primary');
		$('#informacionBtn').addClass('btn-outline-success');
		$('#informacionBtn').prop('disabled',false);
	});
});