import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { HomeService } from "../domain/home.service";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import * as camera from "nativescript-camera";
import { Image } from "tns-core-modules/ui/image";
import * as ImageSource from "tns-core-modules/image-source";
import * as SocialShare from "nativescript-social-share";
import { 
    connectionType, getConnectionType, 
    startMonitoring, stopMonitoring } from "tns-core-modules/connectivity";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    monitoreando: boolean = false; // una variable para saber si estás monitoreando o no. 

    constructor(private home: HomeService) {        
        if( isAndroid){
            this.home.agregar("Bienvenidos a mi applicacion en android");
        }else{
            this.home.agregar("Bienvenidos");
        }
        this.home.agregar("Esta App esta siendo desarrollada para aumentar mis conocimientos.");
        this.home.agregar("En la actualidad es necesario el tener conocimientos en el desarrollo en distintos entornos.");
        this.onDatosPlataforma();
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onButtonTap(): void{
        camera.requestPermissions().then(
            function success() {
                const options = { width: 300, height: 300, keepAspectRatio: false, saveToGallery: true };
                camera.takePicture(options).then((imageAsset) => {
                    console.log("Tamaño: " + imageAsset.options.width + "x" + imageAsset.options.height);
                    console.log("KeepAspectRatio: " + imageAsset.options.keepAspectRatio);
                    console.log("Foto guardada!");

                    ImageSource.fromAsset(imageAsset).then((imageSource) => {
                        SocialShare.shareImage(imageSource, "Asunto: compartido desde el curso!");
                    }).catch((err) => {
                        console.log("Error -> " + err.message);
                    });
                }).catch((err) => {
                    console.log("Error -> " + err.message);
                })
            },
            function failure() {
                console.log("Permiso de cámara no aceptador por el usuario.");
            }
        );
    }

    onDatosPlataforma(): void {         
        console.log("modelo", device.model);         
        console.log("tipo dispositivo", device.deviceType);         
        console.log("Sistema operativo", device.os);         
        console.log("versión sist operativo", device.osVersion);         
        console.log("Versión sdk", device.sdkVersion);         
        console.log("lenguaje", device.language);         
        console.log("fabricante", device.manufacturer);         
        console.log("código único de dispositivo", device.uuid);         
        console.log("altura en pixels normalizados", screen.mainScreen.heightDIPs); 
        /*DIP (Device Independent Pixel), también conocido como densidad de píxeles independientes. 
        Un píxel virtual que aparece aproximadamente del mismo tamaño en una variedad de densidades de pantalla.*/         
        console.log("altura pixels", screen.mainScreen.heightPixels);         
        console.log("escala pantalla", screen.mainScreen.scale);         
        console.log("ancho pixels normalizados", screen.mainScreen.widthDIPs);         
        console.log("ancho pixels", screen.mainScreen.widthPixels);     
     } 

    onMonitoreoDatos(): void {         
        const myConnectionType = getConnectionType();         
        switch (myConnectionType) {             
            case connectionType.none:                 
                console.log("Sin Conexion");                 
                break;             
            case connectionType.wifi:                 
                console.log("WiFi");                 
                break;             
            case connectionType.mobile:                 
                console.log("Mobile"); 
                break;             
            case connectionType.ethernet:                 
                console.log("Ethernet"); // es decir, cableada                 
                break;             
            case connectionType.bluetooth:                  
                console.log("Bluetooth");                  
                break;             
            default:                 
                break;         
        }
        this.monitoreando = !this.monitoreando;         
        if (this.monitoreando) {             
            startMonitoring((newConnectionType) => {                 
                switch (newConnectionType) {                     
                    case connectionType.none:                         
                        console.log("Cambió a sin conexión.");                         
                        break;                     
                    case connectionType.wifi:                         
                        console.log("Cambió a  WiFi.");                         
                        break;                     
                    case connectionType.mobile:                         
                        console.log("Cambió a  mobile.");                         
                        break;                     
                    case connectionType.ethernet:                         
                        console.log("Cambió a  ethernet.");                         
                        break;                     
                    case connectionType.bluetooth:                         
                        console.log("Cambió a bluetooth.");                         
                        break;                     
                    default:                         
                        break;                 
                }             
            });         
        } else { stopMonitoring(); }     
    }
}
