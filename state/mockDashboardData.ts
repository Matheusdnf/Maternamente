import { ContentArticle } from "../types/dashboard";

export const mockBlocksData: ContentArticle[] = [
  {
    id: "1",
    tag: "Nutrição",
    title: "Nutrição no 1º Trimestre",
    description:
      "O que comer para apoiar o desenvolvimento do bebê nos primeiros meses.",
    readingTime: "5 min de leitura",
    image: require("../assets/images/artigos/1.jpg"),
  },
  {
    id: "2",
    tag: "Exercício",
    title: "Exercícios Seguros no Início",
    description:
      "Movimentos suaves e alongamentos ideais para o primeiro trimestre.",
    readingTime: "8 min de leitura",
    image: require("../assets/images/artigos/2.jpg"),
  },
  {
    id: "3",
    tag: "Mental",
    title: "Gerenciando a Ansiedade",
    description:
      "Técnicas de respiração e relaxamento para lidar com as mudanças hormonais.",
    readingTime: "6 min de leitura",
    image: require("../assets/images/artigos/3.jpg"),
  },
  {
    id: "4",
    tag: "Alongamento",
    title: "Alongamento Matinal para Gestantes",
    description:
      "Uma rotina leve de 5 minutos para aliviar dores nas costas ao acordar.",
    readingTime: "4 min de leitura",
    image: require("../assets/images/artigos/4.jpg"),
  },
  {
    id: "5",
    tag: "Nutrição",
    title: "Receitas Ricas em Ferro",
    description:
      "Refeições saborosas para prevenir a anemia durante a gestação.",
    readingTime: "7 min de leitura",
    image: require("../assets/images/artigos/1.jpg"), // a original do Unsplash saiu do ar (404)
  }
];
