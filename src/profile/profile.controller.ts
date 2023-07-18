import { Controller } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @MessagePattern('get_user_by_id')
  getUser(@Payload() { userId, id }: { userId: number; id: number }) {
    return this.profileService.getUserByid({ userId, id });
  }

  @MessagePattern('get_user_follow')
  getUserFollow(@Payload() { userId }: { userId: number }) {
    return this.profileService.getUserFollow(userId);
  }
}
