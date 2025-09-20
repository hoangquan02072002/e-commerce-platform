import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityTrackingServiceDto } from './create-activity-tracking-service.dto';

export class UpdateActivityTrackingServiceDto extends PartialType(
  CreateActivityTrackingServiceDto,
) {}
