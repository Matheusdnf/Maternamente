import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ContentArticle } from "../types/dashboard";

// Card de leitura: usado na Biblioteca Temática e no carrossel do Início.
// mostrarTema: etiqueta do tema sobre a imagem, para quando os cards não estão agrupados por tema.
export function ArtigoCard({ artigo, mostrarTema }: { artigo: ContentArticle; mostrarTema?: boolean }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      className="bg-cartao rounded-3xl mr-4 overflow-hidden border border-borda shadow-sm mb-2"
      style={{ width: 256, height: 284 }} // tamanho fixo: todos os cards iguais, independente da proporção da foto
      activeOpacity={0.9}
      accessibilityRole="button"
      accessibilityLabel={`${artigo.title}, ${artigo.readingTime}`}
      onPress={() => router.push(`/bloco/${artigo.id}`)}
    >
      <Image source={artigo.image} style={{ width: "100%", height: 144 }} className="bg-suave" resizeMode="cover" />
      {mostrarTema && (
        <View className="absolute top-3 left-3 bg-cartao rounded-full px-3 py-1">
          <Text className="text-[11px] font-bold text-[#C56A43]">{artigo.tag}</Text>
        </View>
      )}
      <View className="p-4 flex-1 justify-between">
        <View>
          <Text className="text-sm font-bold text-texto mb-1" numberOfLines={2}>{artigo.title}</Text>
          <Text className="text-xs text-texto-suave leading-relaxed" numberOfLines={2}>{artigo.description}</Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-[10px] font-bold text-[#C56A43] uppercase tracking-wider">{artigo.readingTime}</Text>
          <Ionicons name="arrow-forward-circle" size={20} color="#D97D54" />
        </View>
      </View>
    </TouchableOpacity>
  );
}
