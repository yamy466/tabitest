import { Injectable, inject, signal } from "@angular/core";
import { BehaviorSubject} from 'rxjs'
import { AppRoutes } from "../models/routes.model";
import { MenuItem } from "../models/header.model";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    readonly #router = inject(Router);
    
    private selectedItem = new BehaviorSubject<MenuItem | undefined>(undefined);
    readonly selectedItem$ = this.selectedItem.asObservable();

    isOpen = signal(false);

    readonly menuItems = signal<MenuItem[]>([
        { title: 'Users', route: AppRoutes.UserDetails },
    ])

    constructor() {
        this.initSelectedMenuItem();
    }

    private initSelectedMenuItem() {
        this.menuItems().forEach(item => {
            if(window.location.href.includes(item.route)){
                this.setSelectedMenuItem(item);
                return;
            }
        })
    }

    private setSelectedMenuItem(item?: MenuItem){
        this.selectedItem.next(item);
    }

    setIsMenuOpen(open: boolean) {
        this.isOpen.set(open);
    }

    navigate(item?: MenuItem){
        this.#router.navigateByUrl(item ? item.route : '/');
        this.setSelectedMenuItem(item);
        this.setIsMenuOpen(false);
    }
}