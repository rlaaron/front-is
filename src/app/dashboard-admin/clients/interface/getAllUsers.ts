export interface User {
    id:                string;
    email:             string;
    fullName:          string;
    isActive:          boolean;
    roles:             Role[];
    distribution_zone: DistributionZone;
    phone:             null | string;
}

export enum DistributionZone {
    Centro = "centro",
    Puebla = "puebla",
}

export enum Role {
    Admin = "admin",
    Provedor = "provedor",
    User = "user",
    Usuario = "usuario",
}
