import {Directive, HostListener} from "@angular/core";
    
@Directive({
    selector: "[stopPropagation]",
    standalone: true
})
export class ClickStopPropagation
{
    @HostListener("click", ["$event"])
    public onClick(event: any): void
    {
        event.stopPropagation();
    }
}