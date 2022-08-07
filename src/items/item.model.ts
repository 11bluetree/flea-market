
import { ItemStatus } from "./item.status.snum";
export interface Item {
    id: string;
    name: string;
    price: number;
    description: string;
    status: ItemStatus;
}