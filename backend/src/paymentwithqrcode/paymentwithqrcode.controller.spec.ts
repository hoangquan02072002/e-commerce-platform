import { Test, TestingModule } from '@nestjs/testing';
import { PaymentwithqrcodeController } from './paymentwithqrcode.controller';
import { PaymentwithqrcodeService } from './paymentwithqrcode.service';

describe('PaymentwithqrcodeController', () => {
  let controller: PaymentwithqrcodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentwithqrcodeController],
      providers: [PaymentwithqrcodeService],
    }).compile();

    controller = module.get<PaymentwithqrcodeController>(
      PaymentwithqrcodeController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
