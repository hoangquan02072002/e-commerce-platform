import { Test, TestingModule } from '@nestjs/testing';
import { PaymentwithqrcodeService } from './paymentwithqrcode.service';

describe('PaymentwithqrcodeService', () => {
  let service: PaymentwithqrcodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentwithqrcodeService],
    }).compile();

    service = module.get<PaymentwithqrcodeService>(PaymentwithqrcodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
