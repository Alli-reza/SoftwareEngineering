export class SignInAdminModel {
    username: string;
    password: string;
  
    constructor(model: SignInAdminModel) {
      this.username = model.username || '';
      this.password = model.password || '';
    }
  }
  
  export class AdminProfileModel {
    id?: number;
    fullName?: string;
    username?: string;
    password?: string;
    oldPassword?: string;
    confirmPassword?: string;
    phoneNumber?: string;
    activated?: boolean;
  
    constructor(model: AdminProfileModel) {
      this.id = model.id || 0;
      this.fullName = model.fullName || '';
      this.username = model.username || '';
      this.password = model.password || '';
      this.oldPassword = model.oldPassword || '';
      this.confirmPassword = model.confirmPassword || '';
      this.phoneNumber = model.phoneNumber || '';
      this.activated = model.activated || false;
    }
  }
  