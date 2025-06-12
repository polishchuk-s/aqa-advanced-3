import { test, expect } from '@playwright/test';
import { config } from '../../playwright.config';

test ('Should add a car and verify whether it is created', async ({ playwright }) => {
    const apiContext = await playwright.request.newContext();
    const signInRequest = await apiContext.post(`${config.baseUrl}api/auth/signin`, {
        data: {
          email: `${config.credentials.email}`,
          password: `${config.credentials.password}`,
          remember: false
        }
    });

    const newCarData = {
        carBrandId: 4,
        carModelId: 16,
        mileage: 255
    };

    const postResponse = await apiContext.post(`${config.baseUrl}api/cars`, {
        data: newCarData,
    });
    expect(postResponse.status()).toBe(201);

    const getResponse = await apiContext.get(`${config.baseUrl}api/cars`);
    expect(getResponse.status()).toBe(200);

    const responseJson = await getResponse.json();

    expect(responseJson.data[0]).toEqual(expect.objectContaining({
        carBrandId: newCarData.carBrandId,
        carModelId: newCarData.carModelId,
        mileage: newCarData.mileage
    }));
});

test ('Should throw 400 status code when request body is not valid', async ({ playwright }) => {
    const apiContext = await playwright.request.newContext();
    const signInRequest = await apiContext.post(`${config.baseUrl}api/auth/signin`, {
        data: {
          email: `${config.credentials.email}`,
          password: `${config.credentials.password}`,
          remember: false
        }
    });

    const newCarData = {
        carBrandId: 'BMW',
        carModelId: 16,
        mileage: 255
    };

    const postResponse = await apiContext.post(`${config.baseUrl}api/cars`, {
        data: newCarData,
    });
    expect(postResponse.status()).toBe(400);

    const requestJson = await postResponse.json();
    expect(requestJson).toEqual(expect.objectContaining({
    status: 'error',
    message: 'Invalid car brand type'
  }));
});

test ('Should throw 404 status code when route is not valid', async ({ playwright }) => {
    const apiContext = await playwright.request.newContext();
    const signInRequest = await apiContext.post(`${config.baseUrl}api/auth/signin`, {
        data: {
          email: `${config.credentials.email}`,
          password: `${config.credentials.password}`,
          remember: false
        }
    });

    const newCarData = {
        carBrandId: 4,
        carModelId: 16,
        mileage: 255
    };

    const postResponse = await apiContext.post(`${config.baseUrl}api/cars2`, {
        data: newCarData,
    });
    expect(postResponse.status()).toBe(404);

    const requestJson = await postResponse.json();
    expect(requestJson).toEqual(expect.objectContaining({
    status: 'error',
    message: 'Not found'
  }));
});
