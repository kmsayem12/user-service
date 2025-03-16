import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserCreateEvent } from './user-create-event';
import { UserService } from './services/user.service';
import { ErrorMessages } from './common/constants/error.constants';
import { ResponseHelper } from './common/helpers/response.helper';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('user_created')
  async handleUserCreated(data: UserCreateEvent) {
    try {
      const user = await this.userService.create(data);
      return ResponseHelper.success(user);
    } catch (error) {
      if (error.name === 'ValidationError') {
        const validationErrors = Object.keys(error.errors).reduce(
          (acc, key) => {
            acc[key] = error.errors[key].message;
            return acc;
          },
          {},
        );

        return ResponseHelper.error(
          ErrorMessages.USER.CREATE.VALIDATION_FAILED,
          validationErrors,
        );
      }
      return ResponseHelper.error(
        error.message || ErrorMessages.USER.CREATE.FAILED,
        error.errors,
      );
    }
  }

  @MessagePattern({ cmd: 'get_user' })
  async getUser(id: string) {
    try {
      const user = await this.userService.findById(id);
      if (!user) {
        return ResponseHelper.error(ErrorMessages.USER.FETCH.NOT_FOUND(id));
      }
      return ResponseHelper.success(user);
    } catch (error) {
      return ResponseHelper.error(
        error.message || ErrorMessages.USER.FETCH.FAILED,
        error.errors,
      );
    }
  }
}
