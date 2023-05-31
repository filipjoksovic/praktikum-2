import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-shopping-lists',
    templateUrl: './shopping-lists.component.html',
})
export class ShoppingListsComponent implements OnInit {
    shoppingLists: any[] = [];

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.loadShoppingLists();
    }

    loadShoppingLists() {
        this.apiService.getAllShoppingLists().subscribe(lists => {
            if (Array.isArray(lists)) {
                this.shoppingLists = lists;
                console.log(JSON.stringify(this.shoppingLists))
            } else {
                console.warn('Received non-array value:', lists);
                this.shoppingLists = [];
            }
        });
    }


    updateShoppingList(list: any) {
        this.apiService.updateShoppingList(list.id, list).subscribe(() => {
            this.loadShoppingLists();
        });
    }

    deleteShoppingList(id: string) {
        this.apiService.deleteShoppingList(id).subscribe(() => {
            this.loadShoppingLists();
        });
    }
}
