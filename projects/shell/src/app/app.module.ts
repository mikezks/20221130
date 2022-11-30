import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppContentComponent } from './app-content/app-content.component';
import { ModuleFederationToolsModule } from '@angular-architects/module-federation-tools';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouterReuseStragegy } from './custom-router-reuse-strategy';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModuleFederationToolsModule
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouterReuseStragegy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
