import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { RegistroComponent } from './components/registro/registro.component';
import { MetodoPagoComponent } from './components/metodo-pago/metodo-pago.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { PromocionesComponent } from './components/promociones/promociones.component';
import { DetalleCarroComponent } from './components/detalle-carro/detalle-carro.component';
import { CarritoComponent } from './components/carrito/carrito.component';

export const routes: Routes = [
    { path: 'contacto', component: ContactoComponent },
    { path: 'nosotros', component: NosotrosComponent },
    { path: 'carrito', component: CarritoComponent },
    { path: 'metodo-pago', component: MetodoPagoComponent },
    { path: 'producto/:id', component: DetalleCarroComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'promociones', component: PromocionesComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: 'home' }
];
