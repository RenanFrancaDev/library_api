const mongooseToSwagger = require("mongoose-to-swagger");
const SchmemaBook = require("../src/models/book.js");
const SchemaUser = require("../src/models/user.js")
const swaggerAutogen = require("swagger-autogen")({
  openapi: "3.0.0",
  language: "pt-BR",
});

const outputFile = './swagger_output.json';
const endpointFiles = ['../index.js', '../src/routes.js'];


let doc = {
  info: {
    version: "1.0.0",
    title: "API Library Online",
    description: "API to Library Online",
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Servidor localhost",
    },
    {
      url: "https://biblioteca-api-rho.vercel.app/",
      description: "Production Server",
    },
  ],
  consumes: ["application/json"],
  produces: ["aplication/json"],
  components: {
    schemas: {
      Book: mongooseToSwagger(SchmemaBook),
      User: mongooseToSwagger(SchemaUser),
    },
  },
};

swaggerAutogen(outputFile, endpointFiles, doc).then(() => {
    console.log("Documentação do Swagger gerada encontra-se no arquivo em: "+outputFile);
    if(process.env.NODE_ENV !== 'production'){
        require("../index.js");
    }
});