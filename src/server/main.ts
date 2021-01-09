// Library
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { ApplicationModule } from './app/app.module';

declare const module: any;

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule, {
		cors: process.env.NODE_ENV === 'development' ? {
			origin: 'http://localhost:8500',
			credentials: true // <-- REQUIRED backend setting
		} : false
	});
	app.use(cookieParser());
	const options = new DocumentBuilder()
		.setTitle('Chats example')
		.setDescription('Chat API description')
		.setVersion('1.0')
		.addTag('chat')
		.addBearerAuth(
			{ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
			'access-token',
		)
		.build();

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('swagger', app, document);

	await app.listen(process.env.PORT || '3000');
	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(async () => {
			app.close();
			// service.close();
		});
	}
}
bootstrap();
