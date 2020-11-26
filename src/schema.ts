export interface StockItem {
	name: string;
	price: number;
	alias: string[];
	quantity: number;
	image: string;
}

export interface ShoppingCart {
	name: string;
	index: number;
	price: number;
	quantity: number;
}
