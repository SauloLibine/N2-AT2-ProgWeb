import request from "supertest";
import server from "../../../server.js";

describe("API - Usuários", () => {

    let usuario;

    test("Cadastrar usuário", async () => {

        const response = await request(server)
            .post("/api/users")
            .send({
                name: "Andre",
                email: `andre${Date.now()}@gmail.com`,
                password: "123456"
            });

        expect(response.status).toBe(200);
        expect(response.body.uid).toBeDefined();

        usuario = response.body;

    });

    test("Login válido", async () => {

        const response = await request(server)
            .post("/api/login")
            .send({
                email: usuario.email,
                password: "123456"
            });

        expect(response.status).toBe(200);
        expect(response.body.email).toBe(usuario.email);

    });

    test("Buscar usuário", async () => {

        const response = await request(server)
            .get(`/api/users/${usuario.uid}`)
            .set("Authorization", `Bearer ${usuario.uid}`);

        expect(response.status).toBe(200);

    });

    test("Atualizar usuário", async () => {

        const response = await request(server)
            .put(`/api/users/${usuario.uid}`)
            .set("Authorization", `Bearer ${usuario.uid}`)
            .send({
                name: "Novo Nome"
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Novo Nome");

    });

    test("Criar pedido", async () => {

        const response = await request(server)
            .post("/api/orders")
            .set("Authorization", `Bearer ${usuario.uid}`)
            .send({

                userId: usuario.uid,
                total: 150,
                items: [
                    {
                        produto: "Heineken",
                        quantidade: 2
                    }
                ]

            });

        expect(response.status).toBe(201);

    });

    test("Listar pedidos", async () => {

        const response = await request(server)
            .get(`/api/orders?userId=${usuario.uid}`)
            .set("Authorization", `Bearer ${usuario.uid}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

    });

    test("Excluir usuário", async () => {

        const response = await request(server)
            .delete(`/api/users/${usuario.uid}`)
            .set("Authorization", `Bearer ${usuario.uid}`);

        expect(response.status).toBe(200);

    });

});