export interface CartItem {
    giftWrap: any
    toyID: string
    name: string
    price: number
    quantity: number
    imageUrl?: string;
    status: 'rezervisano' | 'pristiglo' | 'otkazano'

}