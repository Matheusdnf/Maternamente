import type { ImageSourcePropType } from "react-native";

export interface ContentArticle {
  id: string;
  tag: string;
  title: string;
  description: string;
  readingTime: string;
  image: ImageSourcePropType; // imagem dentro do app: aparece sem internet
}
