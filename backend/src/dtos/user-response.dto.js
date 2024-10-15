
export class UserResponseDto {
  constructor(user) {
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.role = user.role;
  }
}