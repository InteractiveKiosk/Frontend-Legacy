export interface StockItem {
	name: string;
	price: number;
	alias: string[];
	quantity: number;
}

export interface ShoppingCart {
	name: string;
	index: number;
	price: number;
	quantity: number;
}
