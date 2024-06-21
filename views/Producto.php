<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta http-equiv="CACHE-CONTROL" content="no-cache" />
	<meta http-equiv="pragma" content="no-cache" />
	<title>Master In Pets | Admin</title>
	<link rel="icon" type="image/png" href="../Content/image/masterinpetslogo.png">
	<!-- Tell the browser to be responsive to screen width -->
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<!-- Bootstrap 3.3.6 -->
	<link href="../Content/plugins/Bootstrap/css/bootstrap.min.css" rel="stylesheet" />
	<link href="../Content/plugins/Boostrap.Responsive/responsive.bootstrap.min.css" rel="stylesheet" />
	<!-- Font Awesome -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<!--Sweetalert-->
    <link href="../Content/plugins/sweetalert/sweetalert.css" rel="stylesheet" />
	<link href="../Content/plugins/sweetalert2/sweetalert2.css" rel="stylesheet" />

    <!-- DataTables CSS -->
    <link href="https://cdn.datatables.net/1.10.21/css/dataTables.bootstrap4.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">


    <!-- Theme style -->
	<link href="../Content/plugins/select2/css/select2.min.css" rel="stylesheet" />
	<link href="../Content/adminLTE/adminLTE/css/AdminLTE.min.css?v=@DateTime.Now.Ticks.ToString()?v=@DateTime.Now.Ticks.ToString()" rel="stylesheet" />
	<link href="../Content/adminLTE/adminLTE/css/skins/skin-mpol.min.css?v=@DateTime.Now.Ticks.ToString()?v=@DateTime.Now.Ticks.ToString()" rel="stylesheet" />
	<!-- iCheck -->
    <link rel="stylesheet" href="../Content/plugins/iCheck/square/blue.css">
    <style>
        input[type=date].form-control, input[type=time].form-control, input[type=datetime-local].form-control, input[type=month].form-control {
            line-height: initial;
        }
    </style>
	<!-- Section Styledheet -->
	<!-- jQuery 3.1.1 -->
	<script src="../Content/plugins/jQuery/jquery-3.1.1.min.js"></script>
	<!--Script de Carga imagen por default-->
	<script>
		function imgError(img, ruta) {
			if (ruta == undefined) {
				ruta = "../Content/image/blank_image.png";
			}
			img.src = ruta;
		}
	</script>
	  <style>
        .error-message {
            color: red;
            display: none;
            font-size: 0.8em;
        }
        .container-center {
            max-width: 60%; 
            margin: 50px auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
    </style>
	<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
		<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->
</head>
<body class="hold-transition skin-gmanteq sidebar-mini fixed">
	<div id="adminlte--Loading">
		<i class="fa fa-refresh fa-spin" aria-hidden="true"></i>
		<p class="message--progress"></p>
	</div>
	<div class="wrapper">

		<!-- Main Header -->
		<header class="main-header">

			<!-- Logo -->
			<a href="/Dashboard" class="logo">
				<!-- mini logo for sidebar mini 50x50 pixels -->
				<span class="logo-mini">
					<img src="../Content/image/masterinpetslogo.png" alt="masterinpets" />
				</span>
				<!-- logo for regular state and mobile devices -->
				<span class="logo-lg">
					<img src="../Content/image/masterinpetslogo.png" style="height: 80%;" alt="masterinpets" />
				</span>
			</a>

			<!-- Header Navbar -->
			<nav class="navbar navbar-static-top" role="navigation">
				<!-- Sidebar toggle button-->
				<a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
					<span class="sr-only">Toggle navigation</span>
				</a>
				<span class="logo-mobil">
					<img src="../Content/image/masterinpetslogo.png" alt="masterinpets" style="height: 100%;" />
				</span>
				<!-- Navbar Right Menu -->
				<div class="navbar-custom-menu">
					<ul class="nav navbar-nav">
						<!-- User Account Menu -->
						<li class="dropdown user user-menu">
							<!-- Menu Toggle Button -->
							<a href="#" class="dropdown-toggle" data-toggle="dropdown">
								<!-- The user image in the navbar-->
								<img src="../Content/image/user-default-blanco.png" class="user-image" alt="User Image">
								<span class="hidden-xs">NILTON VERA</span>
							</a>
							<ul class="dropdown-menu">
								<!-- The user image in the menu -->
								<li class="user-header">
									<img src="../Content/image/user-default-blanco.png" class="img-circle" alt="User Image">
									<p>
										NILTON VERA
									</p>
								</li>
								<!-- Menu Footer-->	
								<li class="user-footer">
									<center>
										<button>Cerrar sesión</button>
									</center>
									
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</nav>
		</header>
		<!-- Left side column. contains the logo and sidebar -->
		<aside class="main-sidebar">
			<section class="sidebar">
				<!-- Sidebar user panel (optional) -->
				
		
				<!-- Sidebar Menu -->
				<ul class="sidebar-menu">
					<li class="header">Menu</li>
					<li class="active"><a href="../views/Producto.php"><i class="fa fa-product-hunt"></i> <span>PRODUCTOS</span></a></li>
					<li><a href="../views/Clientes.php"><i class="fa fa-users"></i> <span>CLIENTES</span></a></li>
					<li><a href="../Ventas/Ventas.php"><i class="fa fa-shopping-cart"></i> <span>VENTAS</span></a></li>
				</ul>
				<!-- /.sidebar-menu -->
			</section>
            
			<!-- /.sidebar -->
		</aside>
		
		<!-- Content Wrapper. Contains page content -->
		<div class="content-wrapper">
			<!-- Content Header (Page header) -->
			<section id="section-header" class="content-header">
            <div class="container-fluid">
                <br>
        <h2>Registro de Productos</h2>
        <div class="col-md-12 col-sm-12" id="form" style="display:none;">
                    <div class="panel panel-filled">
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-sm-12"><h5 class="m-t-xs">Ingreso de producto	</h5></div>
                            </div>
                            <form id="alumnoForm" method="post" enctype="multipart/form-data">
								<div class="form-group" id="indice" style="display:none;">
									<label>Id</label>
									<input type="text" class="form-control" id="id" disabled >
								</div>
                                <div class="form-group">
                                    <label>Producto</label>
                                    <input  type="text" class="form-control" placeholder="Ingresar nombre del producto" id="producto" name="producto">
									<span class="error-message">Campo obligatorio</span>
                                </div>
								<div class="form-group">
								<label>Categoría</label>
								<select id="categoria" class="form-control select2" style="width: 100%;" name="categoria">
									<!-- Las opciones se cargarán aquí -->
								</select>
								</div>
                                <div class="form-group">
                                    <label>Descripción</label>
                                    <input type="text" class="form-control" placeholder="Ingresar descripción" id="descripcion" name="descripcion">
									<span class="error-message">Campo obligatorio</span>	
                                </div>
                                <div class="form-group">
                                    <label>Precio</label>
                                    <input type="text" class="form-control" placeholder="Ingresar el precio" id="precio" name="precio">
									<span class="error-message">Campo obligatorio</span>
                                </div>
								<div class="form-group">
                                    <label>Stock</label>
                                    <input type="number" class="form-control" placeholder="Ingresar el stock" id="stock"  name="stock">
									<span class="error-message">Campo obligatorio</span>
                                </div>
								<input type="file" name="image" id="image">
								<div class="form-group">
									<label>Imagen actual:</label>
									<img id="imagePreview" src="" alt="Imagen actual" style="width: 100px; height: auto;">
									<span id="imageLabel"></span>
								</div>

                                <div class="col-sm-12 text-right">
                                    <div class="panel-body buttons-margin">
									<button type="button" onclick="guardar()" id="btnGuardar" class="btn btn-w-md btn-success">Guardar</button>
									<button type="button" onclick="cancelar_form()" id="btnCancelar" class="btn btn-w-md btn-warning">Cancelar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
            </div>



            <div class= "card-body" id ="ListaProductos">
                <button onclick="ver_form()" type="button" class="btn btn-primary btn-sm pull-right" id="btnNuevoCliente" fdprocessedid="2hrh4">
                            <span class="fa fa-plus"></span> Nuevo Producto
                        </button>
                <table id="productosTable" class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Producto</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Stock</th>
							<th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Los datos se cargarán aquí mediante AJAX -->
                    </tbody>
                </table>
                </div>
        </div>
			</section>

			<!-- Main content -->
			<section class="content">
			</section>
			<!-- /.content -->
		</div>
		<!-- /.content-wrapper -->
		<!-- Main Footer -->
		<footer class="main-footer hidden-xs">
			<div class="pull-right hidden-xs">
				<b>Version</b> 1.0.0
			</div>
			<center>
			<strong>Copyright &copy; 2024 Master In Pets.</strong> Todo los derechos Reservados
		</center>
		</footer>
	</div>
	<!-- ./wrapper -->
	<!-- REQUIRED JS SCRIPTS -->
	<!-- Bootstrap 3.3.6 -->
    <script src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.21/js/dataTables.bootstrap4.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>

	<script src="../Content/plugins/bootstrap/js/bootstrap.min.js"></script>
	<!-- Jquery Validation -->
	<script src="../Content/plugins/Jquery.Validation/jquery.validate.min.js"></script>
	<script src="../Content/plugins/Jquery.Validation.unobtrusive/jquery.validate.unobtrusive.min.js"></script>
	<script src="../Content/plugins/MvcFoolProof/mvcfoolproof.unobtrusive.min.js"></script>
	<!-- Jquery Form -->
	<script src="../Content/plugins/Jquery.form/jquery.form.min.js"></script>
	<!-- Select 2 -->

	<script src="../Content/plugins/select2/js/select2.min.js"></script>
	<!-- AdminLTE App -->
	<script src="../Content/adminLTE/adminLTE/js/app.min.js"></script>
	<!-- Jquery unibtrusive ajax  -->
	<script src="../Content/plugins/Jquery.unibtrusive.ajax/jquery.unobtrusive-ajax.min.js"></script>
	<!-- Boostrap.Notify  -->
	<script src="../Content/plugins/Boostrap.Notify/bootstrap-notify.min.js"></script>
	<!--sweetalert-->
	<script src="../Content/plugins/sweetalert/sweetalert.min.js"></script>
	<script src="../Content/plugins/sweetalert2/sweetalert2.min.js"></script>

	<!-- iCheck -->
	<script src="../Content/plugins/iCheck/icheck.min.js"></script>
	<!--Helper de Format Date-->
	<script src="../Content/plugins/Date.Format/date.format.min.js"></script>
  
    <!--Intense-->
	<script src="../Content/plugins/Intense/intense.js"></script>
	<!--SlimScroll-->
	<script src="../Content/plugins/slimScroll/jquery.slimscroll.min.js"></script>
	<script>
var table;  
var valor, editar = 0; 

$(document).ready(function () {
    $('.select2').select2();
    $.ajax({
        url: '../controllers/Categoria/ListaCategorias.php',
        type: 'GET',
        success: function(data) {
            $('#categoria').html(data);
        },
        error: function() {
            alert('Error al cargar las categorías');
        }
    });
    table = $('#productosTable').DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
        },
        "pageLength": 10
    });
    cargaProductos();
});

function guardar() {
    if (editar == 0) {
        guardar_form();  
    } else {
        actualizar_form(); 
        editar = 0; 
    }
}

function eliminar_form(id){
		$.ajax({ type:"POST",
		         url: '../controllers/Producto/EliminarProducto.php',
                     async: false,
				 data:{id:id},
				     success: function(result){
                valor = result.substring(2,result.length);
            }});
		Swal.fire({
			  icon: 'ok',
			  title: 'Eliminacion de Producto',
			  text: valor
			});
		
			cargaProductos();
   
   }


function ver_form(i) {
    document.getElementById("id").value = "";
    $('#producto').val("");
    $('#descripcion').val("");
    $('#precio').val("");
    $('#stock').val("");
    $('#categoria').val(null).trigger('change'); 
    $('#image').val(''); 
    $('#imagePreview').attr('src', '../Content/image/blank_image.png'); 
    $('#imageLabel').text(''); 

    document.getElementById("form").style.display = "block";
    document.getElementById("ListaProductos").style.display = "none";

    if (i == 1) {
        document.getElementById("indice").style.display = "block";
    } else {
        document.getElementById("indice").style.display = "none";
    }
}

function cancelar_form() {
    document.getElementById("form").style.display = "none";
    document.getElementById("ListaProductos").style.display = "block";
    editar = 0;  
}


function editar_form(id) {
    ver_form(1);  
    editar = 1;   

    $.ajax({
        type: "POST",
        url: "/tf/controllers/Producto/EditarProducto.php",
        data: { id: id },
        success: function(response) {
            var datos = response.split(',');
			console.log(datos); 
            if (datos.length === 6) {
                document.getElementById("id").value = id;
                $('#producto').val(datos[0]);
                $('#descripcion').val(datos[1]);
                $('#precio').val(datos[2]);
                $('#stock').val(datos[3]);
                $('#categoria').val(datos[4]).trigger('change');
				var imagePath = '.././img/' + datos[5];
                $('#imagePreview').attr('src', imagePath);  
                $('#imageLabel').text('Imagen actual: ' + datos[5]);  
            } else {
                alert("Error al cargar los datos del producto.");
            }
        },
        error: function() {
            alert("Error al cargar los datos del producto.");
        }
    });
}


function actualizar_form() {
    var form = $('#alumnoForm')[0]; 
    var formData = new FormData(form);
    formData.append('id', $('#id').val());
    $.ajax({
        type: "POST",
        url: '/tf/controllers/Producto/ActualizarProducto.php', 
        data: formData,
    processData: false,
    contentType: false,
    success: function(response) {
        console.log(response);  
        Swal.fire({
            icon: 'success',
            title: 'Producto Actualizado',
            text: response
        });
    },
    error: function(xhr, status, error) {
        console.error("Error al actualizar: " + xhr.responseText);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar el producto.'
        });
    }
});
						cancelar_form();
						cargaProductos();
}
function guardar_form() {
    var form = $('#alumnoForm')[0]; 
    var formData = new FormData(form); 

    $.ajax({
        type: "POST",
        url: '/tf/controllers/Producto/AgregarProducto.php',
        data: formData,
		async:false,
        contentType: false, 
        processData: false, 
		success: function (result) {
    		Swal.fire({
					icon: 'success',
					title: 'Registro de Productos',
					text: result,
					showConfirmButton: true,
					confirmButtonText: 'Aceptar'
				}).then((result) => {
					if (result.value) {
						cancelar_form();
						cargaProductos();
					}
				});
			},
			error: function (xhr, status, error) {
            console.error("Error al guardar: " + error);
        }
    });
}
function cargaProductos() {
    $.ajax({
        type: "POST",
        url: "../controllers/Producto/ListaProductos.php",
        success: function(data) {
            if (table) {
                table.clear().draw();
                table.rows.add($(data)).draw();
            } else {
                console.error("La tabla no está inicializada.");
            }
        },	
        error: function() {
            alert('No se pudo cargar la información de los productos');
        }
    });
}
</script>
</body>
</html>
