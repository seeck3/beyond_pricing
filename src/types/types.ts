export type Listing = {
    id: number
    title: string
    picture: string
    health: number
    currency: string
    beds: number
}

export type Calenldy = {
    basePrice: number;
    days: Days[]
}

export type Days = {
    date: string
    factors: Factors
    isBlocked: boolean
}

export type Factors = {
    seasonal: number
    dayOfWeek: number
}