export interface IUser {
  firstName: string;
  lastName: string;
  email: string;

  password: string | undefined;
  role: string;
  avatar: {
    public_id: string;
    secure_url: string;
  };
  resetPasswordToken?: string;
  resetPasswordExpiry: Date;

  comparePassword(password: string): boolean;
  generateAccessToken(): string;
  generateRefreshToken?: string;
  generatePasswordResetToken(): string;
}
