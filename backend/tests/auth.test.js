

import { expect } from "chai";
import User from '../models/User.js';
import { baseUrl } from './setup.js';
import axios from 'axios';


const api = axios.create({
    baseURL: baseUrl,
    validateStatus: () => true,
});

describe('Auth Api', () => {

    afterEach(async () => {
        await User.deleteMany({});
    });

    describe('POST /api/auth/signup', () => {

        it('should create a new user', async () => {
            const res = await api.post('/api/auth/signup', {
                name: "testuser",
                email: "test@gmail.com",
                password: "12345678",
            });

            expect(res.status).to.equal(201);
            expect(res.data).to.have.property("email", "test@gmail.com");
        });

        it("should not allow signup with missing field", async () => {
            const res = await api.post('/api/auth/signup', {
                name: "testuser",
                email: "test@gmail.com",
            });

            expect(res.status).to.equal(400);
        });

        it("should not allow duplicate email for signup", async () => {
            await api.post('/api/auth/signup', {
                name: "testuser",
                email: "test@gmail.com",
                password: "12345678",
            });

            const res = await api.post('/api/auth/signup', {
                name: "testuser",
                email: "test@gmail.com",
                password: "78345621",
            });

            expect(res.status).to.equal(400);
        });
    });

    describe('POST /api/auth/login', () => {

        beforeEach(async () => {
            await api.post('/api/auth/signup', {
                name: "testuser",
                email: "test@gmail.com",
                password: "78345621",
            });
        });

        it("Should successfully login with correct credentials", async () => {
            const res = await api.post('/api/auth/login', {
                email: "test@gmail.com",
                password: "78345621",
            });

            expect(res.status).to.equal(200);
            expect(res.headers['set-cookie']).to.exist;
        });

      it("Should not login with incorrect credentials", async () => {
            const res = await api.post('/api/auth/login', {
                email: "test@gmail.com",
                password: "78345921",
            });
            expect(res.status).to.equal(401);
        });

        it("Should not login with non existing email", async () => {
            const res = await api.post('/api/auth/login', {
                email: "testcase@gmail.com",
                password: "78345621",
            });
            expect(res.status).to.equal(401);
        });
    });
});