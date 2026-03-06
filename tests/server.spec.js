const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  // Prueba 1: GET /cafes devuelve status 200 y un arreglo con al menos 1 objeto
  test("GET /cafes devuelve status 200 y un arreglo con al menos 1 objeto", async () => {
    const response = await request(server).get("/cafes");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  // Prueba 2: DELETE devuelve 404 cuando se intenta eliminar un café con id inexistente
  test("DELETE /cafes/:id devuelve 404 cuando el id no existe", async () => {
    const response = await request(server)
      .delete("/cafes/999")
      .set("Authorization", "token");

    expect(response.status).toBe(404);
  });

  // Prueba 3: POST /cafes agrega un nuevo café y devuelve 201
  test("POST /cafes agrega un nuevo café y devuelve status 201", async () => {
    const nuevosCafe = { id: 99, nombre: "Expreso" };
    const response = await request(server).post("/cafes").send(nuevosCafe);

    expect(response.status).toBe(201);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toContainEqual(nuevosCafe);
  });

  // Prueba 4: PUT /cafes devuelve 400 si el id del parámetro es diferente al id del payload
  test("PUT /cafes devuelve 400 si el id del parámetro es diferente al id del payload", async () => {
    const cafeActualizado = { id: 1, nombre: "Cortado Actualizado" };
    const response = await request(server)
      .put("/cafes/2")
      .send(cafeActualizado);

    expect(response.status).toBe(400);
  });
});
