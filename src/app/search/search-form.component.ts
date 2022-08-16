import { Component, EventEmitter, Output } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { NoticiasService } from "../domain/noticias.service";
import { ActivityIndicator } from "tns-core-modules/ui/activity-indicator";

@Component({
    selector: "SearchForm",
    moduleId: module.id,
    template: `
    <FlexboxLayout flexDirection="row">        
        <TextField #texto="ngModel" [(ngModel)]="textFieldValue" 
            hint="Ingresar texto..." required minlen="1">
        </TextField>
        <Label *ngIf="texto.hasError('required')" text="*" color="red"></Label>
        <Label *ngIf="!texto.hasError('required') && texto.hasError('minlen')" text="1+"></Label>
    </FlexboxLayout> 
    <Button text="Buscar!" (tap)="onButtonTap($event)" *ngIf="texto.valid" 
        class="btn btn-primary btn-active"></Button>
    <Button text="Tocar!" (tap)="(activityIndicator.busy = !activityIndicator.busy)" 
         ></Button>
    <ActivityIndicator #activityIndicator busy="false" (busyChange)="cambio($event)" 
        width="100" height="100" class="activity-indicator"></ActivityIndicator>
    `
})
export class SearchFormComponent {
    textFieldValue: string = "";
    @Output() search: EventEmitter<string> = new EventEmitter();

    onButtonTap(e): void {        
        console.log(this.textFieldValue);
        if (this.textFieldValue.length > 0) {
            this.search.emit(this.textFieldValue);
        }
    }

    cambio (e) {         
        let indicator = <ActivityIndicator>e.object;         
        console.log("indicator.busy: " + indicator.busy);     
    }
}
