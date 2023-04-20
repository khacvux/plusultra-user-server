import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { DeleteAddressDto } from './dto';

@Controller()
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @MessagePattern('create_user_address')
  create(@Payload() dto: CreateAddressDto) {
    return this.addressService.create(dto);
  }

  @MessagePattern('update_user_address')
  update(@Payload() dto: UpdateAddressDto) {
    return this.addressService.update(dto);
  }

  @MessagePattern('delete_user_address')
  remove(@Payload() dto: DeleteAddressDto) {
    return this.addressService.remove(dto);
  }
}
