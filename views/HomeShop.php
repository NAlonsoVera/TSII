
<?php
session_start();  // Asegurarse de iniciar la sesión
?>
<!DOCTYPE html>
<html lang="es-pe">
<head>
    <meta charset="UTF-8">
    <meta name="title" content="Gustilandia" />
    <meta name="description" content="" />
    <meta name="keywords" content="">
    <meta property="og:title" content="Gustilandia">
    <meta property="og:description" content="">
    <meta property="og:image" content="">
    <meta property="og:url" content="">
    <meta property="og:site_name" content="Gustilandia">
    <meta property="og:type" content="website">
    <meta name="author" content="Web altoque" />
    <meta name="Resource-type" content="Document" />
    <meta http-equiv="X-UA-Compatible" content="IE=5; IE=6; IE=7; IE=8; IE=9; IE=10">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
    <title>Master In Pets</title>
    <!-- FAVICON -->
    <link rel="icon" type="image/png" href="~/Content/favicon.ico">
    <!-- CSS -->
    <link rel="stylesheet" href="../Content/fonts/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="../Content/plugins/bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" href="../Content/plugins/jquery.dlmenu/component.css" />
    <link rel="stylesheet" href="../Content/js/owl-carousel/owl.carousel.min.css">
    <link rel="stylesheet" href="../Content/js/owl-carousel/owl.theme.default.min.css">
    <link rel="stylesheet" href="../Content/css/app.min.css">
    <link rel="stylesheet" href="../Content/css/_responsive.min.css">
    <link rel="stylesheet" href="../Content/plugins/sweetalert2/sweetalert2.css" />

    <style type="text/css">
        .catalogo_link {
            margin: 0 25px !important;
        }

            .catalogo_link img {
                width: 12px;
                margin-left: 10px;
                position: relative;
                top: -2px;
            }
    </style>
    <style type="text/css">
        
        .input-group {
            display: flex;
            align-items: center;
        }

        #search {
            flex: 1; 
            padding: 8px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 4px 0 0 4px;
            box-sizing: border-box;
            outline: none; 
        }

        .search-btn {
            padding: 8px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-left: 0;
            border-radius: 0 4px 4px 0;
            background-color: #ebeaea;
            cursor: pointer;
            outline: none; 
        }

            .search-btn:hover {
                background-color: #ebeaea; 
                border-color: #ccc; 
            }

            .search-btn:focus {
                box-shadow: none;
            }

        #productosList {
            position: absolute;
            top: 100%;
            left: 0;
            z-index: 1000;
            background-color: #fff;
            border: 1px solid #ccc;
            border-top: none;
            list-style: none;
            padding-left: 0;
            width: calc(100% - 2px);
            max-height: 150px;
            overflow-y: auto;
            margin-top: -1px;
            display: none;
        }

            #productosList li {
                padding: 8px 12px;
                cursor: pointer;
            }

                #productosList li:hover {
                    background-color: #f5f5f5;
                }
        .relative{
            color:white;
            transition: all 0.35s ease-in-out;
        }

        .relative:hover{
            color:greenyellow;
            
        }
    </style>


    <link rel="stylesheet" href="../Content/plugins/Jquery.CustomScrollBar/jquery.mCustomScrollbar.css">

       

 

    <!-- Facebook Pixel Code -->

    <!-- End Facebook Pixel Code -->

</head>
<body>

    <div id="search-loading" class="hidden"></div>

    <div id="menu-loading" class="hidden"></div>

    <div id="mobile"></div>

    <div class="loading" id="loading">
        <div class="loading__inner">
            <img src="../Content/image/icons/loading_page.gif" alt="Gustilandia" class="" />
        </div>
    </div>

    <div class="loading-tesoro" id="loading-tesoro">
        <div class="loading__inner">
            <img src="../Content/image/icons/loading_page.gif" alt="Gustilandia" class="" />
        </div>
    </div>

    <header>

        <div class="header-content grid-content grid-80-20">
            <input type="hidden" value="@(cliente != null ? cliente.pk_eCliente : 0)" id="pk_eCliente_g" />
            <div class="info-align-center">

                    <ul id="menuMobile" class="nav-mobile @(Request.Url.AbsoluteUri.Contains("Perfil") ? "menu-mobile" : "")">

                        <li class="">
                            <a href="/"><i class="fa fa-remove"></i></a>
                        </li>
                    </ul>
                

                <ul id="menuMobile" class="@(Request.Url.AbsoluteUri.Contains("Perfil") ? "menu-not-mobile" : "nav-not-mobile")">
                    <li class="nav_mobile"><img src="../Content/image/icons/svg/nav.svg" alt="Navegación" /></li>
                    <li class="user_mobile"><a href="@(cliente == null ? "/Login/Index" : "/Perfil")"><img src="../Content/image/icons/svg/user.svg" alt="Usuario" /></a></li>
                    <li class="carrito_mobile"><a href="/ShoppingCart"><img src="../Content/image/icons/svg/cart.svg" alt="Mi Carrito" /></a></li>
                </ul>

                <a href="/" class="logo_Gustilandia @(Request.Url.AbsoluteUri.Contains("Perfil") ? "menu-not-mobile" : "")">
                    <img src="../Content/image/masterinpetslogo.png" class="logo" alt="" title="Gustilandia">
                </a>


                <div class="form-content @( (Request.Url.AbsoluteUri.Contains("LibroReclamacion") || Request.Url.AbsoluteUri.Contains("PreguntasFrecuentes") || Request.Url.AbsoluteUri.Contains("Perfil")) ? "hidden" : "") @(Request.Url.AbsoluteUri.Contains("Perfil") ? "menu-not-mobile" : "")" id="Buscador">
                    <form action="/Producto" method="GET">
                        <div class="input-group">
                            <input type="text" name="descr" id="search" class="form-control" placeholder="Buscar productos">
                            <button type="submit" class="btn btn-primary search-btn"><i class="fa fa-search"></i></button>
                        </div>
                        <ul id="productosList" class="productos-lista">
                            <li value="todas">Productos</li>

                                <li value="@producto.pk_eProducto">@producto.cProducto</li>

                        </ul>
                    </form>
                </div>




            </div>

            <div>
                <ul>

                <li>
                    <?php if(isset($_SESSION['name'])): ?>
                        <a href="/Perfil" class="account-text" title="Mi Perfil">
                            <?= $_SESSION['name'] ?> <i class="fa fa-user-circle-o"></i>
                        </a>
                    <?php else: ?>
                        <a href="../index.php" class="account-text" title="Mi Cuenta">
                            Mi Cuenta <i class="fa fa-user-circle-o"></i>
                        </a>
                    <?php endif; ?>
                </li>                
                <li>
                    <a href="/ShoppingCart" title="Mi Carrito">
                        <img src="../Content/image/icons/cart.png" alt="">
                        <span class="cart-no" id="cart-count">0</span>
                    </a>
                </li>

                </ul>
            </div>
        </div>

        <div id="navigation" class="grid-content grid-4-6">

            <!--DESKTOP-->
            <ul class="nav">
                <li class="menu-main">
                    <a href="javascript:void(0)" class="menu-main-a">Categorías <i class="fa fa-angle-down" aria-hidden="true"></i></a>
                    <ul class="sub-menu">

                            <li>
                                <a href="/Producto?categoria=@categoria.cCategoriaSinTilde">@categoria.cCategoria</a>

                                    <div class="sub sub-menu">


                                        <h5> @categoria.cCategoria </h5>
                                        <div class="grid-content grid-three gap-0-1-2-5">

                                                <div>
                                                    <a href="/Producto/Details/@pro.pk_eProducto">@pro.cProducto</a>
                                                </div>
                                            
                                        </div>
                                    </div>
                                
                            </li>
                        
                    </ul>
                </li>
                <li class="menu-main">
                        <a href="" class="menu-main-a">Marcas <i class="fa fa-angle-down" aria-hidden="true"></i></a>
                        <ul class="sub-menu">

                                <li>
                                    <a href="javascript:vodi(0)">@marca.cMarca</a>

                                        <div class="sub sub-menu">
                                            <h5> @marca.cMarca </h5>
                                            <div class="grid-content grid-three gap-0-1-2-5">

                                                    <div>
                                                        <a href="/Producto/Details/@pro.pk_eProducto">@pro.cProducto</a>
                                                    </div>
                                                
                                            </div>
                                        </div>
                                    

                                </li>
                            
                        </ul>
                    </li>
            </ul>

            <div class="nav-main">
                <ul>
                    <li><a href="././LayoutGeneral.php" >Home </a></li>
                    <li><a href="././HomeShop.php" >Shop</a></li>
                    <li><a href="/Helper/Contacto" class="@(ViewContext.RouteData.Values["Action"].ToString().ToLower() == "contacto" ? "active" : "")">Contacto</a></li>
                   
                </ul>
            </div>

            <!-- MOBILE -->
            <div id="dl-menu" class="dl-menuwrapper">
                <button class="dl-trigger">Open Menu</button>

                <ul class="dl-menu">
                    <li>
                        <a href="#" class="menu-action">Categorías</a>

                            <ul class="dl-submenu">

                                    <li>
                                        <a class="subcategoria-action" href="@(lsProductos.Any(x => x.fk_eCategoria == categoria.pk_eCategoria) ? "javascript:Void(0)" : "/Producto?categoria=" + categoria.cCategoriaSinTilde)">@categoria.cCategoria</a>

                                            <ul class="dl-submenu">

                                                    <li><a href="/Producto/Details/@pro.pk_eProducto">@pro.cProducto</a></li>
                                                
                                            </ul>
                                        
                                    </li>
                                
                            </ul>
                        
                    </li>
                    <li>
                        <a href="#" class="menu-action">Marcas</a>

                            <ul class="dl-submenu">

                                    <li>
                                        <a href="#"> @marca.cMarca </a>
                                        <ul class="dl-submenu">

                                                <li>
                                                    <a href="/Producto/Details/@pro.pk_eProducto">@pro.cProducto</a>
                                                </li>
                                            
                                        </ul>
                                    </li>
                                
                            </ul>
                        
                    </li>
                    <li><a href="/Producto">Shop</a></li>
                    <li><a href="/Helper/Nosotros">Nosotros</a></li>
                    <li><a href="/Helper/Postulacion">Postule</a></li>
                    <li><a href="/Helper/Contacto">Contacto</a></li>
                </ul>
            </div><!-- /dl-menuwrapper -->
        </div>

    </header>

    <div class="container mt-4">
    <h3 class="text-center">Productos</h3>
    <div class="row" id="product-container">
        <!-- Los productos se cargarán aquí mediante AJAX -->
    </div>
</div>
    <!-- Suscríbete -->
    <section class="acciones row-section desktop-footer @(Request.Url.AbsoluteUri.Contains("Postulacion") ? "hidden" :  "")">
        <div class="content">
            <div class="grid-content grid-30-30-40 gap-1-5">
                <div class="pt-35">
                    <h5>Aceptamos</h5>
                    <img src="../Content/image/tarjetas1.png" alt="">
                </div>

            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>

        <div class="content desktop-footer">
            <div class="grid-content grid-30-15-15-20-20 gap-1-5">
                <div>
                  
                    <div class="contact-us mt-40">
                        <div>
                            <ul class="redes">
                                <li><img src="../Content/image/icons/call.png" alt=""></li>
                                <li>
                                    <p>
                                        Ayuda <span>Consultas</span> <br>
                                        +51 924 121 113
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div class="mt-20" style="padding-left: 70px !important;">
                            <p>Siguenos</p>
                            <ul class="redes">
                                <li><a href="https://www.facebook.com/masterinpetsla/?locale=es_LA" target="_blank"><img src="../Content/image/icons/facebook.png" alt=""></a></li>
                                <li><a href="https://www.instagram.com/masterinpets/" target="_blank"><img src="../Content/image/icons/instagram.png" alt=""></a></li>

                            </ul>
                        </div>
                    </div>
                </div>
                <br>    
                <div>
                    <h5 style="font-weight:bold">Productos</h5>
                    <ul>
                        <li><a class="relative" href="/Producto">Categorías</a></li>
                        <li><a class="relative" href="/Producto">Marcas</a></li>
                        <li><a class="relative" href="/Producto">Promociones</a></li>
                        <li><a class="relative" href="/Producto">Legales</a></li>
                    </ul>
                </div>
               
                <div>
                    <h5 style="font-weight:bold">Contáctanos</h5>
                    <ul>
                        <li><a class="relative" target="_blank" href="https://api.whatsapp.com/send?phone=+51924121113&text=Hola%20Master%20In%20Pets%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20servicios%20que%20vi%20en%20la%20web"><i class="fa fa-phone"></i> +51 924 121 113</a></li>
                        <li><a class="relative" target="_blank" href="mailto:Citypetsveterinaria@gmail.com"><i class="fa fa-envelope"></i>Citypetsveterinaria@gmail.com</a></li>
                        <li><a class="relative" target="_blank" href="https://maps.app.goo.gl/fQ6QeAUHtxKyx7y58"><i class="fa fa-map-marker"></i> Avenida Haya De La Torre, Int. 982-984 La Perla Distrito:Callao, Callao 07016</a></li>
                        <li><a class="relative" href="/Helper/LibroReclamacion">Libro de reclamaciones</a></li>
                    </ul>
                    <div class="mt-40"><p>&copy; 2024 Master In Pets | Todos los derechos reservados. </p></div>
                </div>
            </div>
        </div>


        <div class="content mobile-footer">
            <div class="grid-content grid-footer-45-65">
                <div>
                    <img src="../Content/image/icons/svg/Gustilandia_footer.svg" alt="">
                </div>
                <div>
                    <p class="siguenos">Siguenos</p>
                    <ul class="redes">
                        <li><a href="https://www.facebook.com/masterinpetsla/" target="_blank"><img src="../Content/image/icons/facebook.png" alt=""></a></li>
                        <li><a href="https://www.instagram.com/masterinpets/" target="_blank"><img src="../Content/image/icons/instagram.png" alt=""></a></li>
                    </ul>
                </div>
            </div>
            <div class="grid-content grid-one">
             

                <button class="accordion_footer" type="button">
                    Productos <i class="fa fa-chevron-down"></i>
                </button>
                <div class="panel">
                    <ul>
                        <li><a href="/Producto">Categorías</a></li>
                        <li><a href="/Producto">Marcas</a></li>
                        <li><a href="/Producto">Promociones</a></li>
                        <li><a href="/Producto">Legales</a></li>
                    </ul>
                </div>

              

                <button class="accordion_footer" type="button">
                    Contáctanos <i class="fa fa-chevron-down"></i>
                </button>
                <div class="panel">
                    <ul>
                        <li><a class="relative" target="_blank" href="https://api.whatsapp.com/send?phone=+51924121113&text=Hola%20Master%20In%20Pets%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20servicios%20que%20vi%20en%20la%20web"><i class="fa fa-phone"></i> +51 924 121 113</a></li>
                        <li><a href="mailto:Citypetsveterinaria@gmail.com"><i class="fa fa-envelope"></i> Citypetsveterinaria@gmail.com</a></li>
                        <li><a href="javascript:void(0)"><i class="fa fa-map-marker"></i> Avenida Haya De La Torre, Int. 982-984 La Perla Distrito:Callao, Callao 07016</a></li>
                        <li><a href="/Helper/LibroReclamacion">Libro de reclamaciones</a></li>
                    </ul>
                </div>

                <button class="accordion_footer" type="button">
                    Preguntas Frecuentes <i class="fa fa-chevron-down"></i>
                </button>
                <div class="panel">
                    <ul>
                        <li><a href="/Helper/PreguntasFrecuentes">Preguntas frecuentes</a></li>
                    </ul>
                </div>

                <div class="suscribete">
                    <h5>Suscríbete</h5>
                    <p>Recibe Información de nuestras promociones, novedades  y descuentos.</p>

                        <div class="input-group">
                            <input type="email" name="cEmail" id="" placeholder="Correo electrónico" required>
                            <button type="submit">Enviar</button>
                        </div>
                    
                </div>

                <div class="medio_pago">
                    <p>Medios de Pago</p>
                    <ul>
                        <li><img src="../Content/image/icons/svg/visa.svg" alt="Visa" /></li>
                        <li><img src="../Content/image/icons/svg/mastercard.svg" alt="Mastercard" /></li>
                        <li><img src="../Content/image/icons/svg/bcp.svg" style="width: 58px" alt="Bcp" /></li>
                        <li><img src="../Content/image/icons/svg/interbank.svg" style="width:83px;" alt="Interbank" /></li>
                    </ul>
                    <ul>
                        <li><img src="../Content/image/icons/svg/yape.svg" alt="Yape" /></li>
                        <li><img src="../Content/image/icons/svg/plin.svg" style="width:40px" alt="Plin" /></li>
                        <li><img src="../Content/image/icons/svg/transferencia.svg" style="width:58px" alt="Transferencia" /></li>
                        <li>
                            <img src="../Content/image/icons/svg/deposito_online.svg" style="margin-left: 12px; display: block;" alt="Depósito onlineo agencia" />
                            <img src="../Content/image/icons/svg/deposito_online_texto.svg" style=" width: 63px; margin-top: 12px;" alt="Alternate Text" />
                        </li>
                    </ul>
                </div>

                <div class="copy-info"><p>&copy; @DateTime.Now.Year Gustilandia | Todos los <br /> derechos reservados. </p></div>
            </div>
        </div>

    </footer>

    <script type="text/javascript" src="../Content/js/jquery/3.5.1/jquery.min.js"></script>

    <!-- Jquery Validation -->
  
    <!-- Jquery Form -->
    <script type="text/javascript" src="../Content/plugins/Jquery.form/jquery.form.min.js"></script>
    <script type="text/javascript" src="../Content/plugins/sweetalert2/sweetalert2.all.min.js"></script>
    <script type="text/javascript" src="../Content/plugins/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../Content/js/app.min.js"></script>
    <script type="text/javascript" src="../Content/plugins/jquery.dlmenu/modernizr.custom.js"></script>
    <script type="text/javascript" src="../Content/plugins/jquery.dlmenu/jquery.dlmenu.js"></script>
    <script>
        // Variables de PHP a JavaScript
        <?php
        if(isset($_SESSION['session_email']) && isset($_SESSION['name'])) {
            echo "var userEmail = " . json_encode($_SESSION['session_email']) . ";";
            echo "var userName = " . json_encode($_SESSION['name']) . ";";
            echo "var userCarrito = " . json_encode($_SESSION['carrito_id']) . ";";
            echo "console.log('Bienvenido, ' + userName + ' (' + userEmail + ')' + userCarrito);";
        } else {
            echo "window.location.href = 'login.php';";  // Redirige si no está logueado
            exit;
        }
        ?>
    </script>
    <script>

        $(function () {
            $('#dl-menu').dlmenu();

            $('#search').on('click', function () {
                //alert("Clic detectado");
                $('#productosList').show(); // Mostrar la lista de opciones al hacer clic en el input
            });

            $(document).on('click', function (event) {
                if (!$(event.target).closest('.select-wrapper').length) {
                    $('#productosList').hide(); // Ocultar la lista de opciones cuando se hace clic fuera del select
                }
            });

            $('#search').on('input', function () {
                var filtro = $(this).val().toLowerCase();
                $('#productosList li').each(function () {
                    var producto = $(this).text().toLowerCase();
                    $(this).toggle(producto.includes(filtro));
                });
                $('#productosList').show(); // Mostrar la lista de opciones al escribir en el input
            });
        });

        $('#productosList li').on('click', function () {
            var productoSeleccionado = $(this).attr('value');
            if (productoSeleccionado !== "todas") {
                window.location.href = "/Producto/Details/" + productoSeleccionado;
            }
        });
        $(document).ready(function() {
            $('#cart-count').text(userCarrito); 
                cargarProductos();
                buscarDetalleCarrito(userCarrito);
            });

            function cargarProductos() {
                $.ajax({
                    url: '../controllers/Producto/MostrarProducto.php',  // Ruta al archivo PHP
                    type: 'GET',                         // Método de la solicitud
                    success: function(data) {            // Función a ejecutar si la solicitud es exitosa
                        $('#product-container').html(data);
                    },
                    error: function(xhr, status, error) {  // Función a ejecutar si hay un error en la solicitud
                        console.error("Error al cargar productos: " + error);
                        $('#product-container').html('<p>Ocurrió un error al cargar los productos.</p>');
                    }
                });
            }
/*
            function agregarAlCarrito(pkProducto) {
                console.log("Producto agregado al carrito: " + pkProducto);
            }*/
            

            function agregarAlCarrito(pkProducto) {
                var pkCarrito = userCarrito; // Asegúrate de que esta variable está correctamente definida y accesible
                console.log("Producto agregado al carrito: " + pkProducto+ ','+userCarrito );

                
                $.ajax({
                    url: '../controllers/Carrito/AgregarDetalleCarrito.php', // Asegúrate de que la ruta es correcta
                    type: 'POST',
                    asyn: false,
                    data: {
                        pkProducto: pkProducto,
                        pkCarrito: pkCarrito
                    },
                    success: function(response) {
                        console.log('Respuesta del servidor:', response);
                        // Aquí puedes agregar lógica adicional para actualizar la interfaz de usuario,
                        // como mostrar un mensaje de éxito, actualizar el número total de ítems en el carrito, etc.
                        alert('Producto añadido al carrito correctamente.');
                        buscarDetalleCarrito(userCarrito); // Actualizar el número en el ícono del carrito
                    },
                    error: function(xhr, status, error) {
                        console.error('Error al añadir producto al carrito:', xhr.responseText);
                        alert('No se pudo añadir el producto al carrito.');
                    }
                });
            }




            function buscarDetalleCarrito(userCarrito) {
            $.ajax({
                url: '../controllers/Carrito/BuscarDetalleCarrito.php', 
                type: 'POST',
                async: false,
                data: { userCarrito: userCarrito },
                success: function(response) {
                    console.log('Respuesta recibida:', response); 
                    $('#cart-count').text(response); 
                },
                error: function(xhr, status, error) {
                    console.error('Error al realizar la petición:', xhr.responseText);
                }
            });
        }
    </script>


    <script type="text/javascript" src="../Content/plugins/Jquery.CustomScrollBar/jquery.mCustomScrollbar.concat.min.js"></script>
    <script type="text/javascript" src="../Content/js/owl-carousel/owl.carousel.min.js"></script>

    <script type="text/javascript">
        var acc = document.getElementsByClassName("accordion_footer");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
            });
        }
    </script>


</body>
</html>
