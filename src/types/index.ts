interface DriverId {
    address: string;
    protocol: string;
}

interface State {
    bri: number;
    on: boolean;
    delay?: number;
    power?: number;
    setPoint?: number;
    temperature?: number;
    indeterminate?: boolean;
}

interface TemperatureLimits {
    max: number;
    min: number;
}

export interface Device {
    driverId: DriverId;
    id: string;
    manufacturer: string;
    name: string;
    roomId: string;
    state: State;
    type: string;
    temperatureLimits: TemperatureLimits;
}

export interface Scence {
    siteKey: string;
    data: {
        id: string;
    }
}

export interface ActivatedScene {
    [key: string]: boolean
}