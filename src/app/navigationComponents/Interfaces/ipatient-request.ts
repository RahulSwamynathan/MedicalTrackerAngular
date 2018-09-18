export interface IPatientDetails {
    PatientId: string;
    PatientName: string;
    PatientAge: string;
    PatientGender: string;
    PatientHeight: string;
    PatientWeight: string;
    PatientConcern: string;
    Status: string;
    Email: string;
    Delivery: string;
    Comments: string;
    MedicineName: string;
    Dob:Date;
}

export interface IOptions {
    value: string;
    text: string;
}
