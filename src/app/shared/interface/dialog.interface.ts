import { User } from "./user.interface";

export interface DialogData {
    action: string,
    userData: User | null
}