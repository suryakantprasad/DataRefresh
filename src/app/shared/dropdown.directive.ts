import { Directive, HostBinding, HostListener, ElementRef } from "@angular/core";
import { Event } from '@angular/router';


@Directive({
    selector:'[appDropdown]',
    exportAs: 'appDropDown'
})
export class DropDownDirective{
    @HostBinding('class.show') isOpen = false;

    
    @HostListener('document:click', ['$event']) 
    toggleOpen(event){
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }

    @HostListener('mouseenter') 
    openDropDown() {
        this.isOpen = true;
    }

    @HostListener('mouseleave') close()
    {
    this.isOpen=false;
    }

    constructor(private elRef : ElementRef){}
}