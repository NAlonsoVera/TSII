var OnSuccessGuardarImagenPedido, OnFailureGuardarImagenPedido;

$(function () {

    const direccionEnvioContenido = document.querySelector("#direccionEnvioContenido");
    const metodoPagoContenido = document.querySelector("#metodoPagoContenido");
    const facturacionContenido = document.querySelector("#facturacionContenido");
    const listProductInCart = document.querySelector("#listProductInCart");
    const facturacionContenidoCuerpo = document.querySelector("#facturacionContenidoCuerpo");
    const divImagenPago = document.querySelector(".imagenPago");
    const $frmGuardarImagenPedido = $("#frmGuardarImagenPedido");

    const btnAgregarDireccion = document.querySelector(".btnAgregarDireccion");
    const btnCambiarDireccion = document.querySelector(".btnCambiarDireccion");
    const btnGuardarCambiosDireccion = document.querySelector(".btnGuardarCambiosDireccion");
    const btnCancelarSeleccionDireccion = document.querySelector(".btnCancelarSeleccionDireccion");
    const btnGuardarCambiosFacturacion = document.querySelector(".btnGuardarCambiosFacturacion");
    const btnEditarDatosFacturacion = document.querySelector(".btnEditarDatosFacturacion");
    const btnCancelarCambioFacturacion = document.querySelector(".btnCancelarCambioFacturacion");
    const btnFinalizarCompra = document.querySelector(".btnFinalizarCompra");

    const chkSolicitarFactura = document.querySelector("#chkSolicitarFactura");

    const cNumeroRuc = document.querySelector("#cNumeroRuc");
    const cDireccionFiscal = document.querySelector("#cDireccionFiscal");
    const cRazonSocial = document.querySelector("#cRazonSocial");
    const cTelefonoContacto = document.querySelector("#cTelefonoContacto");
    //const montoEfectivo = document.querySelector("#dMontoEfectivo");


    btnAgregarDireccion.addEventListener("click", nuevaDireccion);
    btnCambiarDireccion.addEventListener("click", mostrarListadoDirecciones);
    btnGuardarCambiosDireccion.addEventListener("click", guardarCambiosSelectDireccion)
    btnCancelarSeleccionDireccion.addEventListener("click", cancelarCambiosSelectDireccion)
    btnGuardarCambiosFacturacion.addEventListener("click", guardarDatosFacturacion)
    btnFinalizarCompra.addEventListener("click", finalizarPedido);
    btnEditarDatosFacturacion.addEventListener("click", editarDatosFacturacion);
    btnCancelarCambioFacturacion.addEventListener("click",cancelarCambioFacturacion);

    //montoEfectivo.addEventListener("keyup", validarIsNumerico)
    //montoEfectivo.addEventListener("change", validarPagoContraEntrega)
    chkSolicitarFactura.addEventListener("change", mostrarDatosFacturacion)
    cNumeroRuc.addEventListener("keyup", validarDatosFacturacion);
    cNumeroRuc.addEventListener("change", validarRuc);
    cDireccionFiscal.addEventListener("keyup", validarDatosFacturacion);
    cTelefonoContacto.addEventListener("keyup", validarDatosFacturacion);
    cRazonSocial.addEventListener("keyup", validarDatosFacturacion);

    listProductInCart.addEventListener("click", realizarAccion)

    listarProductos();

    function validarRuc(e) {
        let numeroRuc = cNumeroRuc.value.length
        const componente = document.querySelector(".messageRucInvalido");

        if (numeroRuc === 11) {
            mostrarMensaje(true, "", componente)
        }
        else {
            mostrarMensaje(false, "Ruc inválido", componente)
        }
    }

    function editarDatosFacturacion(e) {

        const datosFacturacion = document.querySelectorAll("#datosFacturacion .col-sm-6")
        datosFacturacion.forEach(nodo => nodo.classList.remove("d-none"))
        e.target.classList.add("d-none");
        facturacionContenidoCuerpo.classList.add("d-none");
        btnGuardarCambiosFacturacion.classList.remove("d-none");
        btnGuardarCambiosFacturacion.removeAttribute("disabled");
        btnCancelarCambioFacturacion.classList.remove("d-none");


    }

    function finalizarPedido() {

        const formData = new FormData();
        const pk_ePedido = document.querySelector("#pk_ePedido").value;
        const fk_eMedioPago = parseInt(document.querySelector("input[name='medioPago']:checked").value);
        const fk_eMetodoPago = parseInt(document.querySelector("input[name='metodoPago']:checked").value);
        const fk_eClienteDireccionEnvio = document.querySelector("#direccionContenido").dataset.pkclientedireccion;
        const solicitudFactura = document.querySelector("#chkSolicitarFactura").checked;
        const precioEnvio = parseFloat(document.querySelector("#tdPrecioEnvio").dataset.precioenvio);

        const pedido = {
            fk_eMedioPago: null,
            fk_eMetodoPago:null,
            dMontoEfectivo: null,
            fk_eClienteDireccionEnvio: null,
            fk_eEstadoPedido: 7,
            pk_ePedido: pk_ePedido,
            dPrecioEnvio: precioEnvio
        };


        if (fk_eMedioPago !== MedioPago.PagoContraEntrega && fk_eMedioPago !== MedioPago.TarjetaCreditoDebito) {

            let file = document.getElementById("himage").files[0];

            if (file) {
                formData.append("himage", file);
            }
            else {
                Swal.fire(
                    'Faltan Datos!',
                    'Debe adjuntar una imagen del pago realizado!',
                    'info'
                )
                return;
            }
        }

        if (fk_eMedioPago === MedioPago.TarjetaCreditoDebito) {
            if (!$("#terminos_niubiz").is(':checked')) {
                Swal.fire(
                    'Faltan Datos!',
                    'Debe aceptar los términos y condiciones!',
                    'info'
                )
                return;
            }
        }

        //FACTURACION
        if (solicitudFactura) {
            const datosFacturacion = obtenerDatosFacturacion();

            if (datosFacturacion.cRazonSocial === '' || datosFacturacion.cNumeroRuc === '' ||
                datosFacturacion.cDireccionFiscal === '' || datosFacturacion.cTelefonoContacto === '') {
                Swal.fire(
                    'Faltan Datos!',
                    'Debe ingresar los datos de Facturación!',
                    'error'
                )
                return;
            }

            pedido.cNumeroRuc = datosFacturacion.cNumeroRuc;
            pedido.cRazonSocial = datosFacturacion.cRazonSocial;
            pedido.cDireccionFiscal = datosFacturacion.cDireccionFiscal;
            pedido.cTelefonoContacto = datosFacturacion.cTelefonoContacto;


        }

        pedido.fk_eClienteDireccionEnvio = fk_eClienteDireccionEnvio;
        pedido.fk_eMedioPago = fk_eMedioPago;

        if (fk_eMedioPago === MedioPago.PagoContraEntrega)//CONTRA ENTREGA
            pedido.fk_eMetodoPago = fk_eMetodoPago;

        if (pedido.fk_eClienteDireccionEnvio === null || fk_eClienteDireccionEnvio==='') {
            Swal.fire(
                'Faltan Datos!',
                'Debe ingresar una dirección de envio!',
                'error'
            )
            return;
        }
        else {
            Swal.fire({
                title: 'Falta poco!!',
                text: "¿Estas seguro de finalizar tu pedido?",
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#755C78',
                cancelButtonColor: '#B2B2B2',
                confirmButtonText: 'Si',
                cancelButtonText: 'No',
            }).then((result) => {

                if (result.value) {

                    if (pedido.fk_eMedioPago === MedioPago.TarjetaCreditoDebito) {
                        Culqi.open();
                    } else {
                        FinalizarPedidoOtros(pedido, formData);
                    }
                }
            })
        }
    }

    //function FinalizarPedidoNiubiz(pedido) {

    //    $(".loading").show();

    //    const formData = new FormData();

    //    Object.keys(pedido).forEach(key => {
    //        formData.append(key, pedido[key])
    //    })

    //    fetch(`/CheckOut/TokensAccessNiubiz`, {
    //        method: 'POST',
    //        contentType: false,
    //        processData: false,
    //        body: formData,
    //        headers: {
    //            'enctype': 'multipart/form-data'
    //        }
    //      })
    //        .then(resultado => resultado.json())
    //        .then(data => {

    //            $(".loading").hide();

    //            VisanetCheckout.configure({
    //                sessiontoken: data.result.sessionKey,
    //                channel: 'web',
    //                merchantid: '650192448',
    //                purchasenumber: data.cCodigoCompraNiubiz,
    //                amount: data.monto,
    //                expirationminutes: '20',
    //                timeouturl: 'about:blank',
    //                merchantlogo: 'https://kusipata.pe/Content/image/logo_kusipata_naranja.svg',
    //                formbuttoncolor: '#000000',
    //                action: '/CheckOut/AutorizacionTransaccion?id='+pedido.pk_ePedido,
    //                complete: function (params) {

    //                    console.log(JSON.stringify(params));
    //                    Swal.fire({
    //                        html: '<img src="/Content/image/finalizacionCompra.png">',
    //                        showCancelButton: true,
    //                        confirmButtonColor: '#fff',
    //                        cancelButtonColor: '#fff',
    //                        confirmButtonText: 'Ir a mis pedidos',
    //                        cancelButtonText: 'Ir a home',
    //                        allowOutsideClick: false
    //                    });

    //                },
    //                error: function (err) {
    //                    Swal.fire(
    //                        'Error!',
    //                        'Ocurrió un error al guardar la información',
    //                        'error'
    //                    )
    //                    return;
    //                }
    //            });
    //            VisanetCheckout.open();
    //        });
    //}

    function FinalizarPedidoOtros(pedido, formData) {

        Object.keys(pedido).forEach(key => {
            formData.append(key, pedido[key])
        });

            fetch(`/CheckOut/FinalizarPedido`, {
                method: 'POST',
                contentType: false,
                processData: false,
                body: formData,
                headers: {
                    'enctype': 'multipart/form-data'
                }
            })
            .then(resultado => resultado.json())
            .then(respuesta => {

                if (respuesta.Success) {
                   
                   // EnviarPedidoZeus(pedido.pk_ePedido)
                    Swal.fire({
                        //title: 'Gracias!!',
                        //html: respuesta.MessageError,
                        //type: 'success',
                        html: '<img src="/Content/image/finalizacionCompra.png">',
                        showCancelButton: true,
                        confirmButtonColor: '#fff',
                        cancelButtonColor: '#fff',
                        confirmButtonText: 'Ir a mis pedidos',
                        cancelButtonText: 'Ir a home',
                        allowOutsideClick: false
                    }).then((result) => {
                        $(".loading").show();
                        if (result.value) {
                            window.location.href = '/Perfil'
                        }
                        else {
                            window.location.href = '/'
                        }
                    });

                }
                else
                    console.log(respuesta.MessageError);

                $(".loading").hide();
            })
        //    .catch(error => { $(".loading").hide(); console.log(error); });
    }

    function EnviarPedidoZeus(pk_ePedidoP) {
        const pedido = { pk_ePedido: pk_ePedidoP }
       
        fetch('/CheckOut/EnviarPedidoZeus', {
                method: 'POST',
                body: JSON.stringify(pedido),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(resultado => resultado.json())
            .then(respuesta => console.log(respuesta))
            .catch(error => console.log(error));   
    }

    function mostrarMensaje(ocultar, mensaje, componente) {
     
        const componenteMensaje = componente;

        if (ocultar)
            componenteMensaje.classList.add("d-none");
        else
            componenteMensaje.classList.remove("d-none");

        componenteMensaje.textContent=mensaje
    }

    function nuevaDireccion() {
        $(".loading").show();
        invocarModal(`/Perfil/PartialDireccionMant/`, function () {
            $(".loading").hide();
            $("#modalDireccionesMant").on("hidden.bs.modal", function () {
                if(document.querySelector("#cDireccion").value !=='')
                    mostrarContenidoDireccion(null, true)
            });
        });
    }

    function mostrarContenidoDireccion(pk_DireccionEnvio, reload) {

        const direccionContenido = document.querySelector("#direccionContenido");

        fetch(`/Perfil/BuscarDireccionEnvio?pk_eClienteDireccionEnvio=${pk_DireccionEnvio}&pk_ePedido=${$("#pk_ePedido").val()}`)
            .then(resultado => resultado.json())
            .then(data => {

                const { cDireccion, cDistrito,cDepartamento,cProvincia, cReferencia, cTelefono, pk_eClienteDireccionEnvio } = data;
                direccionContenido.innerHTML = "";
                direccionContenido.dataset.pkclientedireccion = pk_eClienteDireccionEnvio
                direccionContenido.innerHTML = 
                `
                    <p>
                        <h5><i class="fa fa-map-marker" aria-hidden="true"></i> Dirección de envio</h5>
                        <br />
                        <span>${cDireccion}                                                          </span><br />
                        ${(cReferencia ? ("<span>" + cReferencia +"</span><br />") :"")}                          
                        <span> ${cDepartamento} - ${cProvincia} - ${cDistrito}                       </span><br />
                        ${(cTelefono ? ("<span>Teléfono:" + cTelefono + "</span><br />") : "")}           
                    </p>
                `;

                btnAgregarDireccion.classList.remove("d-none");
                btnCambiarDireccion.classList.remove("d-none");
                btnGuardarCambiosDireccion.classList.add("d-none");
                btnCancelarSeleccionDireccion.classList.add("d-none");

                if (reload) {
                    ActualizarDatosPedido(true);
                }
            })
    }

    function mostrarListadoDirecciones() {
        const direccionContenido = document.querySelector("#direccionContenido");

        btnAgregarDireccion.classList.add("d-none");
        btnCambiarDireccion.classList.add("d-none");
        btnGuardarCambiosDireccion.classList.remove("d-none");
        btnCancelarSeleccionDireccion.classList.remove("d-none");


        fetch(`/Perfil/ListadoDireccion`)
            .then(resultado => resultado.json())
            .then(data => {
                direccionContenido.innerHTML = '';
                direccionContenido.innerHTML = `<p><h5>Seleccione una dirección de envio</h5></p>`;
                
                const selectDireccion = document.createElement("select");
                selectDireccion.classList.add("form-control", "selectDireccioneEnvio");
                selectDireccion.innerHTML += "<option value=''></option>";

                data.data.forEach(direccion => {
                    
                    const { cDireccion, cDistrito, pk_eClienteDireccionEnvio } = direccion;

                    selectDireccion.innerHTML +=
                        `
                        <option value=${pk_eClienteDireccionEnvio}> ${cDistrito} - ${cDireccion}  </option>
                        `
                });
                direccionContenido.appendChild(selectDireccion);
            })
    }

    function guardarCambiosSelectDireccion() {

        const pk_eClienteDireccionEnvio = document.querySelector(".selectDireccioneEnvio").value;
        if (pk_eClienteDireccionEnvio !== "") {

            btnAgregarDireccion.classList.remove("d-none");
            btnCambiarDireccion.classList.remove("d-none");
            btnGuardarCambiosDireccion.classList.add("d-none");
            btnCancelarSeleccionDireccion.classList.add("d-none");

            mostrarContenidoDireccion(parseInt(pk_eClienteDireccionEnvio), true);
        }
        
    }

    function cancelarCambiosSelectDireccion() {

        const pk_eClienteDireccionEnvio = document.querySelector("#direccionContenido").dataset.pkclientedireccion;

        btnAgregarDireccion.classList.remove("d-none");
        btnCambiarDireccion.classList.remove("d-none");
        btnGuardarCambiosDireccion.classList.add("d-none");
        btnCancelarSeleccionDireccion.classList.add("d-none");

        mostrarContenidoDireccion(parseInt(pk_eClienteDireccionEnvio), false);
    }

    function ActualizarDatosPedido() {

        $(".loading").show();

        const fk_eClienteDireccionEnvio = document.querySelector("#direccionContenido").dataset.pkclientedireccion;
        const { cRazonSocial, cNumeroRuc, cDireccionFiscal, cTelefonoContacto } = obtenerDatosFacturacion();


        const pedido = {            
            fk_eClienteDireccionEnvio,
            cRazonSocial,
            cNumeroRuc,
            cDireccionFiscal,
            cTelefonoContacto
        };

        fetch(`/CheckOut/ActualizarDatosPedido`, {
            method: 'POST',
            body: JSON.stringify(pedido),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resultado => resultado.json())
            .then(data => { if (data.Success) $(".loading").hide(); window.location.href = "/CheckOut"; })
            .catch(error => {
                $(".loading").hide();
                console.log(error);
                Swal.fire(
                    'Error!',
                    'Ocurrió un error al guardar la información',
                    'error'
                );
            })
        
    }

    function validarIsNumerico(event) {

        if (event.which >= 37 && event.which <= 40) {
            event.preventDefault();
        }

        $(this).val(function (index, value) {
            return value
                .replace(/\D/g, "")
                .replace(/([0-9])([0-9]{2})$/, '$1.$2')
                .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",")
                ;
        });

    }

    function mostrarDatosFacturacion(e) {
        const datosFacturacion = document.querySelector("#datosFacturacion");

        if (e.target.checked) {
            datosFacturacion.classList.remove("d-none");
        }
        else {
            datosFacturacion.classList.add("d-none");
        }
    }

    function guardarDatosFacturacion() {

        ActualizarDatosPedido();
        mostrarFacturacionCuerpo();
    }

    function mostrarFacturacionCuerpo() {
        const datosFacturacion = document.querySelectorAll("#datosFacturacion .col-sm-6")
        datosFacturacion.forEach(nodo => nodo.classList.add("d-none"))
        btnGuardarCambiosFacturacion.classList.add("d-none")
        facturacionContenidoCuerpo.classList.remove("d-none");
        btnEditarDatosFacturacion.classList.remove("d-none");
        btnCancelarCambioFacturacion.classList.add("d-none");

        facturacionContenidoCuerpo.innerHTML = '';
        facturacionContenidoCuerpo.innerHTML =
            `
                <p>
                    <span><strong>Razón Social:</strong> ${cRazonSocial.value}</span> <br />
                    <span><strong>Ruc:</strong> ${cNumeroRuc.value}</span> <br />
                    <span><strong>Dirección Fiscal:</strong> ${cDireccionFiscal.value}</span> <br />
                    <span><strong>Teléfono:</strong>  ${cTelefonoContacto.value}</span> <br />
                </p>
            `;
    }

    function cancelarCambioFacturacion() {
        mostrarFacturacionCuerpo();
    }

    function obtenerDatosFacturacion() {

        const cRazonSocial = document.querySelector("#cRazonSocial").value;
        const cNumeroRuc = document.querySelector("#cNumeroRuc").value;
        const cDireccionFiscal = document.querySelector("#cDireccionFiscal").value;
        const cTelefonoContacto = document.querySelector("#cTelefonoContacto").value;

        const datosFacturacion = {
            cRazonSocial,
            cNumeroRuc,
            cDireccionFiscal,
            cTelefonoContacto
        };

        return datosFacturacion;
    }

    function validarDatosFacturacion() {

        const datosFacturacion = obtenerDatosFacturacion();
        const correcto = (Object.values(datosFacturacion).every(input => input !== '') && datosFacturacion.cNumeroRuc.length == 11);

        if (correcto) {
            btnGuardarCambiosFacturacion.removeAttribute("disabled");
        }
        else {
            btnGuardarCambiosFacturacion.setAttribute("disabled", "true");
        }
    }

    function listarProductos() {

        listProductInCart.innerHTML = '';

        fetch(`/CheckOut/ObtenerPedido`)
            .then(resultado => resultado.json())
            .then(respuesta => {
                const listadoProducto = respuesta.LsPedidoProducto;

                if (listadoProducto.length > 0) {

                    let codigos = listadoProducto.map(p => p.cCodigoUno).join();

                    fetch(`/Producto/ConsultaStock?codigoInterno=${codigos}`)
                        .then(resultado => resultado.json())
                        .then(respuesta => {

                            listadoProducto.forEach(producto => {

                                console.log(producto);

                                const { fk_eProducto, cFileName, cProducto, cCodigoUno, dStockActual,
                                    eDescuento, eCantidad, cPrecioVentaFinal, cPrecio, cMarca,
                                    dPrecioVentaFinal } = producto;

                                let productoStock = {};

                                if (Array.isArray(respuesta)) {
                                    productoStock = respuesta.find(x => cCodigoUno == x.codigoDeArticulo);
                                }
                                else {
                                    productoStock = respuesta;
                                }

                                listProductInCart.innerHTML +=
                                    `
                        <div class="content-tr" data-identify="${fk_eProducto}" data-server="true">
                            <div class="row">
                                <div class="col-lg-3 col-md-4 col-sm-3 col-xs-3 vertical-center-table">
                                    <ul>
                                        <li class="image-product" style="text-align:center">
                                            <a href="/Producto/Details/${fk_eProducto}"><img src="/Default/Storage?filename=${cFileName}" alt="${cProducto}"></a>
                                        </li>
                                        <li class="name-product">  
                                            <ul class="offers-product">
                                                ${ (eDescuento > 0 ?
                                            `           <li>
                                                        <div class="desct">
                                                            <div class="line-left"></div>
                                                            <!--<p>${eDescuento} % <span>Dsc.</span></p>-->
                                                            <div class="line-right"></div>
                                                        </div>
                                                    </li>`: "")
                                        }
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-lg-5 col-md-5 col-sm-6 col-xs-6">
                                    <a href="/Producto/Details/${fk_eProducto}"> <h5>${cProducto}</h5> </a>
                                    <div class="vertical-center-table text-center input-cant">
                                        <div class="item__quantity text-left">
                                            <p class="marca">${cMarca}</p>
                                            <div class="item__quantity__input text-left">
                                                <span class="cantidad-text"> Cantidad : </span>
                                                <input type="number" class="text-left pr-0 iptCantidad" id="iptCantProducto" value="${eCantidad}" data-stockactual="${productoStock.stock}" readonly>
                                                <span class="input-group-btn item__quantity__input__plus">
                                                    <button class="fa fa-plus addCantProduct" type="button" data-fkproducto="${fk_eProducto}"></button>
                                                    <div class="clearfix"></div>
                                                    <button class="fa fa-minus deleteCantProduct" type="button" data-fkproducto="${fk_eProducto}"></button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>` +
                                //<div class="col-lg-2 col-md-2 col-sm-4 col-xs-4 vertical-center-table text-center bottom-vertical">
                                //    <p class="text-price" data-preciofinal="${dPrecioVentaFinal}"> ${cPrecioVentaFinal} <br>
                                //        <span> ${(eDescuento > 0 ? cPrecio : "")}</span>
                                //    </p>
                                //</div>

                                `<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 vertical-center-table text-center bottom-vertical">
                                    <p class="text-total">S/${agregarCommaMillions((dPrecioVentaFinal * eCantidad).toFixed(2))} </p>
                                </div>
                                <div class="col-lg-2 col-md-2 hddien-sm hidden-xs vertical-center-table text-center  bottom-vertical" >
                                    <p class="text-igv">Incl. IGV</p>
                                </div>` +

                                        //<div class="col-lg-2 col-md-3 col-sm-4 col-xs-4 vertical-center-table text-center">
                                        //    <p class="mobile-text">Total : </p>
                                        //    <p class="text-total">S/${agregarCommaMillions((dPrecioVentaFinal * eCantidad).toFixed(2))} </p>
                                        //</div>
                                        `</div>
                        </div>`;
                            });
                        });
                }
                else
                    window.location.href = "/ShoppingCart";
            })
            .catch(error => console.log(error));
        
    }

    function ActualizarPurchaseInfo_Online() {
        
        fetch(`/ShoppingCart/GetPurchaseInfo`)
            .then(resultado => resultado.json())
            .then(respuesta => {

                const { cPrecioSubTotal, cPrecioDescuento, cPrecioTotalMasEnvio, dPrecioTotalMasEnvio, cPrecioEnvio, dPrecioEnvio  } = respuesta;
                
                const tdSubtotal = document.querySelector("#tdSubTotal");
                const tdDescuento = document.querySelector("#tdDescuento");
                const tdPrecioEnvio = document.querySelector("#tdPrecioEnvio");
                const tdTotal = document.querySelector("#tdTotal");
                tdSubtotal.textContent = cPrecioSubTotal;
                tdDescuento.textContent = '-'+cPrecioDescuento;
                tdPrecioEnvio.textContent = cPrecioEnvio;
                tdPrecioEnvio.dataset.precioenvio = dPrecioEnvio;
                tdTotal.textContent = cPrecioTotalMasEnvio;
                tdTotal.dataset.total = dPrecioTotalMasEnvio

            })
            .catch(error => {  console.log(error); });

    }

    function realizarAccion(e) {

        const inputCantidad = e.target.parentElement.parentElement.querySelector("#iptCantProducto");

        if (e.target.classList.contains("btnEliminar"))
        {
            const data = { id: parseInt(e.target.dataset.fkproducto) };
            eliminarProducto(data)
        }
        else if (e.target.classList.contains("addCantProduct"))
        {
            const inputCantidad = e.target.parentElement.parentElement.querySelector("#iptCantProducto");
            const stockActual = parseInt(inputCantidad.dataset.stockactual);

            if ((parseInt(inputCantidad.value) + 1) <= stockActual) {
                const data = { pk_eProducto: parseInt(e.target.dataset.fkproducto), eCantidad: 1 };
                agregarProducto(data, e);
            }
            else {
                $(".loading").hide();
            }

        }
        else if (e.target.classList.contains("deleteCantProduct"))
        {
            const inputCantidad = parseInt(e.target.parentElement.parentElement.querySelector("#iptCantProducto").value);

            if (inputCantidad > 1) {
                const data = { pk_eProducto: parseInt(e.target.dataset.fkproducto), eCantidad: -1 };
                agregarProducto(data, e);
            }
            else {
                $(".loading").hide();
            }
        }
        


    }

    function eliminarProducto(data) {
        $(".loading").show();
        fetch(`/ShoppingCart/Eliminar/`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resultado => resultado.json())
            .then(respuesta => {
                if (respuesta.Success) {
                    listarProductos();
                    mpolRefreshItem(true);
                    ActualizarPurchaseInfo_Online();
                }
                else {
                    console.log("Error..." + result.MessageError);
                }
                $(".loading").hide();
            })
            .catch(error => { $(".loading").hide(); console.log(error); });
    }

    function agregarProducto(data, e) {
        $(".loading").show();
        const inputCantidad = e.target.parentElement.parentElement.querySelector("#iptCantProducto")
        const textTotal = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".text-total");
        const preciofinal = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".text-price").dataset.preciofinal;

        fetch(`/ShoppingCart/Agregar`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resultado => resultado.json())
            .then(respuesta => {
                if (respuesta.Success) {
                    let cantidad = parseInt(inputCantidad.value) + data.eCantidad;
                    inputCantidad.value = cantidad;
                    textTotal.textContent = `S/${agregarCommaMillions((parseFloat(preciofinal) * cantidad).toFixed(2))}`;
                    ActualizarPurchaseInfo_Online();
                }
                else {
                    console.log("Error..." + result.MessageError);
                }

                $(".loading").hide();
            })
            .catch(error => { $(".loading").hide(); console.log(error); });
    }


    OnSuccessGuardarImagenPedido = function (data) {

        if (data.Success) {
            $("#btnGuardarImagen").attr("disabled", true);
            Swal.fire(
                "Bien!",
                "Imagen Guardada Correctamente",
                "success"
            )
          
        } else {
            Swal.fire(
                "Algo Salio Mal!",
                data.MessageError ? data.MessageError : "Ha ocurrido un error inesperado",
                "error"
            )

        }
    };

    OnFailureGuardarImagenPedido = function () {
        swal("Algo Salio Mal!", "Ocurrio un error al Guardar", "error");
    };

    $("#himage").fileinput({
        showRemove: false,
        browseClass: "btn btn-primary btn-block",
        showUpload: false,
        showCaption: false,
        allowedFileExtensions: ["png", "jpeg", "jpg"],
        maxFileCount: 1,
        maxFileSize: 5120
        
    })
    .on("fileloaded",
        function (event) {
            $("#btnGuardarImagen").attr("disabled", false);
        })
    .on("fileclear",
        function (event) {
            $("#btnGuardarImagen").attr("disabled", true);
            $(this).fileinput("enable");
    }).on("fileerror",
    function () {
        swal("Algo Salio Mal!", data.MessageError, "error");
        $("#himage").fileinput("clear");
    });

    if ($("#himage").attr("data-preimagen")) {
        $("#himage").fileinput("refresh", {
            initialPreview: [
                `${URLBlobStorage}${$frmProductoMant.find("#himage").attr("data-preimagen")}`
            ],
            initialPreviewAsData: true
        });
        $("#himage").fileinput("disable");
    }

    if ( !$(".btn-file").find("span.hidden-xs").hasClass('textoImagenAdjunto')) {
        $(".btn-file").find("span.hidden-xs").addClass('textoImagenAdjunto')
    }

    $(".btn-file").find("span.textoImagenAdjunto").text("Adjuntar Imagen");
    $(".btn-file").find("span.textoImagenAdjunto").removeClass("hidden-xs");


    $('.opc__item .collapse').on('hide.bs.collapse', function () {
        $(this).parents(".opc__item").removeClass("allow");
    });

    $('.opc__item .collapse').on('show.bs.collapse', function () {
       
        $(this).parents(".opc__item").addClass("allow");
    });

    $("input[type=radio][data-tab]").on("click", function () {
        const $this = $(this);

        if (parseInt($this.val()) === MedioPago.PagoContraEntrega)//PAGO CONTRA ENTREGA
        {
            divImagenPago.classList.add("hide")
        }
        else {
            divImagenPago.classList.remove("hide")
        }


        if ($this.is(":checked")) {
            const $Tab = $($this.attr("data-tab"));
            const $TabConteiner = $Tab.parent();

            $TabConteiner.find("div.tab-pane").removeClass("active");
            $Tab.addClass("active");
        }
    });

})
