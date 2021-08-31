export default class Order {
    orderId!: number;
    userId!: number;
    stockTicker!: string;
    price!: number;
    volume!: number;
    buyOrSell!: string;
    statusCode!: number;
    currentTime!: string;
}