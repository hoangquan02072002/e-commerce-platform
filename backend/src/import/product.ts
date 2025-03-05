const productAndCategory = [
  {
    category: { name: 'Cameras' },
    product: [
      {
        name: 'Фотоаппарат Sony Alpha ILCE-7RM5 Body',
        price: 398.6,
        description:
          'Высококачественная камера с разрешением 4K для создания профессионального контента',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738675904/do%20an%20tot%20nghiep/product/Cameras/Canon%20EOS%20R6%20Mark%20II%20Bodyat%20Etoren%20%20%20270.990.00%20RUB.png',
      },
      {
        name: 'Беззеркальная камера Canon EOS R8 (+ RF 24-50mm f4.5-6.3 IS STM) 2000768074440',
        price: 182.99,
        description:
          'Умная камера с функцией распознавания лиц и автоматической настройкой света',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738676700/do%20an%20tot%20nghiep/product/Cameras/%D0%91%D0%B5%D0%B7%D0%B7%D0%B5%D1%80%D0%BA%D0%B0%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F%20%D0%BA%D0%B0%D0%BC%D0%B5%D1%80%D0%B0%20Canon%20EOS%20R8%20%28%2B%20RF%2024-50mm%20f4.5-6.3%20IS%20STM%29%202000768074440%20%20%20%20%20%20%20%20182.990.00%20RUB.png',
      },
      {
        name: 'Nikon Z5 Body',
        price: 95.7,
        description:
          'Компактная камера с мощной системой стабилизации изображения для активного отдыха',
        stock: 20,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738675903/do%20an%20tot%20nghiep/product/Cameras/Nikon%20Z5%20Body%20%20%2095.700.00%20%20RUB.png',
      },
      {
        name: 'Экшн-камера YI 4K Action Camera',
        price: 19.0,
        description:
          'Профессиональная камера с возможностью съемки в условиях низкой освещенности',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738676699/do%20an%20tot%20nghiep/product/Cameras/%D0%AD%D0%BA%D1%88%D0%BD-%D0%BA%D0%B0%D0%BC%D0%B5%D1%80%D0%B0%20YI%204K%20Action%20Camera%20%20%20%2019.000.00%20RUB.png',
      },
      {
        name: 'Экшн-камера Insta360 Ace Pro',
        price: 50.0,
        description:
          'Водонепроницаемая камера для подводной съемки с глубиной до 30 метров',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738676698/do%20an%20tot%20nghiep/product/Cameras/%D0%AD%D0%BA%D1%88%D0%BD-%D0%BA%D0%B0%D0%BC%D0%B5%D1%80%D0%B0%20Insta360%20Ace%20Pro%20%20%20%20%2050.000.00%20RUB.png',
      },
      {
        name: 'Беззеркальный фотоаппарат Canon EOS RP Body',
        price: 82.9,
        description:
          'Камера со сменными объективами для фотографов-любителей и профессионалов',
        stock: 20,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738676467/do%20an%20tot%20nghiep/product/Cameras/%D0%91%D0%B5%D0%B7%D0%B7%D0%B5%D1%80%D0%BA%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20%D1%84%D0%BE%D1%82%D0%BE%D0%B0%D0%BF%D0%BF%D0%B0%D1%80%D0%B0%D1%82%20Canon%20EOS%20RP%20Body%20%20%2082.900.00%20rub.png',
      },
      {
        name: 'Беззеркальный фотоаппарат Canon EOS R3 Body',
        price: 445.97,
        description:
          'Инновационная камера с искусственным интеллектом для улучшения качества съемки',
        stock: 20,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738676465/do%20an%20tot%20nghiep/product/Cameras/%D0%91%D0%B5%D0%B7%D0%B7%D0%B5%D1%80%D0%BA%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20%D1%84%D0%BE%D1%82%D0%BE%D0%B0%D0%BF%D0%BF%D0%B0%D1%80%D0%B0%D1%82%20Canon%20EOS%20R3%20Body%20%20%20%20%20445.970.00%20rub.png',
      },
      {
        name: 'Видеокамера Blackmagic Pocket Cinema Camera 4K',
        price: 172.66,
        description:
          'Портативная камера с Wi-Fi для быстрой передачи фото и видео на смартфон',
        stock: 20,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738676464/do%20an%20tot%20nghiep/product/Cameras/%D0%92%D0%B8%D0%B4%D0%B5%D0%BE%D0%BA%D0%B0%D0%BC%D0%B5%D1%80%D0%B0%20Blackmagic%20Pocket%20Cinema%20Camera%204K%20%20%20172.660.00%20rub.png',
      },
      {
        name: 'Blackmagic Pocket Cinema Camera 6K Pro',
        price: 255.0,
        description:
          'Спортивная камера с широким углом обзора для экстремальных видов спорта',
        stock: 20,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738676464/do%20an%20tot%20nghiep/product/Cameras/Blackmagic%20Pocket%20Cinema%20Camera%206K%20Pro%20%20%20%20255.000.00%20rub.png',
      },
      {
        name: 'FUJIFILM X-T30 II Mirrorless Camera with XC 15-45mm OIS PZ Lens Silver',
        price: 139.99,
        description:
          'Цифровая камера с функцией замедленной съемки для создания драматичных видеороликов',
        stock: 20,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738676215/do%20an%20tot%20nghiep/product/Cameras/FUJIFILM%20X-T30%20II%20Mirrorless%20Camera%20with%20XC%2015-45mm%20OIS%20PZ%20Lens%20Silver%2C%20Fuji%20...%20%20%20%20%20139.990.00%20RUB.png',
      },
      {
        name: 'Экшн-камера AKASO BRAVE 7 серый',
        price: 15.99,
        description:
          'Надежная камера с длительным временем работы от аккумулятора для длительных путешествий',
        stock: 20,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738676214/do%20an%20tot%20nghiep/product/Cameras/%D0%AD%D0%BA%D1%88%D0%BD-%D0%BA%D0%B0%D0%BC%D0%B5%D1%80%D0%B0%20AKASO%20BRAVE%207%20%D1%81%D0%B5%D1%80%D1%8B%D0%B9%20%20%20%2015.990.00%20RUB.png',
      },
      {
        name: 'IP камера TP-LINK Tapo C220',
        price: 5.399,
        description:
          'Камера с функцией HDR для получения ярких и детализированных изображений',
        stock: 20,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738676212/do%20an%20tot%20nghiep/product/Cameras/IP%20%D0%BA%D0%B0%D0%BC%D0%B5%D1%80%D0%B0%20TP-LINK%20Tapo%20C220%20%20%205.399.00%20RUB.png',
      },
      {
        name: 'Камера видеонаблюдения YI Outdoor Camera 1080p (YHS.3017)',
        price: 4.9,
        description:
          'Экспертная камера с продвинутыми настройками для ручного управления параметрами съемки',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738676212/do%20an%20tot%20nghiep/product/Cameras/%D0%9A%D0%B0%D0%BC%D0%B5%D1%80%D0%B0%20%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE%D0%BD%D0%B0%D0%B1%D0%BB%D1%8E%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%20YI%20Outdoor%20Camera%201080p%20%28YHS.3017%29%20%20%20%204.900.00%20%20RUB.png',
      },
      {
        name: 'Экшн-камера GoPro HERO13 Black',
        price: 30.49,
        description:
          'Камера с функцией таймлапса для создания захватывающих видеороликов о движении времени',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738675906/do%20an%20tot%20nghiep/product/Cameras/%D0%AD%D0%BA%D1%88%D0%BD-%D0%BA%D0%B0%D0%BC%D0%B5%D1%80%D0%B0%20GoPro%20HERO13%20Black%20%20%20%2030.490.00%20RUB.png',
      },
      {
        name: 'Фотоаппарат Canon EOS 2000D Kit',
        price: 47.49,
        description:
          'Мультифункциональная камера с возможностью съемки 360 градусов для погружения в реальность',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738675905/do%20an%20tot%20nghiep/product/Cameras/%D0%A4%D0%BE%D1%82%D0%BE%D0%B0%D0%BF%D0%BF%D0%B0%D1%80%D0%B0%D1%82%20Canon%20EOS%202000D%20Kit%20%20%20%2047.490.00%20RUB.png',
      },
      {
        name: 'Canon EOS R6 Mark II Bodyat Etoren',
        price: 270.99,
        description:
          'Камера с функцией ночного видения для наблюдения в темное время суток',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738675904/do%20an%20tot%20nghiep/product/Cameras/Canon%20EOS%20R6%20Mark%20II%20Bodyat%20Etoren%20%20%20270.990.00%20RUB.png',
      },
    ],
  },
  {
    category: { name: 'Cell Phones' },
    product: [
      {
        name: 'Apple iPhone 14 Pro Max, 1 ТБ, темно фиолетовый, eSIM ростест',
        price: 169.991,
        description: 'Инновационный смартфон с передовыми технологиями',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738675737/do%20an%20tot%20nghiep/product/Cell%20Phones/Apple%20iPhone%2014%20Pro%20Max%2C%201%20%D0%A2%D0%91%2C%20%D1%82%D0%B5%D0%BC%D0%BD%D0%BE%20%D1%84%D0%B8%D0%BE%D0%BB%D0%B5%D1%82%D0%BE%D0%B2%D1%8B%D0%B9%2C%20eSIM%20%D1%80%D0%BE%D1%81%D1%82%D0%B5%D1%81%D1%82%20%20%20169.990.00%20%20RUB.png',
      },
      {
        name: 'Apple iPhone 16 Pro Max 256 ГБ, пустынный титан',
        price: 133.919,
        description: 'Прочный алюминиевый корпус премиум-класса',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738675578/do%20an%20tot%20nghiep/product/Cell%20Phones/Apple%20iPhone%2016%20Pro%20Max%20256%20%D0%93%D0%91%2C%20%D0%BF%D1%83%D1%81%D1%82%D1%8B%D0%BD%D0%BD%D1%8B%D0%B9%20%D1%82%D0%B8%D1%82%D0%B0%D0%BD%20%20%20%20%20133.910.00%20RUB.png',
      },
      {
        name: 'Смартфоны iPhone 15 Apple MTP53QLA 6.1 128 ГБ 6 ГБ ОЗУ Зеленый',
        price: 65.972,
        description: 'Яркий дисплей с широкими углами обзора',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738675577/do%20an%20tot%20nghiep/product/Cell%20Phones/%D0%A1%D0%BC%D0%B0%D1%80%D1%82%D1%84%D0%BE%D0%BD%D1%8B%20iPhone%2015%20Apple%20MTP53QLA%206.1%20128%20%D0%93%D0%91%206%20%D0%93%D0%91%20%D0%9E%D0%97%D0%A3%20%D0%97%D0%B5%D0%BB%D0%B5%D0%BD%D1%8B%D0%B9%20%20%2065.970.00%20%20RUB.png',
      },
      {
        name: 'Мобильный телефон Iphone 15 128Гб Желтый Mtp23Px A Apple',
        price: 70.812,
        description: 'Мощный процессор для быстрой работы',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738675095/do%20an%20tot%20nghiep/product/Cell%20Phones/%D0%9C%D0%BE%D0%B1%D0%B8%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%20Iphone%2015%20128%D0%93%D0%B1%20%D0%96%D0%B5%D0%BB%D1%82%D1%8B%D0%B9%20Mtp23Px%20A%20Apple%20%20%2070.810.00%20RUB.png',
      },
      {
        name: 'iPhone 16 512GB White (MYEP3) • iPhone 16',
        price: 123.509,
        description: 'Отличная камера для съемки в любых условиях',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738675094/do%20an%20tot%20nghiep/product/Cell%20Phones/iPhone%2016%20512GB%20White%20%28MYEP3%29%20%E2%80%A2%20iPhone%2016%20%20123.000.00%20RUB.png',
      },
      {
        name: 'Смартфон Apple iPhone 12 128GB, зеленый',
        price: 46.955,
        description: 'Долгое время автономной работы',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738675094/do%20an%20tot%20nghiep/product/Cell%20Phones/%D0%A1%D0%BC%D0%B0%D1%80%D1%82%D1%84%D0%BE%D0%BD%20Apple%20iPhone%2012%20128GB%2C%20%D0%B7%D0%B5%D0%BB%D0%B5%D0%BD%D1%8B%D0%B9%20%20%20%2046.000.00%20RUB.png',
      },
      {
        name: 'Apple iPhone 16 - 128 Гб Розовый (Pink)',
        price: 75.992,
        description: 'Быстрая зарядка за короткое время',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738675094/do%20an%20tot%20nghiep/product/Cell%20Phones/Apple%20iPhone%2016%20-%20128%20%D0%93%D0%B1%20%D0%A0%D0%BE%D0%B7%D0%BE%D0%B2%D1%8B%D0%B9%20%28Pink%29%20%20%2075.990.00.png',
      },
      {
        name: 'Смартфон iPhone 11 Pro 256GB Apple',
        price: 34.432,
        description: 'Защита от брызг и пыли',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738674689/do%20an%20tot%20nghiep/product/Cell%20Phones/%D0%A1%D0%BC%D0%B0%D1%80%D1%82%D1%84%D0%BE%D0%BD%20iPhone%2011%20Pro%20256GB%20Apple%20%20%2034.430.00%20RUB.png',
      },
      {
        name: 'Смартфон Apple iPhone 12 128Gb, синий',
        price: 29.492,
        description: 'Удобное управление жестами',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738674689/do%20an%20tot%20nghiep/product/Cell%20Phones/%D0%A1%D0%BC%D0%B0%D1%80%D1%82%D1%84%D0%BE%D0%BD%20Apple%20iPhone%2012%20128Gb%2C%20%D1%81%D0%B8%D0%BD%D0%B8%D0%B9%20%2029.490.00%20RUB.png',
      },
      {
        name: 'Смартфон Apple iPhone 11 64GB White - белый',
        price: 36.492,
        description: 'Широкие возможности для развлечений',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738674688/do%20an%20tot%20nghiep/product/Cell%20Phones/%D0%A1%D0%BC%D0%B0%D1%80%D1%82%D1%84%D0%BE%D0%BD%20Apple%20iPhone%2011%2064GB%20White%20-%20%D0%B1%D0%B5%D0%BB%D1%8B%D0%B9%20%2036.490.00.png',
      },
      {
        name: 'iPhone 12 256GB White (MGJH3) • Айфон',
        price: 37.994,
        description: 'Надежная система безопасности Face ID',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738674688/do%20an%20tot%20nghiep/product/Cell%20Phones/iPhone%2012%20256GB%20White%20%28MGJH3%29%20%E2%80%A2%20%D0%90%D0%B9%D1%84%D0%BE%D0%BD%2012%2037.990.00%20RUB.png',
      },
      {
        name: 'Смартфон Apple iPhone 16 Pro 256GB',
        price: 115.395,
        description: 'Поддержка augmented reality (AR)',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738674688/do%20an%20tot%20nghiep/product/Cell%20Phones/%D0%A1%D0%BC%D0%B0%D1%80%D1%82%D1%84%D0%BE%D0%BD%20Apple%20iPhone%2016%20Pro%20256GB%20%20%20115.390.00%20RUB.png',
      },
      {
        name: 'Смартфон Apple iPhone 16 Pro Max, 256 ГБ, (Dual Nano-SIM), Desert Titanium',
        price: 120.497,
        description: 'Стильный дизайн в современном исполнении',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738674688/do%20an%20tot%20nghiep/product/Cell%20Phones/%D0%A1%D0%BC%D0%B0%D1%80%D1%82%D1%84%D0%BE%D0%BD%20Apple%20iPhone%2016%20Pro%20Max%2C%20256%20%D0%93%D0%91%2C%20%28Dual%20Nano-SIM%29%2C%20Desert%20Titanium%20%20%20%20120.490.00%20RUB.png',
      },
      {
        name: 'Смартфон Apple iPhone 15 Pro 128 ГБ белый титан',
        price: 86.989,
        description: 'Быстрая работа с приложениями и играми',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738673947/do%20an%20tot%20nghiep/product/Cell%20Phones/%D0%A1%D0%BC%D0%B0%D1%80%D1%82%D1%84%D0%BE%D0%BD%20Apple%20iPhone%2015%20Pro%20128%20%D0%93%D0%91%20%D0%B1%D0%B5%D0%BB%D1%8B%D0%B9%20%D1%82%D0%B8%D1%82%D0%B0%D0%BD%20%20%2086.980.00%20RUB.png',
      },
      {
        name: 'Apple iphone 15 pro 128 go noir titane',
        price: 87.965,
        description: 'Отличное качество сборки компонентов',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738673946/do%20an%20tot%20nghiep/product/Cell%20Phones/Apple%20iphone%2015%20pro%20128%20go%20noir%20titane%20%2087.965.00%20RUB.png',
      },
      {
        name: 'Apple iPhone 16 Pro 128GB - Natural Titanium',
        price: 106.999,
        description:
          'product_descriptionГармоничное сочетание мощности и элегантности',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738673946/do%20an%20tot%20nghiep/product/Cell%20Phones/Apple%20iPhone%2016%20Pro%20128GB%20-%20Natural%20Titanium%20%20106.990.00%20RUB.png',
      },
    ],
  },
  {
    category: { name: 'Gaming' },
    product: [
      {
        name: 'Ноутбук Gigabyte G6 (MF-52KZ853SD) черный',
        price: 92.195,
        description: 'Мощная производительность для современных игр',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738696819/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/%D0%9D%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20Gigabyte%20G6%20%28MF-52KZ853SD%29%20%D1%87%D0%B5%D1%80%D0%BD%D1%8B%D0%B9%20%20%2092.195.00%20rub.png',
      },
      {
        name: 'Ноутбук ASUS TUF Gaming F17 FX707ZC4-HX095 (90NR0GX1-M006F0) ',
        price: 92.992,
        description: 'Высокоскоростной процессор последнего поколения',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738696816/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/%D0%9D%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20ASUS%20TUF%20Gaming%20F17%20FX707ZC4-HX095%20%2890NR0GX1-M006F0%29%20%20%20%2092.990.00%20rub.png',
      },
      {
        name: 'MSI RAIDERGE6814285 Raider GE68HX 14VIG-285US 16',
        price: 406.828,
        description: 'Улучшенная система охлаждения для стабильной работы',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738696814/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/MSI%20RAIDERGE6814285%20Raider%20GE68HX%2014VIG-285US%2016%22%20406.828.00%20rub.png',
      },
      {
        name: 'Ноутбук HP OMEN Gaming Laptop 16z',
        price: 123.466,
        description: 'Дисплей с высокой частотой обновления (144Hz+)',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738696813/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/%D0%9D%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20HP%20OMEN%20Gaming%20Laptop%2016z%20%20123.460.00%20rub.png',
      },
      {
        name: 'Ноутбук GIGABYTE AORUS 16X 9KG (9KG-43UAC54SH)',
        price: 126.265,
        description:
          'Поддержка технологий ray tracing для реалистичной графики',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738696811/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/%D0%9D%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20GIGABYTE%20AORUS%2016X%209KG%20%289KG-43UAC54SH%29%20%20%20%20126.260.00%20rub.png',
      },
      {
        name: 'Ноутбук MSI Cyborg 15 A13VF-1615XRU 9S7-15K111-1615 15.6',
        price: 131.244,
        description: 'Объемная память DDR5 для многозадачности',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738696809/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/%D0%9D%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20MSI%20Cyborg%2015%20A13VF-1615XRU%209S7-15K111-1615%2015.6%20%20131.240.00%20rub.png',
      },
      {
        name: 'Ноутбук HP Victus 16-s1023dx, 16.1" IPS FHD, AMD Ryzen 7 8845HS, 16Gb, SSD 512Gb',
        price: 149.929,
        description: 'Специальная клавиатура с подсветкой для геймеров',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738696807/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/%D0%9D%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20HP%20Victus%2016-s1023dx%2C%2016.1%22%20IPS%20FHD%2C%20AMD%20Ryzen%207%208845HS%2C%2016Gb%2C%20SSD%20512Gb%20%20%20%20%20%20149.929.00%20rub.png',
      },
      {
        name: 'Игровой ноутбук ASUS ROG Zephyrus G16 GU605MV-QP139 (90NR0IT3-M00600)',
        price: 149.999,
        description: 'Дискретная видеокарта высокого класса',
        stock: 100,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738696805/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/%D0%98%D0%B3%D1%80%D0%BE%D0%B2%D0%BE%D0%B9%20%D0%BD%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20ASUS%20ROG%20Zephyrus%20G16%20GU605MV-QP139%20%2890NR0IT3-M00600%29%20%20%20%20%20149.990.00%20rub.png',
      },
      {
        name: 'Игровой ноутбук MSI Vector 16 HX A14V, 16-дюймовый дисплей QHD+ 240 Гц, Intel',
        price: 255.999,
        description: 'Быстрое SSD-хранилище для мгновенной загрузки',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738696288/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/%D0%98%D0%B3%D1%80%D0%BE%D0%B2%D0%BE%D0%B9%20%D0%BD%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20MSI%20Vector%2016%20HX%20A14V%2C%2016-%D0%B4%D1%8E%D0%B9%D0%BC%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%B4%D0%B8%D1%81%D0%BF%D0%BB%D0%B5%D0%B9%20QHD%2B%20240%20%D0%93%D1%86%2C%20Intel%20%20%20%20%20255.999.00%20rub.png',
      },
      {
        name: 'Ноутбук MSI Pulse 17 B13VGK-813XRU Core i7 13700H 16Gb SSD1Tb NVIDIA GeForce',
        price: 226.629,
        description: 'Продвинутый звук с Surround Sound',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738696286/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/%D0%9D%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20MSI%20Pulse%2017%20B13VGK-813XRU%20Core%20i7%2013700H%2016Gb%20SSD1Tb%20NVIDIA%20GeForce%20%20%20226.629.00%20rub.png',
      },
      {
        name: 'https://res.cloudinary.com/co-phan/image/upload/v1738696286/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/%D0%9D%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20MSI%20Pulse%2017%20B13VGK-813XRU%20Core%20i7%2013700H%2016Gb%20SSD1Tb%20NVIDIA%20GeForce%20%20%20226.629.00%20rub.png',
        price: 358.611,
        description: 'Поддержка VR-устройств для виртуальной реальности',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738696285/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/%D0%9D%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20MSI%20Stealth%2016%20AI%20Studio%20A1VHG-061RU%20Core%20Ultra%209%20185H%2032Gb%20SSD2Tb%20%20%20%20358.610.00%20rub.png',
      },
      {
        name: 'Lenovo Игровой ноутбук Loq 15arp9 15.6 R7-7435hs16gb512gb Ssdrtx 4060',
        price: 124.819,
        description: 'Премиальные материалы корпуса с игровым дизайном',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738696283/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/Lenovo%20%D0%98%D0%B3%D1%80%D0%BE%D0%B2%D0%BE%D0%B9%20%D0%BD%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20Loq%2015arp9%2015.6%20R7-7435hs16gb512gb%20Ssdrtx%204060%20%20124.819.00%20rub.png',
      },
      {
        name: 'Ноутбук HP EuropeOMEN Gaming Laptop 16-wd0009ci 81C38EAUUQ',
        price: 107.556,
        description: 'Расширенные возможности кастомизации',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738696282/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/%D0%9D%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20HP%20EuropeOMEN%20Gaming%20Laptop%2016-wd0009ci%2081C38EAUUQ%20%20%20%20%20107.556%20rub.png',
      },
      {
        name: 'Ноутбук AORUS 16X Core i7-13650HX 8Gb SSD1Tb 16.0 RTX 4060 IPS QHD165Hz',
        price: 152.999,
        description: 'Поддержка синхронизации RGB-подсветки',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738695872/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/%D0%9D%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20AORUS%2016X%20Core%20i7-13650HX%208Gb%20SSD1Tb%2016.0%20RTX%204060%20IPS%20QHD165Hz%20...%20%20%20%20152.990.00%20RUB.png',
      },
      {
        name: 'Игровой ноутбук Dell Alienware M16, 16-дюймовый дисплей QHD+ WVA 240 Гц, AMD',
        price: 307.802,
        description: 'Многофункциональные порты для периферийных устройств',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738695868/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/%D0%98%D0%B3%D1%80%D0%BE%D0%B2%D0%BE%D0%B9%20%D0%BD%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20Dell%20Alienware%20M16%2C%2016-%D0%B4%D1%8E%D0%B9%D0%BC%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%B4%D0%B8%D1%81%D0%BF%D0%BB%D0%B5%D0%B9%20QHD%2B%20WVA%20240%20%D0%93%D1%86%2C%20AMD%20...%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20307.802%20RUB.png',
      },
      {
        name: 'Ноутбук Acer Predator Helios 16, 2024 дюймов, 2,5K QHD, 240 Гц, Intel i9-14900HX',
        price: 258.999,
        description: 'Оптимизированное программное обеспечение для гейминга',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738695869/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/%D0%9D%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20Acer%20Predator%20Helios%2016%2C%202024%20%D0%B4%D1%8E%D0%B9%D0%BC%D0%BE%D0%B2%2C%202%2C5K%20QHD%2C%20240%20%D0%93%D1%86%2C%20Intel%20i9-14900HX%20...%20%20%20%20%20%20%20%20258.990.00%20RUB.png',
      },
    ],
  },
  {
    category: { name: 'HeadPhone' },
    product: [
      {
        name: 'Logitech G733 LightSpeed Wireless Blue',
        price: 14.499,
        description: 'Высококачественное звучание с глубоким басом',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738745280/do%20an%20tot%20nghiep/product/headphone/Logitech%20G733%20LightSpeed%20Wireless%20Blue%20%20%2014.490.00%20rub.png',
      },
      {
        name: 'Гарнитура Logitech PRO X LIGHTSPEED',
        price: 17.495,
        description: 'Комфортная посадка для длительного использования',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738745278/do%20an%20tot%20nghiep/product/headphone/%D0%93%D0%B0%D1%80%D0%BD%D0%B8%D1%82%D1%83%D1%80%D0%B0%20Logitech%20PRO%20X%20LIGHTSPEED%20%20%20%20%2017.495.00%20rub.png',
      },
      {
        name: 'Наушники Bose QuietComfort SE',
        price: 33.999,
        description: 'Шумоизоляция для погружения в музыку',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738745277/do%20an%20tot%20nghiep/product/headphone/%D0%9D%D0%B0%D1%83%D1%88%D0%BD%D0%B8%D0%BA%D0%B8%20Bose%20QuietComfort%20SE%20%20%20%2033.990.00%20rub.png',
      },
      {
        name: 'Наушники KOSS Porta Pro',
        price: 4.999,
        description: 'Беспроводное подключение через Bluetooth',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738745276/do%20an%20tot%20nghiep/product/headphone/%D0%9D%D0%B0%D1%83%D1%88%D0%BD%D0%B8%D0%BA%D0%B8%20KOSS%20Porta%20Pro%20%20%204.999%20rub.png',
      },
      {
        name: 'HyperX Cloud Stinger 2',
        price: 4.999,
        description: 'Прочный и легкий дизайн для ежедневного использования',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738745275/do%20an%20tot%20nghiep/product/headphone/HyperX%20Cloud%20Stinger%202%20%204.990%20rub.png',
      },
      {
        name: 'SteelSeries Arctis Nova 3',
        price: 10.108,
        description: 'Долгое время работы от аккумулятора',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738745275/do%20an%20tot%20nghiep/product/headphone/SteelSeries%20Arctis%20Nova%203%20%20%2010.108%20rub.png',
      },
      {
        name: 'Sony WH-1000X M5 Wireless NC Headphone Blackat Etoren',
        price: 28.559,
        description: 'Сенсорное управление для удобства',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738744854/do%20an%20tot%20nghiep/product/headphone/Sony%20WH-1000X%20M5%20Wireless%20NC%20Headphone%20Blackat%20Etoren%20%20%20%2028.550.00%20rub.png',
      },
      {
        name: 'Beyerdynamic DT 770 PRO 250 Ohm Наушники',
        price: 21.688,
        description: 'Поддержка кодеков высокого качества (aptX, LDAC)',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738744853/do%20an%20tot%20nghiep/product/headphone/Beyerdynamic%20DT%20770%20PRO%20250%20Ohm%20%D0%9D%D0%B0%D1%83%D1%88%D0%BD%D0%B8%D0%BA%D0%B8%20%20%20%20%20%20%20%20%2021.688.00%20rub.png',
      },
      {
        name: 'Беспроводные наушники Sony WH-CH520 Черный',
        price: 5.699,
        description: 'Активное шумоподавление (ANC) для тишины вокруг',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738744852/do%20an%20tot%20nghiep/product/headphone/%D0%91%D0%B5%D1%81%D0%BF%D1%80%D0%BE%D0%B2%D0%BE%D0%B4%D0%BD%D1%8B%D0%B5%20%D0%BD%D0%B0%D1%83%D1%88%D0%BD%D0%B8%D0%BA%D0%B8%20Sony%20WH-CH520%20%D0%A7%D0%B5%D1%80%D0%BD%D1%8B%D0%B9%20%20%205.690%20rub.png',
      },
      {
        name: 'Наушники Sennheiser HD 800 S ',
        price: 125.699,
        description: 'Гибкая регулировка размера для идеального-fit',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738744851/do%20an%20tot%20nghiep/product/headphone/%D0%9D%D0%B0%D1%83%D1%88%D0%BD%D0%B8%D0%BA%D0%B8%20Sennheiser%20HD%20800%20S%20%20%20%20125.600%20rub.png',
      },
      {
        name: 'Sennheiser Momentum 4 Black',
        price: 26.299,
        description:
          'Встроенное голосовое управление помощниками (Siri, Google Assistant)',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738744850/do%20an%20tot%20nghiep/product/headphone/Sennheiser%20Momentum%204%20Black%20%20%20%2026.290%20rub.png',
      },
      {
        name: 'Razer Kraken V4 ',
        price: 20.999,
        description: 'Быстрая зарядка для мгновенной энергии',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738744850/do%20an%20tot%20nghiep/product/headphone/Razer%20Kraken%20V4%20%20%20%2020.999%20rub.png',
      },
      {
        name: 'Наушники JBL TUNE 720BT Black',
        price: 6.999,
        description: 'IP-защита от брызг и пыли для надежности',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738744849/do%20an%20tot%20nghiep/product/headphone/%D0%9D%D0%B0%D1%83%D1%88%D0%BD%D0%B8%D0%BA%D0%B8%20JBL%20TUNE%20720BT%20Black%20%20%20%206.999%20%20rub.png',
      },
      {
        name: 'Наушники Bose QuietComfort 45, белый',
        price: 55.63,
        description: 'Насадки разных размеров для максимального комфорта',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738744848/do%20an%20tot%20nghiep/product/headphone/%D0%9D%D0%B0%D1%83%D1%88%D0%BD%D0%B8%D0%BA%D0%B8%20Bose%20QuietComfort%2045%2C%20%D0%B1%D0%B5%D0%BB%D1%8B%D0%B9%20%20%20%2055.630%20%20%20rub.png',
      },
    ],
  },
  {
    category: { name: 'Ipad' },
    product: [
      {
        name: 'Планшет Apple iPad Pro 12.9 (2022) 256GB Wi-Fi + Cellular Space Gray',
        price: 124.499,
        description: 'Мощный процессор для быстрой работы с приложениями',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738741483/do%20an%20tot%20nghiep/product/ipad/%D0%9F%D0%BB%D0%B0%D0%BD%D1%88%D0%B5%D1%82%20Apple%20iPad%20Pro%2012.9%20%282022%29%20256GB%20Wi-Fi%20%2B%20Cellular%20Space%20Gray%20%20%20124.490.00%20%20rub.png',
      },
      {
        name: 'Планшет Apple iPad (2020) 32Gb Wi-Fi',
        price: 31.155,
        description: 'Яркий Retina-дисплей с отличной цветопередачей',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738741483/do%20an%20tot%20nghiep/product/ipad/%D0%9F%D0%BB%D0%B0%D0%BD%D1%88%D0%B5%D1%82%20Apple%20iPad%20%282020%29%2032Gb%20Wi-Fi%20%20%20%20%20%2031.150.00%20rub.png',
      },
      {
        name: 'Планшет Apple iPad 10.2 Wi-Fi 256GB Silver',
        price: 44.299,
        description: 'Легкий и компактный дизайн для переноски',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738741483/do%20an%20tot%20nghiep/product/ipad/%D0%9F%D0%BB%D0%B0%D0%BD%D1%88%D0%B5%D1%82%20Apple%20iPad%2010.2%20Wi-Fi%20256GB%20Silver%20%20%2044.290%2C00%20rub.png',
      },
      {
        name: 'Планшет Apple iPad Mini (2024) 128Gb, Wi-Fi, Purple (Пурпурный)',
        price: 57.233,
        description: 'Поддержка Apple Pencil для рисования и заметок',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738741483/do%20an%20tot%20nghiep/product/ipad/%D0%9F%D0%BB%D0%B0%D0%BD%D1%88%D0%B5%D1%82%20Apple%20iPad%20Mini%20%282024%29%20128Gb%2C%20Wi-Fi%2C%20Purple%20%28%D0%9F%D1%83%D1%80%D0%BF%D1%83%D1%80%D0%BD%D1%8B%D0%B9%29%20%2057.230.00%20rub.png',
      },
      {
        name: 'Планшет Apple iPad (2021) Wi-Fi 64Gb Серебристый',
        price: 28.999,
        description: 'Продвинутая камера для фото и видеозвонков',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738741483/do%20an%20tot%20nghiep/product/ipad/%D0%9F%D0%BB%D0%B0%D0%BD%D1%88%D0%B5%D1%82%20Apple%20iPad%20%282021%29%20Wi-Fi%2064Gb%20%D0%A1%D0%B5%D1%80%D0%B5%D0%B1%D1%80%D0%B8%D1%81%D1%82%D1%8B%D0%B9%20%20%20%20%2028.990.00%20rub.png',
      },
      {
        name: 'Apple iPad mini (2021) Wi-Fi + Cellular 64GB - tablet, Pink',
        price: 43.888,
        description: 'Долгое время автономной работы от батареи',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738741483/do%20an%20tot%20nghiep/product/ipad/Apple%20iPad%20mini%20%282021%29%20Wi-Fi%20%2B%20Cellular%2064GB%20-%20tablet%2C%20Pink%20%20%2043.880.00%20rub.png',
      },
      {
        name: 'Планшеты Apple iPad Air (2024) 11" Wi-Fi 256 ГБ, «серый космос»',
        price: 97.999,
        description: 'Операционная система iPadOS с широкими возможностями',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738741483/do%20an%20tot%20nghiep/product/ipad/%D0%9F%D0%BB%D0%B0%D0%BD%D1%88%D0%B5%D1%82%D1%8B%20Apple%20iPad%20Air%20%282024%29%2011%22%20Wi-Fi%20256%20%D0%93%D0%91%2C%20%C2%AB%D1%81%D0%B5%D1%80%D1%8B%D0%B9%20%D0%BA%D0%BE%D1%81%D0%BC%D0%BE%D1%81%C2%BB%20%20%20%2097.990.00%20rub.png',
      },
      {
        name: 'Планшет Apple iPad Air 6 11 M2 (2024) 128Gb Wi-Fi Space Gray (Серый космос) ',
        price: 58.999,
        description: 'Сplit View для многозадачности',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738741483/do%20an%20tot%20nghiep/product/ipad/%D0%9F%D0%BB%D0%B0%D0%BD%D1%88%D0%B5%D1%82%20Apple%20iPad%20Air%206%2011%20M2%20%282024%29%20128Gb%20Wi-Fi%20Space%20Gray%20%28%D0%A1%D0%B5%D1%80%D1%8B%D0%B9%20%D0%BA%D0%BE%D1%81%D0%BC%D0%BE%D1%81%29%20%20%20%20%20%20%20%20%20%20%20%20%2058.999.00%20rub.png',
      },
      {
        name: 'Планшет Apple iPad (2021) 64Gb Wi-Fi Серый космос',
        price: 26.599,
        description: 'Поддержка клавиатуры Magic Keyboard',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738697460/do%20an%20tot%20nghiep/product/ipad/%D0%9F%D0%BB%D0%B0%D0%BD%D1%88%D0%B5%D1%82%20Apple%20iPad%20%282021%29%2064Gb%20Wi-Fi%20%D0%A1%D0%B5%D1%80%D1%8B%D0%B9%20%D0%BA%D0%BE%D1%81%D0%BC%D0%BE%D1%81%20%20%2026.500.00%20rub.png',
      },
      {
        name: 'Планшеты Apple iPad 10,9" (2022) Wi-Fi 64 ГБ, розовый',
        price: 47.999,
        description: 'Быстрая работа с файлами через Files',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738697458/do%20an%20tot%20nghiep/product/ipad/%D0%9F%D0%BB%D0%B0%D0%BD%D1%88%D0%B5%D1%82%D1%8B%20Apple%20iPad%2010%2C9%22%20%282022%29%20Wi-Fi%2064%20%D0%93%D0%91%2C%20%D1%80%D0%BE%D0%B7%D0%BE%D0%B2%D1%8B%D0%B9%20%20%20%2047.990.00%20rub.png',
      },
      {
        name: 'Планшет Планшет APPLE iPad Pro 11" (М4) Cellular 256GB Silver (MVW23NFA) 2024 ',
        price: 134.999,
        description:
          'Возможность использования как компьютера благодаря приложению Microsoft Office',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738697456/do%20an%20tot%20nghiep/product/ipad/%D0%9F%D0%BB%D0%B0%D0%BD%D1%88%D0%B5%D1%82%20%D0%9F%D0%BB%D0%B0%D0%BD%D1%88%D0%B5%D1%82%20APPLE%20iPad%20Pro%2011%22%20%28%D0%9C4%29%20Cellular%20256GB%20Silver%20%28MVW23NFA%29%202024%20%20%20%20%20%20%20%20%20%20%20%20%20%20134.999.00%20rub.png',
      },
      {
        name: 'Планшет Apple iPad Air 11 2024 128Gb Wi-Fi Space',
        price: 59.399,
        description: 'Широкий доступ к millions приложений в App Store',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738697454/do%20an%20tot%20nghiep/product/ipad/%D0%9F%D0%BB%D0%B0%D0%BD%D1%88%D0%B5%D1%82%20Apple%20iPad%20Air%2011%202024%20128Gb%20Wi-Fi%20Space%20%20%2059.390.00%20rub.png',
      },
      {
        name: 'Планшет Apple iPad Mini (2021) 64Gb Wi-Fi Starlight',
        price: 39.499,
        description: 'Отличное качество сборки и материалов',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738697452/do%20an%20tot%20nghiep/product/ipad/%D0%9F%D0%BB%D0%B0%D0%BD%D1%88%D0%B5%D1%82%20Apple%20iPad%20Mini%20%282021%29%2064Gb%20Wi-Fi%20Starlight%20%20%20%20%2039.490.00%20rub.png',
      },
      {
        name: 'Планшет Apple iPad (2021) 10.2" Wi-Fi 64Gb A2602 MK2K3CHA Серый космос',
        price: 31.999,
        description: 'Цифровой помощник Siri для голосового управления',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738697450/do%20an%20tot%20nghiep/product/ipad/%D0%9F%D0%BB%D0%B0%D0%BD%D1%88%D0%B5%D1%82%20Apple%20iPad%20%282021%29%2010.2%22%20Wi-Fi%2064Gb%20A2602%20MK2K3CHA%20%D0%A1%D0%B5%D1%80%D1%8B%D0%B9%20%D0%BA%D0%BE%D1%81%D0%BC%D0%BE%D1%81%20%20%20%2031.990.00%20rub.png',
      },
    ],
  },
  {
    category: { name: 'Storage, USB' },
    product: [
      {
        name: 'USB Флеш-накопитель SmartBuy Glossy Series 3.0 32GB',
        price: 471,
        description: 'Компактное устройство для хранения данных',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738744243/do%20an%20tot%20nghiep/product/Storage%2C%20USB/USB%20%D0%A4%D0%BB%D0%B5%D1%88-%D0%BD%D0%B0%D0%BA%D0%BE%D0%BF%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%20SmartBuy%20Glossy%20Series%203.0%2032GB%20%20%20%20471.00%20rub.png',
      },
      {
        name: 'Флешка Smartbuy Crown USB 2.0 32GB (SB32GBCRW-K)',
        price: 650,
        description: 'Высокая скорость чтения и записи файлов',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738744242/do%20an%20tot%20nghiep/product/Storage%2C%20USB/%D0%A4%D0%BB%D0%B5%D1%88%D0%BA%D0%B0%20Smartbuy%20Crown%20USB%202.0%2032GB%20%28SB32GBCRW-K%29%20%20%20%20%20650.00%20rub.png',
      },
      {
        name: '128Gb - Netac U505 USB 3.0 NT03U505N-128G-30BK ',
        price: 750,
        description: 'Надёжная защита данных при использовании',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738744242/do%20an%20tot%20nghiep/product/Storage%2C%20USB/128Gb%20-%20Netac%20U505%20USB%203.0%20NT03U505N-128G-30BK%20%20%20%20%20%20%20750.00%20rub.png',
      },
      {
        name: 'USB 3.0 3.1 накопитель Smartbuy 128GB STREAM Red (SB128GBST-R3)',
        price: 1.293,
        description: 'Лёгкость переноски благодаря маленькому размеру',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738744242/do%20an%20tot%20nghiep/product/Storage%2C%20USB/USB%203.0%203.1%20%D0%BD%D0%B0%D0%BA%D0%BE%D0%BF%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%20Smartbuy%20128GB%20STREAM%20Red%20%28SB128GBST-R3%29%20%20%20%20%20%201.293.00%20rub.png',
      },
      {
        name: 'Netac USB Drive 16GB UM2 USB2.0 NT03UM2N-016G-20BK',
        price: 450,
        description: 'Совместимость с большинством устройств через USB-порт',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738744242/do%20an%20tot%20nghiep/product/Storage%2C%20USB/Netac%20USB%20Drive%2016GB%20UM2%20USB2.0%20NT03UM2N-016G-20BK%20%20%20%20%20%20%20450.00%20rub.png',
      },
      {
        name: 'Накопитель USB 2.0 8GB SmartBuy SB8GBCLU-K ',
        price: 305,
        description: 'Различные объёмы памяти для любых потребностей',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738744242/do%20an%20tot%20nghiep/product/Storage%2C%20USB/%D0%9D%D0%B0%D0%BA%D0%BE%D0%BF%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%20USB%202.0%208GB%20SmartBuy%20SB8GBCLU-K%20%20305.00%20rub.png',
      },
      {
        name: 'Накопитель USB 2.0 16GB Digma DGFUM016A20SR',
        price: 290,
        description: 'Прочный корпус для защиты от механических повреждений',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738743869/do%20an%20tot%20nghiep/product/Storage%2C%20USB/%D0%9D%D0%B0%D0%BA%D0%BE%D0%BF%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%20USB%202.0%2016GB%20Digma%20DGFUM016A20SR%20%20290.00%20rub.png',
      },
      {
        name: 'USB 2.0 накопитель SmartBuy 4GB CLUE Burgundy (SB4GBCLU-BG)',
        price: 250,
        description: 'Возможность создания загрузочных накопителей',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738743869/do%20an%20tot%20nghiep/product/Storage%2C%20USB/USB%202.0%20%D0%BD%D0%B0%D0%BA%D0%BE%D0%BF%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%20SmartBuy%204GB%20CLUE%20Burgundy%20%28SB4GBCLU-BG%29%20%20%20250.00%20rub.png',
      },
      {
        name: 'USB Флеш-накопитель Smartbuy Glossy 32GB, Синий',
        price: 350,
        description: 'Безбатарейная работа благодаря питанию от порта',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738743868/do%20an%20tot%20nghiep/product/Storage%2C%20USB/USB%20%D0%A4%D0%BB%D0%B5%D1%88-%D0%BD%D0%B0%D0%BA%D0%BE%D0%BF%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%20Smartbuy%20Glossy%2032GB%2C%20%D0%A1%D0%B8%D0%BD%D0%B8%D0%B9%20%20%20%20%20350.00%20rub.png',
      },
      {
        name: 'Флешка HIKVision HS-USB-M210P 16G U3 16Gb',
        price: 390,
        description: 'Защита паролем или шифрованием для конфиденциальности',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738743868/do%20an%20tot%20nghiep/product/Storage%2C%20USB/%D0%A4%D0%BB%D0%B5%D1%88%D0%BA%D0%B0%20HIKVision%20HS-USB-M210P%2016G%20U3%2016Gb%20%20390.00%20rub.png',
      },
      {
        name: 'USB-флеш-накопитель ADATA 100, 32 ГБ, C906, USB 2,0',
        price: 750,
        description: 'Стильный дизайн в различных цветовых решениях',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738743868/do%20an%20tot%20nghiep/product/Storage%2C%20USB/USB-%D1%84%D0%BB%D0%B5%D1%88-%D0%BD%D0%B0%D0%BA%D0%BE%D0%BF%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%20ADATA%20100%2C%2032%20%D0%93%D0%91%2C%20C906%2C%20USB%202%2C0%20%20%20%20750%20rub.png',
      },
      {
        name: 'USB Flash Drive 32Gb - Netac UM1 NT03UM1N-032G-32PN ',
        price: 390,
        description: 'Поддержка современных стандартов (USB 3.0, USB-C)',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738743868/do%20an%20tot%20nghiep/product/Storage%2C%20USB/USB%20Flash%20Drive%2032Gb%20-%20Netac%20UM1%20NT03UM1N-032G-32PN%20%20%20%20390%20rub.png',
      },
      {
        name: 'USB Флеш-накопитель Smartbuy STREAM 32GB, Желтый',
        price: 371,
        description: 'Долгий срок службы при правильном использовании',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738743868/do%20an%20tot%20nghiep/product/Storage%2C%20USB/USB%20%D0%A4%D0%BB%D0%B5%D1%88-%D0%BD%D0%B0%D0%BA%D0%BE%D0%BF%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%20Smartbuy%20STREAM%2032GB%2C%20%D0%96%D0%B5%D0%BB%D1%82%D1%8B%D0%B9%20%20%20%20%20371.00%20rub.png',
      },
      {
        name: 'Накопитель USB 2.0 16GB Silicon Power Helios 101',
        price: 309,
        description: 'Автоматическое распознавание операционными системами',
        stock: 10,
        image:
          'https://res.cloudinary.com/co-phan/image/upload/v1738743867/do%20an%20tot%20nghiep/product/Storage%2C%20USB/%D0%9D%D0%B0%D0%BA%D0%BE%D0%BF%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%20USB%202.0%2016GB%20Silicon%20Power%20Helios%20101%20%20%20%20%20309.00%20rub.png',
      },
    ],
  },
];

export default productAndCategory;
