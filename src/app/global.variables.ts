//#region ApiInilization
export const apiBaseUrl: string = "http://localhost:61531/api/";
// export const apiBaseUrl: string = "http://localhost:40/api/";
export const apiAuth: string = "8+fg8El5UFccM5CpGNt7Dy+8SGgFmQaYX8rm93h4DnrgiZGMCwv8yDc3aXndylO0KEzVgwc88ypXfAYzcXoBrXDjOtdQXe3jFZKjk4K+Htc";
//#endregion

//#region AccoutService URLs
export const loginURL: string = "Account/LoginValidation";
export const registerURL: string = "Account/NewUserRegistration";
export const resetPasswordURL: string = "Account/UpdateNewPassword";
export const emailValidationURL: string = "Account/EmailValidate?email=";
export const emailTriggerURL: string = "Account/PostEmailTrigger";
export const getPasswordURL: string = "Account/ForgetPassword?email=";
//#endregion

//#region PatientRequest URLs
export const allRequestURL: string = "PatientDetails/GetPatientDetails?email=";
export const getPatientdetailURL: string = "PatientDetails/GetPatientDetail";
export const getPatientDetailStatusURL: string = "PatientDetails/GetPatientDetailsUsingStatus";
export const insertPatientDetailURL: string = 'PatientDetails/AddingPatientDetails';
export const updateDoctorStatusURL: string = "PatientDetails/InsertPatientMedicalDetails";
export const updateDeliveryStatusURL: string = "PatientDetails/StatusUpdate";
export const getPatientMedicalDetailsURL: string = "PatientDetails/GetPatientMedicalDetails";
export const deletePatientMedicalDetailsURL: string = "PatientDetails/DeletePatientDetail?id=";
export const undoPatientMedicalDetailsURL: string = "PatientDetails/UndoPatientDetail?id="
export const getStatusOptionsURL: string = "PatientDetails/GetStatusOptions";
export const insertUpdateUsersDataURL: string = "PatientDetails/InsertUpdateUserWords?email="
//#endregion 

//#region MedicalDetails URLs
export const authorizeURL: string = 'MedicineInform/Authorize';
export const getMedicineDetailsURL: string = 'MedicineInform/GetMedicineInformation';
export const insertMedicineDetailsURL: string = 'MedicineInform/InsertMedicalInformation';
//#endregion

export const loginRoutes = {
    patientLogin: '/requestLayout',
    doctorLogin: '/requestLayout/requested',
    pharmacistLogin: '/requestLayout/medicine'
}

export const statusCodes = {
    Ok: "200",
    Created: "201"
}

export enum actionType {
    insert = 1,
    doc = 2,
    delivery = 3
}

//#region  SmtpEmail
export const emailTriggers = {
    smtpHost: 'smtp.outlook.com',
    fromAddress: 'rahul.s@customeranalytics.com',
    fromAddressPassword: 'connectmysys8*',
    subject: 'Medical Tracker - Forget passoword',
    bodyContent: "<div><p>We have recived your forget password request</p><p>Please check your password - <b>{password}</b> </p><p>You can use this link to " +
        "<a href='http://" + location.host + "/Layout/login' target='_blank'>login</a> again </p><br /><hr><div><p>Thanks,</p><p>Medical Tracker Team</p></div></div>"
}
//#endregion
