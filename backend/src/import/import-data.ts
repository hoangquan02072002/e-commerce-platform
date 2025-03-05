import { createConnection } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { Product } from '../products/entities/product.entity';
import { OrderItem } from '../orders/entities/order-item.entity';
import { Order } from '../orders/entities/order.entity';
import { Payment } from '../payments/entities/payment.entity';
import { User } from '../users/entities/user.entity';
import { Review } from '../reviews/entities/review.entity';
import { Notification } from '../notifications/entities/notification.entity';
import productAndCategory from './product';

async function seedData() {
  // Kết nối đến database
  const connection = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'quannguyen2002',
    database: 'graduate_project',
    entities: [
      Category,
      Product,
      OrderItem,
      Order,
      Notification,
      Payment,
      User,
      Review,
    ],
    synchronize: true, //only use in env development
  });

  // import category
  // const categoryRepository = connection.getRepository(Category);
  // await categoryRepository.delete({});
  // console.log('Existing data deleted.');

  // await connection.query(`ALTER SEQUENCE category_id_seq RESTART WITH 1`);

  // const categories = category;

  // await categoryRepository.save(categories);

  // console.log('Data seeded successfully!');

  // import product

  // const productRepository = connection.getRepository(Product);
  // await productRepository.delete({});
  // console.log('Existing data deleted.');

  // await connection.query(`ALTER SEQUENCE product_id_seq RESTART WITH 1`);

  // const products = product;

  // await productRepository.save(products);

  // console.log('product seeded successfully!');

  // await connection.close();

  // test

  // const productsByCategory = [
  //   {
  //     category: { name: 'Cameras' },
  //     products: [
  //       {
  //         name: 'product1',
  //         price: 100,
  //         description: 'product_description',
  //         stock: 100,
  //         image: 'product_image',
  //       },
  //       {
  //         name: 'product2',
  //         price: 100,
  //         description: 'product_description',
  //         stock: 100,
  //         image: 'product_image',
  //       },
  //     ],
  //   },
  //   {
  //     category: { name: 'Ipad' },
  //     products: [
  //       {
  //         name: 'product3',
  //         price: 100,
  //         description: 'product_description',
  //         stock: 100,
  //         image: 'product_image',
  //       },
  //       {
  //         name: 'product4',
  //         price: 100,
  //         description: 'product_description',
  //         stock: 100,
  //         image: 'product_image',
  //       },
  //     ],
  //   },
  // ];

  // const productsByCategory = productAndCategory;

  // const categoryRepository = connection.getRepository(Category);
  // const productRepository = connection.getRepository(Product);

  // // Lặp qua từng nhóm danh mục và sản phẩm
  // for (const group of productsByCategory) {
  //   // Tạo hoặc lấy danh mục
  //   let category = await categoryRepository.findOne({
  //     where: { name: group.category.name },
  //   });
  //   if (!category) {
  //     category = await categoryRepository.save(group.category);
  //   }

  //   // Tạo và gán sản phẩm vào danh mục
  //   const createdProducts = await Promise.all(
  //     group.product.map(async (product) => {
  //       return productRepository.save({
  //         ...product,
  //         category, // Gán danh mục
  //       });
  //     }),
  //   );

  //   console.log(
  //     `Created products for category "${category.name}":`,
  //     createdProducts,
  //   );
  // }

  // console.log('Data seeded successfully!');

  // // Đóng kết nối
  // await connection.close();

  // test2
  const productsByCategory = productAndCategory;
  const categoryRepository = connection.getRepository(Category);
  const productRepository = connection.getRepository(Product);

  // Tạo danh mục và sắp xếp theo thứ tự tăng dần của id
  const createdCategories = await categoryRepository.save(
    productsByCategory.map((group) => group.category),
  );

  // Sắp xếp danh mục theo thứ tự tăng dần của id
  createdCategories.sort((a, b) => a.id - b.id);

  // Tạo và gán sản phẩm vào danh mục
  for (let i = 0; i < productsByCategory.length; i++) {
    const group = productsByCategory[i];
    const category = createdCategories[i]; // Lấy danh mục theo thứ tự

    const createdProducts = await Promise.all(
      group.product.map(async (product) => {
        return productRepository.save({
          ...product,
          category, // Gán danh mục
        });
      }),
    );

    console.log(
      `Created products for category "${category.name}":`,
      createdProducts,
    );
  }

  console.log('Data seeded successfully!');

  // Đóng kết nối
  await connection.close();
}

seedData().catch((error) => console.error('Error seeding data:', error));
