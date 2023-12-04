export interface Order {
    id:            string;
    request_date:  string;
    delivery_date: string;
    orderItem:     OrderItem[];
    user:          User;
}

export interface OrderItem {
    quantity: string;
    bread:    string;
}

export interface User {
    id:    string;
    email: string;
    name:  string;
}
