export interface Iforget {
    password: string;
    confirmPassword: string;
    email: string;
}

export interface IReset {
    smtpHost: string;
    fromAddress: string;
    fromAddressPassword: string;
    toAddress: string;
    subject: string;
    bodyContent: string;
}